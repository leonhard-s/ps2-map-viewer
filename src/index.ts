/// <reference path="./api/index.ts" />
/// <reference path="./hero-map.ts" />

/** Initialisation hook for components that need to be run on DOM load. */
document.addEventListener("DOMContentLoaded", () => {

    // Initialise the map controller for the primary map
    const viewport = document.getElementById("hero-map");
    if (viewport == null)
        throw "Unable to locate viewport element";
    if (viewport.tagName != "DIV")
        throw `Expected viewport of type "DIV" (got ${viewport.tagName})`;
    const heroMap = new HeroMap(viewport as HTMLDivElement);

    const dropdown = document.getElementById("continent-selector") as HTMLSelectElement;
    // TODO: Create loading screen or other UI to indicate that we are talking
    // to the API
    Api.getContinentList()
        .then((continentList) => {
            continentList.sort((a, b) => b.name.localeCompare(a.name))
            let i = continentList.length;
            while (i-- > 0) {
                const cont = continentList[i];
                const option = document.createElement("option");
                option.value = JSON.stringify(cont);
                option.text = cont.name;
                dropdown.appendChild(option);
            }
            // TODO: Load last selected continent rather than the first one
            heroMap.setContinent(JSON.parse(dropdown.value));
        });

    // Hook up event handlers for map selection
    dropdown.addEventListener("change", () => {
        heroMap.setContinent(JSON.parse(dropdown.value));
    });
});