/// <reference path="./map-layer.ts" />
/// <reference path="./types.ts" />

/** Helper object storing tile texture, grid position, and map area. */
class MapTile {
    /** HTML element associated with this tile. */
    readonly element: HTMLElement;
    /** Grid position of the map tile. */
    readonly gridPos: GridPos;
    /** Map area of the tile. */
    readonly box: ViewBox;
    /** Visibility DOM cache. */
    visible: boolean = true;

    constructor(box: ViewBox, element: HTMLElement, gridPos: GridPos) {
        this.box = box;
        this.element = element;
        this.gridPos = gridPos;
    }
}

/**
 * Tile-based MapLayer implementation.
 *
 * Tile layers come in different scales and are made up of many small raster or
 * vector tiles. These are then shown or hidden depending on the camera
 * position and zoom level.
 *
 * Tiles are generally all the same base size, but the map area they cover
 * changes with the current zoom level.
 */
abstract class TileLayer extends MapLayer {
    /** Current level of detail for terrain tiles. */
    protected lod: number;
    /** Map tiles for the current grid. */
    protected tiles: MapTile[] = [];

    constructor(id: string, mapSize: number, initialLod: number) {
        super(id, mapSize);
        this.lod = initialLod;
    }

    /** Generate new tiles for the given grid size. */
    protected defineTiles(gridSize: number): void {
        const newTiles: MapTile[] = [];
        const tileSize = this.mapSize / gridSize;
        const baseSize = this.mapSize / gridSize;
        // Y loop has to count negative as it is populated top-to-bototm
        let y = gridSize;
        while (y-- > 0)
            // X loop is positive, left-to-right
            for (let x = 0; x < gridSize; x++) {
                const pos: GridPos = {
                    x: x,
                    y: y
                };
                const tile = this.createTile(pos, gridSize);
                tile.element.style.height = tile.element.style.width = (
                    `${tileSize.toFixed()}px`);
                tile.element.style.left = `${pos.x * baseSize}px`;
                tile.element.style.bottom = `${pos.y * baseSize}px`;
                const url = this.generateTilePath(pos, this.lod);
                tile.element.style.backgroundImage = `url(${url})`;
                newTiles.push(tile);
            }
        this.tiles = newTiles;
    }

    /**
     * Factory method for map tiles.
     * @param pos Grid index of the tile to create
     * @param gridSize Number of rows/columns in the grid
     * @returns Map tile instance to place in the grid
     */
    protected abstract createTile(pos: GridPos, gridSize: number): MapTile;

    /**
     * Generate the path to a given grid tile.
     * @param pos Grid index of the tile
     * @param lod Current level of detail
     * @returns Full path to the given tile asset
     */
    protected abstract generateTilePath(pos: GridPos, lod: number): string;

    /**
     * Return whether the given tile overlaps with the view box.
     * @param tile Map tile to check for view box intersection
     * @param viewBox Current client view box
     * @returns true if the tile is in view, otherwise false
     */
    protected tileIsVisible(tile: MapTile, viewBox: ViewBox): boolean {
        return Utils.rectanglesIntersect(tile.box, viewBox);
    }

    /**
     * Update the CSS visibility of all map tiles.
     * @param viewBox Current view box to apply
     */
    protected updateTileVisibility(viewBox: ViewBox): void {
        // Process all tiles to determine which ones are active
        const activeTiles: HTMLElement[] = [];
        let i = this.tiles.length;
        while (i-- > 0) {
            const tile = this.tiles[i]!;
            if (this.tileIsVisible(tile, viewBox))
                activeTiles.push(tile.element);
        }
        // Load active tiles
        requestAnimationFrame(() => {
            this.element.innerHTML = "";
            i = activeTiles.length;
            while (i-- > 0)
                this.element.append(activeTiles[i]!);
        });

    }

    protected deferredLayerUpdate(viewBox: ViewBox, _: number): void {
        this.updateTileVisibility(viewBox);
    }

    redraw(viewBox: ViewBox, zoom: number): void {
        const targetX = (viewBox.right + viewBox.left) * 0.5;
        const targetY = (viewBox.top + viewBox.bottom) * 0.5;
        // Initial offset to move the centre of the SVG to its CSS origin
        const halfMapSize = this.mapSize * 0.5;
        let offsetX = -halfMapSize;
        let offsetY = -halfMapSize;
        // Another offset to shift the view box target to the origin
        offsetX += (halfMapSize - targetX) * zoom;
        offsetY -= (halfMapSize - targetY) * zoom; // -1 to fix Y axis origin
        // Apply transform
        this.element.style.transform = (
            `matrix(${zoom}, 0.0, 0.0, ${zoom}, ${offsetX}, ${offsetY})`);
    }
}
