/// <reference path="./tool.ts" />
/// <reference path="./cursor.ts" />
/// <reference path="./base-info.ts" />
/// <reference path="./eraser.ts" />
/// <reference path="./brush.ts" />

document.addEventListener("DOMContentLoaded", () => {

    const availableTools = [Tool, Cursor, BaseInfo, Eraser, Brush];
    const toolInstances = new Map<string, { tool: Tool, help: string }>();

    // Create toolbar buttons
    const toolBox = document.getElementById("toolbox") as HTMLDivElement;
    if (toolBox) {
        toolBox.innerHTML = "";
        availableTools.forEach(tool => {
            const btn = document.createElement("div");
            btn.innerText = tool.displayName;
            btn.setAttribute("data-tool-id", tool.id);
            btn.addEventListener("click", () => {
                StateManager.dispatch(
                    State.toolbox.setTool, { id: tool.id } as never);
            });
            toolBox.appendChild(btn);
        });
    }

    // Tool hotkeys
    document.addEventListener("keydown", event => {
        let tool = "";
        if (event.key === "Escape")
            tool = "none";
        else
            availableTools.forEach(t => {
                if (event.key === t.hotkey)
                    tool = t.hotkey === null ? "none" : t.id;
            });
        if (!tool)
            return;
        StateManager.dispatch(State.toolbox.setTool, { id: tool } as never);
    });
    StateManager.subscribe(State.toolbox.setTool, state => {
        // Create the tool if it does not exist
        if (!toolInstances.has(state.toolbox.current || "")) {
            const map = state.toolbox.map;
            if (!map)
                return;
            const dummy = document.createElement("div");
            availableTools.forEach(tool => {
                if (tool.id === state.toolbox.current)
                    toolInstances.set(
                        tool.id,
                        {
                            tool: new tool(map.viewport, map, dummy),
                            help: tool.help
                        });
            });
        }
        toolInstances.forEach((data, id) => {
            const instance = data.tool;
            if (instance.isActive() && id !== state.toolbox.current) {
                instance.deactivate();
                document.querySelector<HTMLDivElement>(
                    `[data-tool-id="${id}"]`)
                    ?.removeAttribute("data-active");
                document.getElementById("tool-help")!.innerText = "";
            }
        });
        const data = toolInstances.get(state.toolbox.current || "");
        const current = data?.tool;
        const help = data?.help;
        if (current && !current.isActive()) {
            current.activate();
            document.querySelector<HTMLDivElement>(
                `[data-tool-id="${state.toolbox.current}"]`)
                ?.setAttribute("data-active", "");
            if (help)
                document.getElementById("tool-help")!.innerText = help;
        }
    });
});
