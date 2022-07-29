/// <reference path="./tool.ts" />
/// <reference path="./cursor.ts" />

const available_tools = [Tool, Cursor];

document.addEventListener("DOMContentLoaded", () => {
    // Create toolbar buttons
    const toolbar_container = document.getElementById("toolbar-container") as HTMLDivElement;
    toolbar_container.innerHTML = "";
    available_tools.forEach((tool) => {
        const btn = document.createElement("input");
        btn.type = "button";
        btn.value = tool.displayName;
        btn.classList.add("toolbar__button");
        btn.id = `tool-${tool.id}`;
        btn.addEventListener("click", () => {
            StateManager.dispatch("toolbox/setTool", { type: tool });
        });
        toolbar_container.appendChild(btn);
    });
    // Reset tool on ESC
    document.addEventListener("keydown", event => {
        if (event.key === "Escape")
            StateManager.dispatch("toolbox/setTool", { type: Tool });
    });
    // Reset tool to None on startup
    StateManager.dispatch("toolbox/setTool", { type: Tool });
});
