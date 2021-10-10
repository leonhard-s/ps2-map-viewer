/// <reference path="./map-layer.ts" />
/// <reference path="./support.ts" />

/**
 * Helper object storing position and display options for point features.
 */
class PointFeature {
    /** HTML element associated with the feature. */
    readonly element: HTMLElement;
    /** Unique identifier for the feature. */
    readonly id: number;
    /** Position of the feature on the map. */
    readonly pos: Point;
    /** Minimum zoom level at which the element is visible. */
    readonly minZoom: number;
    /** Visibility DOM cache */
    visible: boolean = true;
    /** External visibility control */
    forceVisible: boolean = false;

    constructor(pos: Point, id: number, element: HTMLElement, minZoom: number = 0) {
        this.element = element;
        this.id = id;
        this.pos = pos;
        this.minZoom = minZoom;
    }
}

class PointLayer extends MapLayer {
    /** Container for point features loaded into the layer. */
    features: PointFeature[] = []

    redraw(viewbox: Box, zoom: number): void {
        const targetX = (viewbox.right + viewbox.left) * 0.5;
        const targetY = (viewbox.top + viewbox.bottom) * 0.5;
        // Initial offset to move the centre of the SVG to its CSS origin
        const halfMapSize = this.mapSize * 0.5;
        let offsetX = -halfMapSize;
        let offsetY = -halfMapSize;
        // Another offset to shift the viewbox target to the origin
        offsetX += (halfMapSize - targetX) * zoom;
        offsetY -= (halfMapSize - targetY) * zoom; // -1 to fix Y axis origin
        // Apply transform
        this.element.style.transform = (
            `matrix(${zoom}, 0.0, 0.0, ${zoom}, ${offsetX}, ${offsetY})`);
    }

    protected deferredLayerUpdate(viewbox: Box, zoom: number) {
        const unzoom = 1 / zoom;
        let i = this.features.length;
        while (i-- > 0) {
            const feat = this.features[i];
            feat.element.style.transform = (
                `translate(-50%, calc(var(--ps2map__base-icon-size) * ${unzoom})) ` +
                `scale(${unzoom}, ${unzoom})`);
            if (!feat.forceVisible)
                if (zoom >= feat.minZoom)
                    feat.element.style.display = "block";
                else
                    feat.element.style.removeProperty("display");
            feat.visible = zoom >= feat.minZoom;
        }
    }
}