/// <reference path="./api/getters.ts" />
/// <reference path="./layers/baseNameLayer.ts" />
/// <reference path="./layers/hexLayer.ts" />
/// <reference path="./layers/tileLayer.ts" />
/// <reference path="./debug_tile_colour.ts" />

/**
 * Initialisation hook for code that must access the DOM.
 */
function onDOMLoaded(): void {
    const initialContinentId = 6;

    // Add map layers

    const hexLayerDiv = <HTMLDivElement>document.getElementById("layer-hexes");
    const hexLayer = new HexLayer(hexLayerDiv, initialContinentId);
    const tileLayerDiv = <HTMLDivElement>(
        document.getElementById("layer-terrain")
    );
    const tileUrl = "http://127.0.0.1:5000/static/map/";
    const tileLayer = new TileLayer(tileLayerDiv, initialContinentId, tileUrl);
    const baseNameLayerDiv = <HTMLDivElement>(
        document.getElementById("layer-names")
    );
    const baseNameLayer = new BaseNameLayer(
        baseNameLayerDiv,
        initialContinentId
    );

    // Create map controller

    const map = <HTMLDivElement>document.getElementById("map");
    const viewport = <HTMLDivElement>document.getElementById("map-container");
    const mapContainer = <HTMLDivElement>(
        document.getElementById("map-background")
    );
    const controller = new MapController(
        map,
        mapContainer,
        viewport,
        initialContinentId
    );
    controller.registerZoomCallback(tileLayer.onZoom.bind(tileLayer));
    controller.registerZoomCallback(baseNameLayer.onZoom.bind(baseNameLayer));

    // Debug base painter
    hexLayer.layer.addEventListener("auxclick", (evt: MouseEvent) => {
        if (!(evt.target instanceof SVGElement)) {
            return;
        }
        // Middle mouse button only
        if (evt.button != 1) {
            return;
        }
        const newColour = cycleFactionColour(evt.target);
        // The auxclick event will fire for the SVG contents, e.g. a polygon,
        // not the source <svg> element we need
        const svgElement = evt.target.parentElement;
        if (svgElement != null) {
            baseNameLayer.setBaseOwnership(parseInt(svgElement.id), newColour);
        }
    });
}

window.addEventListener("DOMContentLoaded", onDOMLoaded);
