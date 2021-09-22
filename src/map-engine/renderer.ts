/// <reference path="./camera.ts" />
/// <reference path="./map-layer.ts" />
/// <reference path="./static-layer.ts" />
/// <reference path="./support.ts" />
/// <reference path="./types.ts" />

/**
 * Core map rendering controller.
 *
 * This class is the primary controller object for a given map instance. Add
 * map layers to a map renderer to display them.
 *
 * The map renderer is responsible for handling camera interactions and
 * dispatching redraw and occlusion requests to any layers added to it. The
 * user may not directly interact with added map layers (aside from aestetical
 * style options that do not cause layout shifts or geometry changes).
 */
class MapRenderer {
    /** User-provided viewport element. Everything happens within this. */
    readonly viewport: HTMLDivElement;
    /** Helper element used to centre map layers in the viewport. */
    private readonly anchor: HTMLDivElement;

    /** The base map size for the current map. */
    private mapSize: number = 1024;
    /** Collection of map layers added to the map renderer. */
    private layers: Map < string, MapLayer > = new Map();

    // Current map panning offset - TBD anbd merged into camera target
    private panOffsetX: number;
    private panOffsetY: number;

    private camera: MapCamera;

    /** Additional callbacks to invoke when the map viewbox changes. */
    viewboxCallbacks: ((arg0: Box) => any)[] = [];

    constructor(viewport: HTMLDivElement, mapSize: number) {
        // Set up DOM containers
        this.viewport = viewport;
        this.viewport.classList.add("ps2map__viewport");
        this.anchor = document.createElement("div");
        this.anchor.classList.add("ps2map__anchor")
        this.viewport.appendChild(this.anchor);

        this.setMapSize(mapSize);

        // Set up camera
        this.camera = new MapCamera(
            mapSize, this.viewport.clientHeight, this.viewport.clientWidth);

        this.panOffsetX = this.viewport.clientWidth * 0.5;
        this.panOffsetY = this.viewport.clientHeight * 0.5;
        this.anchor.style.left = `${this.panOffsetX}px`;
        this.anchor.style.top = `${this.panOffsetY}px`;

        // Attach event listeners
        this.viewport.addEventListener("wheel", this.onZoom.bind(this), {
            passive: false
        });
        this.viewport.addEventListener("mousedown", this.mousePan.bind(this), {
            passive: true
        });
    }

    /**
     * Add a new map layer to the.
     *
     * The map size of the layer must match the map renderer's.
     * @param layer Map layer to add.
     */
    addLayer(layer: MapLayer): void {
        if (layer.mapSize != this.mapSize)
            throw "Map layer size must match the map renderer's.";
        this.layers.set(layer.id, layer);
        this.anchor.appendChild(layer.element);
        layer.redraw(this.camera.viewboxFromTarget(
            this.camera.target), this.camera.getZoom());
    }

    /** Get the current map size of the map renderer.
     * @returns Current size of the map
     */
    getMapSize(): number {
        return this.mapSize;
    }

    /**
     * Update the map size of the map renderer.
     *
     * This is only available after all map layers have been removed from the
     * map renderer.
     * @param value New map size to apply.
     */
    setMapSize(value: number): void {
        if (this.layers.size > 0)
            throw "Remove all map layers before changing map size.";
        this.mapSize = value;
        // Create a new camera as zoom levels depend on map size
        this.camera = new MapCamera(
            value, this.viewport.clientHeight, this.viewport.clientWidth);
    }

    /**
     * Event callback for mouse-wheel zoom
     * @param evt Wheel event to process
     */
    private onZoom = Utils.rafDebounce((evt: WheelEvent) => {
        evt.preventDefault();
        // Get the viewport-relative cursor position
        const view = this.viewport.getBoundingClientRect()
        const relX = Utils.clamp((evt.clientX - view.left) / view.width, 0.0, 1.0);
        const relY = Utils.clamp((evt.clientY - view.top) / view.height, 0.0, 1.0);
        // Update the camera target and viewbox
        const newTarget = this.camera.zoomTo(evt.deltaY, relX, relY);
        const newViewbox = this.camera.viewboxFromTarget(newTarget);

        // Apply new zoom level and schedule map layer updates
        this.layers.forEach((layer) => {
            layer.redraw(newViewbox, this.camera.getZoom());
        });
        // Invoke viewbox callbacks
        let i = this.viewboxCallbacks.length;
        while (i-- > 0)
            this.viewboxCallbacks[i](newViewbox);
    });

    /** Event callback for mouse map panning.
     * @param evtDown "mousedown" event starting the panning operation
     */
    private mousePan(evtDown: MouseEvent): void {
        // Cache the initial anchor offset relative to which the pan will occur
        const refX = this.panOffsetX;
        const refY = this.panOffsetY;
        // Initial cursor position
        const startX = evtDown.clientX;
        const startY = evtDown.clientY;
        // Continuous "mousemove" callback
        const drag = Utils.rafDebounce((evtDrag: MouseEvent) => {
            const deltaX = evtDrag.clientX - startX;
            const deltaY = evtDrag.clientY - startY;
            // Calculate and apply new layer anchor offset
            this.panOffsetX = refX + deltaX;
            this.panOffsetY = refY + deltaY;
            this.anchor.style.left = `${this.panOffsetX}px`;
            this.anchor.style.top = `${this.panOffsetY}px`;
        });
        // Global "mouseup" callback
        const up = () => {
            this.viewport.removeEventListener("mousemove", drag);
            document.removeEventListener("mouseup", up);
        };
        // Add listeners
        document.addEventListener("mouseup", up);
        this.viewport.addEventListener("mousemove", drag, {
            passive: true
        });
    }
}