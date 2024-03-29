/// <reference path="interfaces/index.ts" />
/// <reference path="rest/index.ts" />
/// <reference path="map-engine/types.ts" />

/**
 * Details for the "ps2map_minimapjump" custom event.
  */
interface MinimapJumpEvent {
    target: Point,
}

/**
 * Controller for on-screen minimap.
 */
class Minimap {
    /**
     * DOM element containing the minimap.
     * Its height will be set equal to its width.
     */
    readonly element: HTMLDivElement;
    /** Minimap view box frame element. */
    private readonly _viewBoxElement: HTMLDivElement;

    /** Size of the map used. Controls view box interpretation. */
    private _mapSize: number = 0;
    private _baseOutlineSvg: SVGElement | undefined = undefined;

    /** CSS size of the minimap. */
    private _cssSize: number;

    private _polygons: Map<number, SVGPolygonElement> = new Map();

    constructor(element: HTMLDivElement) {
        // Set up DOM containers
        this.element = element;
        this.element.classList.add("ps2map__minimap");
        this._cssSize = this.element.clientWidth;
        this.element.style.height = `${this._cssSize}px`;
        this.element.style.fillOpacity = "0.5";
        this._viewBoxElement = document.createElement("div");
        this._viewBoxElement.classList.add("ps2map__minimap__viewbox");
        this.element.appendChild(this._viewBoxElement);

        // Attach event listener
        this.element.addEventListener(
            "mousedown", this._jumpToPosition.bind(this), { passive: true });

        const obj = new ResizeObserver(() => {
            this._cssSize = this.element.clientWidth;
            this.element.style.height = `${this._cssSize}px`;
        });
        obj.observe(this.element);
    }

    /** Update the viewBox displayed on the minimap. */
    updateViewbox(viewBox: ViewBox): void {
        const mapSize = this._mapSize;
        // Convert map-coordinate viewBox to percentages
        const relViewBox: ViewBox = {
            top: (viewBox.top + mapSize * 0.5) / mapSize,
            left: (viewBox.left + mapSize * 0.5) / mapSize,
            bottom: (viewBox.bottom + mapSize * 0.5) / mapSize,
            right: (viewBox.right + mapSize * 0.5) / mapSize,
        };
        const relHeight = relViewBox.top - relViewBox.bottom;
        const relWidth = relViewBox.right - relViewBox.left;
        // Project the relative percentages onto the minimap
        Object.assign(this._viewBoxElement.style, {
            height: `${this._cssSize * relHeight}px`,
            width: `${this._cssSize * relWidth}px`,
            left: `${this._cssSize * relViewBox.left}px`,
            bottom: `${this._cssSize * relViewBox.bottom}px`,
        });
    }

    updateBaseOwnership(map: Map<number, number>): void {
        // The CSS variables are not available
        map.forEach((factionId, baseId) => {
            const polygon = this._polygons.get(baseId);
            if (polygon)
                polygon.style.fill =
                    `var(${this._factionIdToCssVar(factionId)})`;
        });
    }

    /**
     * Return the CSS variable name for the given faction.
     *
    * @param factionId - The faction ID to get the colour for.
    * @returns The CSS variable name for the faction's colour.
     */
    private _factionIdToCssVar(factionId: number): string {
        const code = GameData.getInstance().getFaction(factionId).code;
        return `--ps2map__faction-${code}-colour`;
    }

    async switchContinent(continent: Continent): Promise<void> {

        // Load the base outline SVG
        const svg = await fetchContinentOutlines(continent.code);

        this._mapSize = continent.map_size;
        // Set minimap background image
        this.element.style.backgroundImage =
            `url(${UrlGen.mapBackground(continent.code)})`;

        // Delete the existing hex layer, if any
        if (this._baseOutlineSvg)
            this.element.removeChild(this._baseOutlineSvg);

        // Delete any existing polygons
        this._polygons = new Map();
        // Add the new hex layer
        svg.classList.add("ps2map__minimap__hexes");
        this._baseOutlineSvg = svg;
        this.element.appendChild(this._baseOutlineSvg);

        // Add the polygons to the local cache
        svg.querySelectorAll("polygon").forEach(poly => {
            this._polygons.set(parseInt(poly.id, 10), poly);
            // Update polygon IDs to be unique
            poly.id = this._polygonIdFromBaseId(poly.id);
        });
    }

    private _buildMinimapJumpEvent(target: Point): CustomEvent<MinimapJumpEvent> {
        return new CustomEvent("ps2map_minimapjump", {
            detail: { target }, bubbles: true, cancelable: true,
        });
    }

    /**
     * Event callback for clicking on the minimap.
     * @param evtDown Position the mouse was clicked at
     */
    private _jumpToPosition(evtDown: MouseEvent): void {
        if (this._mapSize === 0 || evtDown.button !== 0)
            return;
        // Continuous "mousemove" callback
        const drag = rafDebounce((evtDrag: MouseEvent) => {
            // Get relative cursor position
            const rect = this.element.getBoundingClientRect();
            const relX = (evtDrag.clientX - rect.left) / (rect.width);
            const relY = (evtDrag.clientY - rect.top) / (rect.height);
            // Calculate target cursor position
            const target: Point = {
                x: Math.round(relX * this._mapSize) + this._mapSize * -0.5,
                y: Math.round((1 - relY) * this._mapSize) + this._mapSize * -0.5,
            };
            this.element.dispatchEvent(this._buildMinimapJumpEvent(target));
        });
        // Global "mouseup" callback
        const up = () => {
            this.element.removeEventListener("mousemove", drag);
            document.removeEventListener("mouseup", up);
        };
        // Add listeners
        document.addEventListener("mouseup", up);
        this.element.addEventListener("mousemove", drag, { passive: true });
        // Manually invoke the "drag" callback once to handle single click pans
        drag(evtDown);
    }

    private _polygonIdFromBaseId(baseId: number | string): string {
        return `minimap-baseId-${baseId}`;
    }
}
