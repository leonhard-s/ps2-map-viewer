"use strict";
var ownershipColorsCSS = [
    getComputedStyle(document.documentElement).getPropertyValue("--COLOR-FG-CAPPED-NULL").trim(),
    getComputedStyle(document.documentElement).getPropertyValue("--COLOR-FG-CAPPED-NC").trim(),
    getComputedStyle(document.documentElement).getPropertyValue("--COLOR-FG-CAPPED-TR").trim(),
    getComputedStyle(document.documentElement).getPropertyValue("--COLOR-FG-CAPPED-VS").trim()
];
function cycleFactionColour(event) {
    if (!(event.target instanceof SVGElement)) {
        return;
    }
    if (event.button != 1) {
        return;
    }
    if (!event.target.style.fill) {
        event.target.style.fill = ownershipColorsCSS[0];
    }
    for (var i = 0; i < ownershipColorsCSS.length; i++) {
        if (event.target.style.fill == ownershipColorsCSS[i]) {
            if (i + 1 < ownershipColorsCSS.length) {
                event.target.style.fill = ownershipColorsCSS[i + 1];
            }
            else {
                event.target.style.fill = ownershipColorsCSS[0];
            }
            break;
        }
    }
}
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var mapTextureDir = "./img/map";
var mapTextureResolution = 8192;
var MapTileLod;
(function (MapTileLod) {
    MapTileLod[MapTileLod["LOD0"] = 0] = "LOD0";
    MapTileLod[MapTileLod["LOD1"] = 1] = "LOD1";
    MapTileLod[MapTileLod["LOD2"] = 2] = "LOD2";
    MapTileLod[MapTileLod["LOD3"] = 3] = "LOD3";
})(MapTileLod || (MapTileLod = {}));
var maxLod = 3;
var MapRenderer = (function () {
    function MapRenderer(viewport, map, continent) {
        this.viewport = viewport;
        this.map = map;
        this.continent = continent;
        this.zoom = this.minZoom;
        map.addEventListener("selectstart", this.preventSelection);
        var lod = this.getLodForZoomLevel(this.zoom);
        var mapTextureLayer = document.getElementById("mapTextureLayer");
        this.loadMapTiles(mapTextureLayer, continent, lod);
        var hexesLayer = document.getElementById("mapHexLayer");
        this.loadMapHexes(hexesLayer, continent);
        var baseNameLayer = document.getElementById("mapBaseNameLayer");
        this.setBaseNames(baseNameLayer, 6);
        map.addEventListener("wheel", this.mapZoomCallback.bind(this), { "passive": false });
        map.addEventListener("mousedown", this.mapPan.bind(this));
    }
    MapRenderer.prototype.layerVisibilityHook = function (layerId, checkboxId) {
        var layer = document.getElementById(layerId);
        var checkbox = document.getElementById(checkboxId);
        checkbox.addEventListener("click", function () {
            layer.style.visibility = checkbox.checked ? "visible" : "hidden";
        });
    };
    Object.defineProperty(MapRenderer.prototype, "viewportMinorAxis", {
        get: function () {
            return Math.min(this.viewport.clientHeight, this.viewport.clientWidth);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MapRenderer.prototype, "minZoom", {
        get: function () {
            return 1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MapRenderer.prototype, "maxZoom", {
        get: function () {
            return 2 * mapTextureResolution / this.viewportMinorAxis;
        },
        enumerable: false,
        configurable: true
    });
    MapRenderer.prototype.getNumTiles = function (lod) {
        return Math.pow(2, (maxLod - lod));
    };
    MapRenderer.prototype.loadMapTiles = function (layer, continent, lod) {
        if (lod === void 0) { lod = MapTileLod.LOD1; }
        layer.innerHTML = "";
        var numTiles = this.getNumTiles(lod);
        if (numTiles <= 1) {
            var tile = this.getMapTilePath(continent, lod, 0, 0);
            layer.innerHTML = "<div style=\"background-image: url(" + tile + ")\"></div>";
            return;
        }
        for (var y = numTiles / 2; y > -numTiles / 2 - 1; y--) {
            if (y == 0) {
                continue;
            }
            for (var x = -numTiles / 2; x < numTiles / 2 + 1; x++) {
                if (x == 0) {
                    continue;
                }
                var tile = this.getMapTilePath(continent, lod, x, y);
                var div = document.createElement("div");
                div.style.backgroundImage = "url(" + tile + ")";
                layer.appendChild(div);
            }
        }
    };
    MapRenderer.prototype.loadMapHexes = function (layer, continent) {
        return __awaiter(this, void 0, void 0, function () {
            var cInfo, baseMap, innerHtml, size, i, key, i, element;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, getContinentInfo(6)];
                    case 1:
                        cInfo = _a.sent();
                        baseMap = cInfo.map_base_svgs;
                        innerHtml = "";
                        size = Object.keys(baseMap).length;
                        for (i = 0; i < size; i++) {
                            key = Object.keys(baseMap)[i];
                            innerHtml += baseMap[key];
                        }
                        layer.innerHTML = innerHtml;
                        registerDebugFactionCycler();
                        for (i = 0; i < size; i++) {
                            element = layer.children[i];
                            element.addEventListener("mouseenter", this.baseHoverCallback);
                        }
                        return [2];
                }
            });
        });
    };
    MapRenderer.prototype.baseHoverCallback = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var baseId, bInfoList, bInfo, i, baseName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(event.target instanceof SVGElement)) {
                            return [2];
                        }
                        baseId = parseInt(event.target.id);
                        return [4, getBaseInfo(6)];
                    case 1:
                        bInfoList = _a.sent();
                        bInfo = bInfoList[0];
                        for (i = 0; i < bInfoList.length; i++) {
                            if (bInfoList[i].id == baseId) {
                                bInfo = bInfoList[i];
                            }
                        }
                        baseName = document.getElementById("baseName");
                        baseName.innerHTML = bInfo.name;
                        return [2];
                }
            });
        });
    };
    MapRenderer.prototype.setBaseNames = function (layer, continent) {
        return __awaiter(this, void 0, void 0, function () {
            var bases;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, getBaseInfo(continent)];
                    case 1:
                        bases = _a.sent();
                        bases.forEach(function (base) {
                            var container = document.createElement("div");
                            var offsetX = (4096 + base.map_pos[0]) * _this.zoom / 8.8;
                            var offsetY = (4096 + base.map_pos[1]) * _this.zoom / 8.8;
                            container.style.left = offsetX + "px";
                            container.style.bottom = offsetY + "px";
                            var icon = document.createElement("object");
                            icon.setAttribute("data", "img/icons/warp-gate.svg");
                            icon.setAttribute("type", "image/svg+xml");
                            container.appendChild(icon);
                            var name = document.createElement("span");
                            name.innerHTML = base.name;
                            container.appendChild(name);
                            layer.appendChild(container);
                        });
                        return [2];
                }
            });
        });
    };
    MapRenderer.prototype.applyZoomLevel = function (zoomLevel) {
        this.zoom = zoomLevel;
        var newMapSize = Math.round(this.viewportMinorAxis * zoomLevel);
        document.documentElement.style.setProperty("--MAP-SIZE", newMapSize + "px");
        var lod = this.getLodForZoomLevel(zoomLevel);
        var numTiles = this.getNumTiles(lod);
        var mapTextureLayer = document.getElementById("mapTextureLayer");
        document.documentElement.style.setProperty("--MAP-TILES-PER-AXIS", numTiles.toString());
        this.loadMapTiles(mapTextureLayer, this.continent, lod);
        var mapBaseNameLayer = document.getElementById("mapBaseNameLayer");
        mapBaseNameLayer.innerHTML = "";
        this.setBaseNames(mapBaseNameLayer, 6);
    };
    MapRenderer.prototype.getMapTilePath = function (tileSet, lod, tileX, tileY) {
        return mapTextureDir + "/" + tileSet + "/lod" + lod + "/lod" + lod + "_" + Math.round(tileX) + "_" + Math.round(tileY) + ".png";
    };
    MapRenderer.prototype.getLodForZoomLevel = function (zoomLevel) {
        if (zoomLevel >= 8) {
            return MapTileLod.LOD0;
        }
        if (zoomLevel >= 4) {
            return MapTileLod.LOD1;
        }
        if (zoomLevel >= 2) {
            return MapTileLod.LOD2;
        }
        return MapTileLod.LOD3;
    };
    MapRenderer.prototype.mapZoomCallback = function (event) {
        event.preventDefault();
        var newZoom = event.deltaY < 0 ? this.zoom * 1.25 : this.zoom * 0.8;
        if (newZoom < this.minZoom) {
            newZoom = this.minZoom;
        }
        else if (newZoom > this.maxZoom) {
            newZoom = this.maxZoom;
        }
        this.applyZoomLevel(newZoom);
    };
    MapRenderer.prototype.mapPan = function (event) {
        if (event.button != 0) {
            return;
        }
        var map = this.map;
        var viewport = this.viewport;
        var panStartLeft = viewport.scrollLeft;
        var panStartTop = viewport.scrollTop;
        function mapPanDrag(dragEvent) {
            var deltaX = dragEvent.clientX - event.clientX;
            var deltaY = dragEvent.clientY - event.clientY;
            viewport.scrollLeft = panStartLeft - deltaX;
            viewport.scrollTop = panStartTop - deltaY;
        }
        function mapPanEnd() {
            map.removeEventListener("mousemove", mapPanDrag);
            document.removeEventListener("mouseup", mapPanEnd);
        }
        map.addEventListener("mousemove", mapPanDrag);
        document.addEventListener("mouseup", mapPanEnd);
    };
    MapRenderer.prototype.preventSelection = function () {
        return false;
    };
    return MapRenderer;
}());
function updateMapLayerVisibility(checkbox, layer) {
    return function () {
        layer.style.visibility = checkbox.checked ? "visible" : "hidden";
    };
}
function registerDebugFactionCycler() {
    var mapHexLayer = document.getElementById("mapHexLayer");
    mapHexLayer.addEventListener("auxclick", cycleFactionColour);
}
function onDOMLoaded() {
    var map = document.getElementById("map");
    var viewport = document.getElementById("viewport");
    var renderer = new MapRenderer(viewport, map, "amerish");
    renderer.layerVisibilityHook("mapTextureLayer", "showMapTexture");
    renderer.layerVisibilityHook("mapHexLayer", "showHexes");
    renderer.layerVisibilityHook("mapBaseNameLayer", "showBaseNames");
}
window.addEventListener("DOMContentLoaded", onDOMLoaded);
function elementFromString(html) {
    var factory = document.createElement("template");
    factory.innerHTML = html.trim();
    var child = factory.content.firstChild;
    if (child == null) {
        throw "given string did not result in a valid DOM object";
    }
    return child;
}
var restEndpoint = "http://127.0.0.1:5000/";
function getBasesFromContinent(continentId) {
    return __awaiter(this, void 0, void 0, function () {
        var url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = restEndpoint + "bases/info?continent_id=" + Math.round(continentId);
                    return [4, fetch(url).then(function (value) {
                            return value.json();
                        })];
                case 1: return [2, _a.sent()];
            }
        });
    });
}
function getContinent(continentId) {
    return __awaiter(this, void 0, void 0, function () {
        var url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = restEndpoint + "continents/info?continent_id=" + Math.round(continentId);
                    return [4, fetch(url).then(function (value) {
                            return value.json();
                        })];
                case 1: return [2, (_a.sent())[0]];
            }
        });
    });
}
var MapLayer = (function () {
    function MapLayer(layer, initialContinentId) {
        this.continentId = 0;
        this.layer = layer;
        this.setContinent(initialContinentId);
    }
    MapLayer.prototype.setContinent = function (continentId) {
        if (this.continentId != continentId) {
            return;
        }
        this.continentId = continentId;
    };
    MapLayer.prototype.setVisibility = function (visible) {
        this.layer.style.visibility = visible ? "visible" : "hidden";
    };
    MapLayer.prototype.onZoom = function (zoomLevel) { };
    MapLayer.prototype.clear = function () {
        var numChildren = this.layer.children.length;
        for (var i = numChildren - 1; i >= 0; i--) {
            var child = this.layer.children[i];
            this.layer.removeChild(child);
        }
    };
    return MapLayer;
}());
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BaseNameLayer = (function (_super) {
    __extends(BaseNameLayer, _super);
    function BaseNameLayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BaseNameLayer.prototype.setContinent = function (continentId) {
        var _this = this;
        var bases = getBasesFromContinent(continentId);
        bases.then(function (bases) {
            var elements = [];
            bases.forEach(function (base) {
                var container = document.createElement("div");
                var offsetX = (4096 + base.map_pos[0]) / 81.92;
                var offsetY = (4096 + base.map_pos[1]) / 81.92;
                container.style.left = offsetX + "%";
                container.style.bottom = offsetY + "%";
                var icon = document.createElement("object");
                icon.setAttribute("data", "img/icons/warp-gate.svg");
                icon.setAttribute("type", "image/svg+xml");
                container.appendChild(icon);
                var name = document.createElement("span");
                name.innerHTML = base.name;
                container.appendChild(name);
                elements.push(container);
            });
            _this.clear();
            elements.forEach(function (element) { return _this.layer.appendChild(element); });
        });
    };
    return BaseNameLayer;
}(MapLayer));
var HexLayer = (function (_super) {
    __extends(HexLayer, _super);
    function HexLayer(layer, initialContinentId) {
        return _super.call(this, layer, initialContinentId) || this;
    }
    HexLayer.prototype.setContinent = function (continentId) {
        var _this = this;
        if (this.continentId == continentId) {
            return;
        }
        this.continentId = continentId;
        var outlines = this.getBaseHexes(continentId);
        outlines.then(function (elements) {
            _this.clear();
            elements.forEach(function (child) { return _this.layer.appendChild(child); });
        });
    };
    HexLayer.prototype.getBaseHexes = function (continentId) {
        return __awaiter(this, void 0, void 0, function () {
            var cont, elements;
            return __generator(this, function (_a) {
                cont = getContinent(continentId);
                elements = cont.then(function (contInfo) {
                    var svgs = [];
                    for (var key in contInfo.map_base_svgs) {
                        svgs.push(elementFromString(contInfo.map_base_svgs[key]));
                    }
                    return svgs;
                });
                return [2, elements];
            });
        });
    };
    return HexLayer;
}(MapLayer));
var tileDir = "./img/map";
var mapBaseRes = 8192;
var TileLayer = (function (_super) {
    __extends(TileLayer, _super);
    function TileLayer(layer, initialContinentId) {
        var _this = _super.call(this, layer, initialContinentId) || this;
        _this.lod = 3;
        _this.tileSet = "bogus";
        return _this;
    }
    TileLayer.prototype.setContinent = function (continentId) {
        if (this.continentId == continentId) {
            return;
        }
        this.continentId = continentId;
        this.setTileSet(continentId);
    };
    TileLayer.prototype.onZoom = function (zoomLevel) {
        var newLod = 0;
        if (zoomLevel >= 8) {
            newLod = 0;
        }
        else if (zoomLevel >= 4) {
            newLod = 1;
        }
        else if (zoomLevel >= 2) {
            newLod = 2;
        }
        else {
            newLod = 3;
        }
        var numTiles = this.getNumTiles(newLod);
        document.documentElement.style.setProperty("--MAP-TILES-PER-AXIS", numTiles.toString());
    };
    TileLayer.prototype.setTileSet = function (continentId) {
        return __awaiter(this, void 0, void 0, function () {
            var cont;
            var _this = this;
            return __generator(this, function (_a) {
                cont = getContinent(continentId);
                cont.then(function (contInfo) {
                    _this.tileSet = contInfo.map_tileset;
                    _this.updateTiles();
                });
                return [2];
            });
        });
    };
    TileLayer.prototype.updateTiles = function () {
        var _this = this;
        var numTiles = this.getNumTiles(this.lod);
        if (numTiles <= 1) {
            var tile = this.getMapTilePath(this.tileSet, this.lod, 0, 0);
            var str = "<div style=\"background-image: url(" + tile + ")\"></div>";
            var element = elementFromString(str);
            this.clear();
            this.layer.appendChild(element);
            return;
        }
        var newTiles = [];
        for (var y = numTiles / 2; y > -numTiles / 2 - 1; y--) {
            if (y == 0) {
                continue;
            }
            for (var x = -numTiles / 2; x < numTiles / 2 + 1; x++) {
                if (x == 0) {
                    continue;
                }
                var tile = this.getMapTilePath(this.tileSet, this.lod, x, y);
                var div = document.createElement("div");
                div.style.backgroundImage = "url(" + tile + ")";
                newTiles.push(div);
            }
        }
        this.clear();
        newTiles.forEach(function (tile) { return _this.layer.appendChild(tile); });
    };
    TileLayer.prototype.getNumTiles = function (lod) {
        if (lod < 0) {
            throw "lod must be greater than zero";
        }
        return Math.pow(2, (3 - lod));
    };
    TileLayer.prototype.getMapTilePath = function (tileName, lod, tileX, tileY) {
        return tileDir + "/" + tileName + "/lod" + lod + "/lod" + lod + "_" + Math.round(tileX) + "_" + Math.round(tileY) + ".png";
    };
    return TileLayer;
}(MapLayer));
