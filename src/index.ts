/// <reference path="./interfaces/index.ts" />
/// <reference path="./rest/index.ts" />
/// <reference path="./hero-map.ts" />
/// <reference path="./minimap.ts" />
/// <reference path="./listener.ts" />
/// <reference path="./toolbox/index.ts" />
/// <reference path="./state/index.ts" />
/// <reference path="./game-data.ts" />

function setUpHeroMap(element: HTMLDivElement): HeroMap {
    const heroMap = new HeroMap(element);

    document.addEventListener("ps2map_minimapjump", event => {
        const evt = (event as CustomEvent<MinimapJumpEvent>).detail;
        heroMap.jumpTo(evt.target);
    }, { passive: true });

    heroMap.viewport.addEventListener("ps2map_basehover", event => {
        const evt = (event as CustomEvent<BaseHoverEvent>).detail;
        const base = GameData.getInstance().getBase(evt.baseId);
        if (base)
            StateManager.dispatch(State.user.baseHovered, base as never);
    });

    StateManager.subscribe(State.map.baseCaptured, state => {
        heroMap.updateBaseOwnership(state.map.baseOwnership);
    });

    StateManager.subscribe(State.user.continentChanged, state => {
        const cont = state.user.continent;
        if (!cont)
            return;
        GameData.getInstance().setActiveContinent(cont)
            .then(() => {
                heroMap.switchContinent(cont).then(() => {
                    heroMap.updateBaseOwnership(state.map.baseOwnership);
                    heroMap.jumpTo({ x: 0, y: 0 });
                });
            });
    });

    // Set up layer visibility hooks
    const container = document.getElementById(
        "layer-toggle-container") as HTMLDivElement;
    StateManager.subscribe(State.user.layerVisibilityChanged, state => {
        const vis = state.user.layerVisibility;
        heroMap.layers.forEachLayer(layer => {
            layer.setVisibility(vis.get(layer.id) || false);
        });
    });

    const layerNameFromId = (id: string) => {
        switch (id) {
            case "names":
                return "Facility Names";
            case "hexes":
                return "Facility Outlines";
            case "lattice":
                return "Lattice Links";
            case "terrain":
                return "Terrain";
            case "canvas":
                return "Drawing Canvas";
            default:
                return "Unknown";
        }
    };
    ["canvas", "names", "lattice", "hexes", "terrain"].forEach(id => {
        const name = layerNameFromId(id);
        const toggle = document.createElement("div");
        toggle.setAttribute("data-active", "");
        toggle.setAttribute("layer-id", id);
        toggle.innerText = name;
        toggle.addEventListener("change", () => {
            StateManager.dispatch(State.user.layerVisibilityChanged, {
                id, visible: toggle.hasAttribute("data-active"),
            } as never);
        });
        container.insertAdjacentElement("afterbegin", toggle);

        StateManager.dispatch(State.user.layerVisibilityChanged, {
            id, visible: true,
        } as never);
    });

    return heroMap;
}

function setUpMapPickers(): [HTMLSelectElement, HTMLSelectElement] {

    // Server picker
    const serverPicker = document.getElementById(
        "server-dropdown") as HTMLSelectElement;
    serverPicker.addEventListener("change", () => {
        const server = GameData.getInstance().servers()
            .find(s => s.id === parseInt(serverPicker.value, 10));
        if (!server)
            throw new Error(`Server ${serverPicker.value} not found`);
        StateManager.dispatch(State.user.serverChanged, server as never);
    });

    // Continent picker
    const continentPicker = document.getElementById(
        "continent-dropdown") as HTMLSelectElement;
    continentPicker.addEventListener("change", () => {
        const continent = GameData.getInstance().continents()
            .find(c => c.id === parseInt(continentPicker.value, 10));
        if (!continent)
            throw new Error(`Continent ${continentPicker.value} not found`);
        StateManager.dispatch(State.user.continentChanged, continent as never);
    });

    return [serverPicker, continentPicker];
}

function setUpMinimap(element: HTMLDivElement): Minimap {
    const minimap = new Minimap(element);

    document.addEventListener("ps2map_viewboxchanged", event => {
        const evt = (event as CustomEvent<ViewBoxChangedEvent>).detail;
        minimap.updateViewbox(evt.viewBox);
    }, { passive: true });

    StateManager.subscribe(State.map.baseCaptured, state => {
        minimap.updateBaseOwnership(state.map.baseOwnership);
    });

    StateManager.subscribe(State.user.continentChanged, state => {
        const cont = state.user.continent;
        if (!cont)
            return;
        GameData.getInstance().setActiveContinent(cont)
            .then(() => {
                minimap.switchContinent(cont).then(() => {
                    minimap.updateBaseOwnership(state.map.baseOwnership);
                });
            });
    });

    return minimap;
}

function setUpSidebarResizing(): void {
    const grabber = document.getElementById("sidebar-grabber") as HTMLDivElement;
    grabber.addEventListener("mousedown", (event: MouseEvent) => {
        document.body.style.cursor = "col-resize";
        // const box = minimap.element.firstElementChild as HTMLDivElement;
        // box.style.transition = "none";

        const sidebar = document.getElementById("sidebar") as HTMLDivElement;
        const initialWidth = sidebar.clientWidth;
        let minWidth = 0.1;
        minWidth *= document.body.clientWidth;
        const maxWidth = 512;

        const startX = event.clientX;
        const onMove = (evt: MouseEvent) => {
            const delta = evt.clientX - startX;
            let newWidth = initialWidth + delta;
            if (newWidth < minWidth)
                newWidth = minWidth;
            else if (newWidth > maxWidth)
                newWidth = maxWidth;
            document.body.style.setProperty("--sidebar-width", `${newWidth}px`);
        };

        const onUp = () => {
            document.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseup", onUp);
            document.body.style.removeProperty("cursor");
            // box.style.removeProperty("transition");
        };

        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseup", onUp);
    });
}

function setUpToolbox(heroMap: HeroMap): void {
    StateManager.dispatch(State.toolbox.setup, heroMap as never);
    StateManager.dispatch(State.toolbox.setTool, Tool.id as never);
}

/** Initialisation hook for components that need to be run on DOM load. */
document.addEventListener("DOMContentLoaded", () => {

    // Create main components
    const heroMap = setUpHeroMap(
        document.getElementById("map") as HTMLDivElement);
    // const minimap = setUpMinimap(
    //     document.getElementById("minimap") as HTMLDivElement);

    // Hook up sidebar resize grabber
    setUpSidebarResizing();

    // Create map state listener
    const listener = new MapListener();
    listener.subscribe((name, data) => {
        StateManager.dispatch(`map/${name}`, data as never);
    });
    StateManager.subscribe(State.user.serverChanged, state => {
        if (state.user.server)
            listener.switchServer(state.user.server);
    });

    // Set up toolbox
    // setUpToolbox(heroMap);

    // Hook up map pickers
    const [serverPicker, continentPicker] = setUpMapPickers();

    // Load game data
    GameData.load().then(gameData => {
        const servers = [...gameData.servers()];
        const continents = [...gameData.continents()];
        // Populate server picker
        servers.sort((a, b) => a.name.localeCompare(b.name));
        servers.forEach(server => {
            const option = document.createElement("option");
            option.value = server.id.toString();
            option.text = server.name;
            serverPicker.appendChild(option);
        });
        // Populate continent picker
        continents.sort((a, b) => a.name.localeCompare(b.name));
        continents.forEach(cont => {
            const option = document.createElement("option");
            option.value = cont.id.toString();
            option.text = cont.name;
            continentPicker.appendChild(option);
        });
        // Set default server and continent
        StateManager.dispatch(State.user.serverChanged,
            servers[0] as never);
        StateManager.dispatch(State.user.continentChanged,
            continents[0] as never);
    });

    // const baseFinderBtn = document.getElementById("base-finder-btn") as HTMLInputElement;
    // baseFinderBtn.addEventListener("click", () => {
    //     const finder = document.getElementById("base-finder") as HTMLSelectElement;
    //     if (finder.value)
    //         heroMap.jumpToBase(parseInt(finder.value, 10));
    // });
    // StateManager.subscribe(State.user.continentChanged, async state => {
    //     const bases = await GameData.getInstance().getBasesForContinent(
    //         state.user.continent);
    //     bases.sort((a, b) => a.name.localeCompare(b.name));
    //     const options: HTMLOptionElement[] = [];
    //     bases.forEach(base => {
    //         const option = document.createElement("option");
    //         option.value = base.id.toString();
    //         option.text = base.name;
    //         options.push(option);
    //     });
    //     const finder = document.getElementById("base-finder") as HTMLSelectElement;
    //     finder.innerHTML = "";
    //     options.forEach(option => finder.appendChild(option));
    // });

    // StateManager.subscribe(State.user.baseHovered, state => {
    //     const names = heroMap.getLayer<BaseNamesLayer>("names");
    //     if (names)
    //         names.setHoveredBase(state.user.hoveredBase);
    // });
});
