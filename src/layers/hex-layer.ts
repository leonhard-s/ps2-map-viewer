/// <reference path="../map-engine/static-layer.ts" />

/**
 * Details for the "ps2map_basehover" custom event.
 */
interface BaseHoverEvent {
    baseId: number;
    element: SVGPolygonElement;
}

/**
 * A static layer rendering base polygons for a given continent.
 * 
 * This will dispatch a "ps2map_basehover" event when the user mouse-overs a
 * base polygon.
 */
class BasePolygonsLayer extends StaticLayer {

    constructor(id: string, mapSize: number) {
        super(id, mapSize);
        this.element.classList.add("ps2map__base-hexes");
    }

    setBaseOwnership(baseId: number, factionId: number): void {
        const svg = this.element.firstElementChild as SVGElement | null;
        if (svg == null)
            throw "Unable to find HexLayer SVG element";
        const id = this.baseIdToPolygonId(baseId);
        const polygon = svg.querySelector(`polygon[id="${id}"]`) as SVGPolygonElement | null;
        if (polygon == null)
            throw `Unable to find base polygon with id ${baseId}`;

        const colours: any = {
            "0": "rgba(0, 0, 0, 1.0)",
            "1": "rgba(160, 77, 183, 1.0)",
            "2": "rgba(81, 123, 204, 1.0)",
            "3": "rgba(226, 25, 25, 1.0)",
            "4": "rgba(255, 255, 255, 1.0)",
        }
        polygon.style.fill = colours[factionId.toFixed()];
    }

    // TODO: Make private
    applyPolygonHoverFix(svg: SVGElement): void {
        svg.querySelectorAll("polygon").forEach((polygon) => {
            // Make polygon ID unique
            polygon.id = this.baseIdToPolygonId(polygon.id);
            // Event handler for applying hover effects
            const addHoverFx = () => {
                // This moves the existing polygon to the top of the SVG to
                // make sure the hover effect does not get overshadowed by
                // neighbouring polygons.
                svg.appendChild(polygon);
                // Event handler for removing hover effects
                const removeHoverFx = () => polygon.style.removeProperty("stroke");
                polygon.addEventListener("mouseleave", removeHoverFx, {
                    passive: true
                });
                polygon.addEventListener("touchend", removeHoverFx, {
                    passive: true
                });
                polygon.addEventListener("touchcancel", removeHoverFx, {
                    passive: true
                });
                polygon.style.stroke = "#ffffff";
                this.element.dispatchEvent(
                    this.buildBaseHoverEvent(this.polygonIdToBaseId(polygon.id), polygon));
            };
            polygon.addEventListener("mouseenter", addHoverFx, {
                passive: true
            });
            polygon.addEventListener("touchstart", addHoverFx, {
                passive: true
            });
        });
    }

    protected deferredLayerUpdate(viewBox: Box, zoom: number): void {
        const svg = this.element.firstElementChild as SVGElement | null;
        if (svg != null) {
            const strokeWith = 10 / 1.5 ** zoom;
            svg.style.setProperty(
                "--ps2map__base-hexes__stroke-width", `${strokeWith}px`);
        }
    }

    private buildBaseHoverEvent(baseId: number, element: SVGPolygonElement): CustomEvent<BaseHoverEvent> {
        return new CustomEvent("ps2map_basehover", {
            detail: {
                baseId: baseId,
                element: element
            },
            bubbles: true,
            cancelable: true,
        });
    }

    private polygonIdToBaseId(id: string): number {
        // Convert the string "base-outline-<baseId>" to a number
        return parseInt(id.substring(id.lastIndexOf("-") + 1));
    }

    private baseIdToPolygonId(baseId: number | string): string {
        return `base-outline-${baseId}`;
    }
}