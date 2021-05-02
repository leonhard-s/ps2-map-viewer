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

    const hexLayerDiv = <HTMLDivElement>document.getElementById("mapHexLayer");
    const hexLayer = new HexLayer(hexLayerDiv, initialContinentId);
    const tileLayerDiv = <HTMLDivElement>(
        document.getElementById("mapTextureLayer")
    );
    const tileUrl = "http://127.0.0.1:5000/static/map/";
    const tileLayer = new TileLayer(tileLayerDiv, initialContinentId, tileUrl);
    const baseNameLayerDiv = <HTMLDivElement>(
        document.getElementById("mapBaseNameLayer")
    );
    const baseNameLayer = new BaseNameLayer(
        baseNameLayerDiv,
        initialContinentId
    );

    // Create map controller

    const map = <HTMLDivElement>document.getElementById("map");
    const viewport = <HTMLDivElement>document.getElementById("viewport");
    const controller = new MapController(map, viewport, initialContinentId);
    controller.onZoom.push(tileLayer.onZoom.bind(tileLayer));

    // Hook up map layer visibility toggles

    const showHideHexLayer = <HTMLInputElement>(
        document.getElementById("showHexes")
    );
    showHideHexLayer.addEventListener("click", () =>
        hexLayer.setVisibility(showHideHexLayer.checked)
    );
    const showHideTexturelayer = <HTMLInputElement>(
        document.getElementById("showMapTexture")
    );
    showHideTexturelayer.addEventListener("click", () =>
        tileLayer.setVisibility(showHideTexturelayer.checked)
    );
    const showHideNameLayer = <HTMLInputElement>(
        document.getElementById("showBaseNames")
    );
    showHideNameLayer.addEventListener("click", () =>
        baseNameLayer.setVisibility(showHideNameLayer.checked)
    );

    // Hook up remaining signals
    const asideBaseName = <HTMLSpanElement>document.getElementById("baseName");
    hexLayer.baseHoverCallback = (baseId) => {
        getBase(baseId).then((base) => {
            asideBaseName.textContent = base.name;
        });
    };

    const zoomInc = <HTMLInputElement>document.getElementById("zoomInc");
    zoomInc.addEventListener("click", () => {
        controller.incDecZoom(true);
    });
    const zoomDec = <HTMLInputElement>document.getElementById("zoomDec");
    zoomDec.addEventListener("click", () => {
        controller.incDecZoom(false);
    });

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
