/**
 * Base class for all tools.
 *
 * Additionally serves as the tool instance used when no tool is active. Its
 * "id" and "displayName" field are therefore valid.
 */
class Tool {

    static readonly id: string = "none";
    static readonly displayName: string = "None";
    static readonly defaultState: object = {};

    protected readonly _map: HeroMap;
    protected readonly _viewport: HTMLDivElement;
    protected readonly _tool_panel: HTMLDivElement;

    constructor(viewport: HTMLDivElement, map: HeroMap, tool_panel: HTMLDivElement) {
        this._map = map;
        this._viewport = viewport;
        this._tool_panel = tool_panel;

        this._setUpToolPanel();
    }

    /**
     * Clean-up method called when the tool is deactivated.
     *
     * Consider this a "destructor" for the tool that must be called to ensure
     * that the tool is properly deactivated without leaving any orphaned GUI
     * elements or event listeners in the DOM.
     */
    public tearDown(): void {
        this._tool_panel.innerHTML = "";
        this._tool_panel.removeAttribute("style");
    }

    /**
     * Populate the tool panel with tool-specific user interface elements.
     *
     * This is called automatically when the tool is created. The default
     * implementation does nothing, but subclasses may override this to add
     * their own elements.
     */
    protected _setUpToolPanel(): void { }
}

/**
 * Base class for canvas-based tools.
 * 
 * These are tools that use the canvas layer to draw on the map. This base
 * class handles interactions like zoom-dependent brush sizes and custom
 * cursors.
 */
abstract class CanvasTool extends Tool {

    protected readonly _cursor: HTMLDivElement;

    private _isActive = false;
    private _context: CanvasRenderingContext2D | null = null;
    private _halfMapSize: number | null = null;

    constructor(
        viewport: HTMLDivElement,
        map: HeroMap,
        tool_panel: HTMLDivElement,
    ) {
        super(viewport, map, tool_panel);
        map.renderer.allowPan = false;

        this._onDown = this._onDown.bind(this);
        this._onMove = this._onMove.bind(this);
        this._viewport.addEventListener("mousedown", this._onDown, { passive: true });
        this._viewport.addEventListener("mousemove", this._onMove, { passive: true });
        // Create custom cursor
        this._cursor = document.createElement("div");
        this._cursor.style.zIndex = "100";
        this._cursor.style.position = "absolute";
        this._cursor.style.pointerEvents = "none";
        this._setUpCursor();
        this._viewport.appendChild(this._cursor);
    }

    public tearDown(): void {
        super.tearDown();
        this._map.renderer.allowPan = true;
        this._viewport.removeEventListener("mousedown", this._onDown);
        this._viewport.removeEventListener("mousemove", this._onMove);
        this._viewport.removeChild(this._cursor);
    }

    protected abstract _setUpCursor(): void;

    /**
     * Callback invoked when the mouse is moved and active.
     * 
     * This is the primary action of the tool, i.e. the manipulation of the 
     * given canvas rendering context at the given position.
     */
    protected abstract _action(
        context: CanvasRenderingContext2D,
        pos: Point,
        scale: number): void;

    private _onDown(event: MouseEvent): void {
        if (event.button !== 0)
            return;

        this._context = this._map.renderer.getCanvasContext()!;
        this._halfMapSize = this._map.renderer.getMapSize() * 0.5;

        this._isActive = true;
        this._action(
            this._context,
            this._getActionPos(event),
            this._getScaling());

        // Set up global event listener for mouse up
        const up = () => {
            this._isActive = false;
            document.removeEventListener("mouseup", up);
        };
        document.addEventListener("mouseup", up, { passive: true });
    }

    private _onMove(event: MouseEvent): void {
        // Update cursor position
        const box = this._viewport.getBoundingClientRect();
        this._cursor.style.left = (event.clientX - box.left) + "px";
        this._cursor.style.top = (event.clientY - box.top) + "px";
        // Run action if tool is active (i.e. LMB is pressed)
        if (this._isActive && this._context)
            this._action(
                this._context,
                this._getActionPos(event),
                this._getScaling());
    }

    private _getActionPos(event: MouseEvent): Point {
        const pos = this._map.renderer.screenToMap(event);
        if (!this._halfMapSize)
            return { x: 0, y: 0 };
        return { x: this._halfMapSize + pos.x, y: this._halfMapSize - pos.y };
    }

    private _getScaling(): number {
        return 1 / this._map.renderer.getZoom();
    }
}