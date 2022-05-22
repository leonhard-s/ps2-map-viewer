/// <reference path="./map-engine/renderer.ts" />
/// <reference path="./api/index.ts" />
/// <reference path="./layers/hex-layer.ts" />
/// <reference path="./minimap.ts" />

/**
 * Custom map controller for primary PlanetSide 2 continent map.
 * 
 * This also includes a mini-map because reasons.
 */
class HeroMap {
    /** Current continent ID */
    private continentCode: string = "";
    /** Internal map renderer wrapped by this class. */
    private controller: MapRenderer | undefined = undefined;
    /** Viewport. */
    private viewport: HTMLDivElement;

    /** Minimap DOM container. */
    private minimap: Minimap | undefined = undefined;

    private continentId: number = 0;
    private baseUpdateIntervalId: number | undefined = undefined;

    private baseOwnershipStore: Map<number, number> = new Map();

    constructor(
        viewport: HTMLDivElement
    ) {
        this.viewport = viewport;
    }

    setBaseOwner(baseId: number, factionId: number): void {
        this.baseOwnershipStore.set(baseId, factionId);
        // Update map layers
        this.controller?.forEachLayer((layer) => {
            if (layer.id == "hexes") {
                (layer as HexLayer).setBaseOwner(baseId, factionId);
            }
        })
    }

    setContinent(continent: Api.Continent): void {
        if (continent.code == this.continentCode) {
            return;
        }
        this.continentCode = continent.code;
        const mapSize = continent.map_size;

        let i = this.minimap?.element.children.length;
        while (i != undefined && i--) {
            this.minimap?.element.children[i].remove();
        }
        delete this.minimap
        delete this.controller
        i = this.viewport.children.length;
        while (i--) {
            this.viewport.removeChild(this.viewport.children[i]);
        }

        // Set up controller
        this.controller = new MapRenderer(this.viewport, mapSize);

        // Set up minimap
        const minimapElement = document.getElementById("minimap");
        if (minimapElement == null)
            throw "Unable to locate minimap element.";
        if (minimapElement.tagName != "DIV")
            throw "Minimap element must be a DIV";
        this.minimap = new Minimap(minimapElement as HTMLDivElement,
            mapSize, Api.getMinimapImagePath(continent.code));
        this.controller.viewboxCallbacks.push(
            this.minimap.setViewbox.bind(this.minimap));
        this.minimap.jumpToCallbacks.push(
            this.controller.jumpTo.bind(this.controller));

        // Add map layer for terrain texture
        const terrainLayer = new TerrainLayer("terrain", mapSize);
        // Load continent data
        terrainLayer.setContinent(continent.code);
        terrainLayer.updateLayer();
        this.controller.addLayer(terrainLayer);

        // Add map layer for base hexes
        const hexLayer = new HexLayer("hexes", mapSize);
        // Load continent data
        fetch(Api.getHexesPath(continent.code))
            // Get raw text response (i.e. the SVG literal)
            .then((data) => {
                return data.text();
            })
            // Load the SVG literal into the layer
            .then((payload) => {
                hexLayer.element.appendChild(hexLayer.svgFactory(payload));
                hexLayer.updateLayer();
            });
        this.controller.addLayer(hexLayer);

        // Add map layer for base names
        const namesLayer = new BaseNamesLayer("names", mapSize);
        // Load continent data
        Api.getBasesFromContinent(continent.id)
            .then((bases) => {
                namesLayer.loadBaseInfo(bases);
                namesLayer.updateLayer();
            });

        this.controller.addLayer(namesLayer);

        hexLayer.polygonHoverCallbacks.push(
            namesLayer.onBaseHover.bind(namesLayer));

        // Base info panel
        let bases: Api.Base[] = [];
        Api.getBasesFromContinent(continent.id).then((data) => bases = data);
        const regionName = document.getElementById("widget_base-info_name") as HTMLSpanElement;
        const regionType = document.getElementById("widget_base-info_type") as HTMLSpanElement;
        hexLayer.polygonHoverCallbacks.push((baseId: number) => {
            let i = bases.length;
            while (i-- > 0) {
                const base = bases[i];
                if (base.id == baseId) {
                    regionName.innerText = base.name;
                    regionType.innerText = base.type_name;
                    return;
                }
            }
        });

        this.continentId = continent.id;
        if (this.baseUpdateIntervalId != undefined) {
            clearInterval(this.baseUpdateIntervalId);
        }
        this.updateBaseOwnership(); // Update once before interval times out
        this.baseUpdateIntervalId = setInterval(() => {
            this.updateBaseOwnership();
        }, 5000);
    }

    updateBaseOwnership(): void {
        // TODO: Add safeguard against multiple updates at once
        // TODO: Add dynamic server selection
        const server_id = 13;
        Api.getBaseOwnership(this.continentId, server_id).then((data) => {
            let i = data.length;
            while (i-- > 0) {
                this.setBaseOwner(data[i].base_id, data[i].owning_faction_id);
            }
        });
    }

}