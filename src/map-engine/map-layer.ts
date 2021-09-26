/// <reference path="./types.ts" />

/**
 * Base class for map layers.
 *
 * Map layers are layered map conents that are tied to the map canvas and move
 * as the map is panned by the user.
 */
abstract class MapLayer {
    /** Unique identifier for this layer and the DOM element it represents. */
    readonly id: string;
    /** Base size of the map layer in CSS pixels. */
    readonly mapSize: number;
    /** DOM element containing the layer's features. */
    readonly element: HTMLDivElement;
    /** Whether the layer is currently visible. */
    protected isVisible: boolean = true;

    constructor(id: string, mapSize: number) {
        this.id = id;
        this.mapSize = mapSize;
        // Create content element
        this.element = document.createElement("div");
        this.element.id = id;
        this.element.classList.add("ps2map__layer");
        this.element.style.height = this.element.style.width = `${mapSize}px`;
    }

    /**
     * Update the visibility of the map layer.
     * @param visible New visibility state to apply
     */
    setVisibility(visible: boolean): void {
        if (this.isVisible == visible)
            return;
        if (visible)
            this.element.style.removeProperty("display");
        else
            this.element.style.display = "none";
        this.isVisible = visible;
    }

    /**
     * Callback used to trigger updates in the map layer.
     *
     * Implement this hook to control visibility and zoom level updates
     * efficiently.
     *
     * Do not call requestAnimationFrame() as part of this method as timing is
     * the responsibility of the caller. Debouncing and other throttling
     * strategies are permitted.
     * @param viewbox New viewbox of the client
     * @param zoom New zoom level
     */
    abstract redraw(viewbox: Box, zoom: number): void;
}