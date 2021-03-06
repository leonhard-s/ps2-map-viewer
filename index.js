"use strict";
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
var GameData = (function () {
    function GameData() {
        this._continents = [];
        this._servers = [];
        this._bases = [];
    }
    GameData.prototype.continents = function () { return this._continents; };
    GameData.prototype.servers = function () { return this._servers; };
    GameData.prototype.getBase = function (id) {
        var i = this._bases.length;
        while (i-- > 0)
            if (this._bases[i].id === id)
                return this._bases[i];
        return undefined;
    };
    GameData.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this._loaded)
                    return [2, this._instance];
                if (this._loading)
                    return [2, this._loading];
                this._loading = this._loadInternal();
                return [2, this._loading];
            });
        });
    };
    GameData.getInstance = function () {
        if (!this._loaded)
            throw new Error("Game data not loaded");
        return this._instance;
    };
    GameData._loadInternal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var continents, servers, loading;
            var _this = this;
            return __generator(this, function (_a) {
                continents = fetchContinents();
                servers = fetchServers();
                loading = Promise.all([continents, servers])
                    .then(function (_a) {
                    var continents = _a[0], servers = _a[1];
                    var instance = new GameData();
                    instance._continents = continents;
                    instance._servers = servers;
                    _this._instance = instance;
                    _this._loaded = true;
                    return instance;
                }).then(function (instance) {
                    instance._continents.forEach(function (c) {
                        fetchBasesForContinent(c.id)
                            .then(function (bases) {
                            var _a;
                            (_a = instance._bases).push.apply(_a, bases);
                        });
                    });
                    return instance;
                });
                return [2, loading];
            });
        });
    };
    GameData._loaded = false;
    return GameData;
}());
var Camera = (function () {
    function Camera(mapDimensions, viewportDimensions, stepSize, maxZoom) {
        if (stepSize === void 0) { stepSize = 1.5; }
        if (maxZoom === void 0) { maxZoom = 4.0; }
        this._zoomIndex = -1;
        this._zoomLevels = [];
        this._mapDimensions = mapDimensions;
        this._viewportDimensions = viewportDimensions;
        this._stepSize = stepSize;
        this._maxZoom = maxZoom;
        this._zoomLevels = this._calculateZoomLevels();
        this._zoomIndex = this._zoomLevels.length - 1;
        this.target = {
            x: mapDimensions.width * 0.5,
            y: mapDimensions.height * 0.5
        };
    }
    Camera.prototype.getZoom = function () {
        var zoom = this._zoomLevels[this._zoomIndex];
        if (zoom === undefined)
            throw new Error("Invalid zoom level");
        return zoom;
    };
    Camera.prototype.bumpZoom = function (value) {
        var index = this._zoomIndex;
        if (value < 0)
            index--;
        else if (value > 0)
            index++;
        if (index < 0)
            index = 0;
        else if (index >= this._zoomLevels.length)
            index = this._zoomLevels.length - 1;
        this._zoomIndex = index;
        return this._zoomLevels[index];
    };
    Camera.prototype.currentViewBox = function () {
        var zoom = this.getZoom();
        var height = this._viewportDimensions.height / zoom;
        var width = this._viewportDimensions.width / zoom;
        return {
            top: this.target.y + height * 0.5,
            right: this.target.x + width * 0.5,
            bottom: this.target.y - height * 0.5,
            left: this.target.x - width * 0.5
        };
    };
    Camera.prototype.jumpTo = function (point) {
        this.target = point;
    };
    Camera.prototype.zoomTowards = function (value, viewportRelPos) {
        var oldZoom = this.getZoom();
        var zoom = this.bumpZoom(value);
        var deltaX = (this._viewportDimensions.width / oldZoom)
            - (this._viewportDimensions.width / zoom);
        var deltaY = (this._viewportDimensions.height / oldZoom)
            - (this._viewportDimensions.height / zoom);
        var ratioX = -0.5 + viewportRelPos.x;
        var ratioY = +0.5 - viewportRelPos.y;
        this.target = {
            x: Math.round(this.target.x + deltaX * ratioX),
            y: Math.round(this.target.y + deltaY * ratioY)
        };
        return this.target;
    };
    Camera.prototype._calculateZoomLevels = function () {
        var minViewport = Math.min(this._viewportDimensions.width, this._viewportDimensions.height);
        var maxMap = Math.max(this._mapDimensions.width, this._mapDimensions.height);
        var zoomLevels = [this._maxZoom];
        if (minViewport === 0)
            return zoomLevels;
        var factor = 1 / this._stepSize;
        var zoom = this._maxZoom;
        while (maxMap * zoom > minViewport) {
            zoom *= factor;
            var newZoom = Math.round((zoom + Number.EPSILON) * 100) / 100;
            zoomLevels.push(newZoom);
        }
        return zoomLevels;
    };
    return Camera;
}());
var MapLayer = (function () {
    function MapLayer(id, mapSize) {
        var _this = this;
        this.isVisible = true;
        this._lastRedraw = null;
        this._runDeferredLayerUpdate = Utils.rafDebounce(function () {
            if (!_this._lastRedraw)
                return;
            var _a = _this._lastRedraw, viewBox = _a[0], zoom = _a[1];
            _this.deferredLayerUpdate(viewBox, zoom);
        });
        this.id = id;
        this.mapSize = mapSize;
        this.element = document.createElement("div");
        this.element.id = id;
        this.element.classList.add("ps2map__layer");
        this.element.style.height = this.element.style.width = "".concat(mapSize, "px");
        this.element.addEventListener("transitionend", this.runDeferredLayerUpdate.bind(this), { passive: true });
    }
    MapLayer.prototype.setRedrawArgs = function (viewBox, zoom) {
        this._lastRedraw = [viewBox, zoom];
    };
    MapLayer.prototype.setVisibility = function (visible) {
        if (this.isVisible === visible)
            return;
        if (visible)
            this.element.style.removeProperty("display");
        else
            this.element.style.display = "none";
        this.isVisible = visible;
    };
    MapLayer.prototype.updateLayer = function () {
        this.element.dispatchEvent(new Event("transitionend"));
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
var StaticLayer = (function (_super) {
    __extends(StaticLayer, _super);
    function StaticLayer(id, mapSize) {
        return _super.call(this, id, mapSize) || this;
    }
    StaticLayer.prototype.deferredLayerUpdate = function (_, __) { };
    StaticLayer.prototype.redraw = function (viewBox, zoom) {
        var targetX = (viewBox.right + viewBox.left) * 0.5;
        var targetY = (viewBox.top + viewBox.bottom) * 0.5;
        var halfMapSize = this.mapSize * 0.5;
        var offsetX = -halfMapSize;
        var offsetY = -halfMapSize;
        offsetX += (halfMapSize - targetX) * zoom;
        offsetY -= (halfMapSize - targetY) * zoom;
        this.element.style.transform = ("matrix(".concat(zoom, ", 0.0, 0.0, ").concat(zoom, ", ").concat(offsetX, ", ").concat(offsetY, ")"));
    };
    return StaticLayer;
}(MapLayer));
var Utils;
(function (Utils) {
    function clamp(value, min, max) {
        if (max <= min)
            return min;
        if (value < min)
            return min;
        if (value > max)
            return max;
        return value;
    }
    Utils.clamp = clamp;
    function rafDebounce(target) {
        var isScheduled = false;
        var handle = 0;
        function wrapper() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (isScheduled)
                cancelAnimationFrame(handle);
            handle = requestAnimationFrame(function () {
                target.apply(wrapper, args);
                isScheduled = false;
            });
            isScheduled = true;
        }
        return wrapper;
    }
    Utils.rafDebounce = rafDebounce;
    function rectanglesIntersect(a, b) {
        return (a.left < b.right
            && a.right > b.left
            && a.top > b.bottom
            && a.bottom < b.top);
    }
    Utils.rectanglesIntersect = rectanglesIntersect;
})(Utils || (Utils = {}));
var MapRenderer = (function () {
    function MapRenderer(viewport, mapSize) {
        var _this = this;
        this._mapSize = 1024;
        this._layers = [];
        this._isPanning = false;
        this._onZoom = Utils.rafDebounce(function (evt) {
            evt.preventDefault();
            if (_this._isPanning)
                return;
            var view = _this.viewport.getBoundingClientRect();
            var relX = Utils.clamp((evt.clientX - view.left) / view.width, 0.0, 1.0);
            var relY = Utils.clamp((evt.clientY - view.top) / view.height, 0.0, 1.0);
            _this._camera.zoomTowards(evt.deltaY, { x: relX, y: relY });
            _this._constrainMapTarget();
            _this._redraw(_this.getViewBox(), _this._camera.getZoom());
        });
        this.viewport = viewport;
        this.viewport.classList.add("ps2map__viewport");
        this._anchor = document.createElement("div");
        this._anchor.classList.add("ps2map__anchor");
        this.viewport.appendChild(this._anchor);
        this._camera = new Camera({
            width: mapSize, height: mapSize
        }, {
            width: this.viewport.clientWidth,
            height: this.viewport.clientHeight
        });
        this.setMapSize(mapSize);
        this.camera = new MapCamera(mapSize, this.viewport.clientHeight, this.viewport.clientWidth);
        this.panOffsetX = this.viewport.clientWidth * 0.5;
        this.panOffsetY = this.viewport.clientHeight * 0.5;
        this.anchor.style.left = "".concat(this.panOffsetX, "px");
        this.anchor.style.top = "".concat(this.panOffsetY, "px");
        this.viewport.addEventListener("wheel", this.onZoom.bind(this), {
            passive: false
        });
        this.viewport.addEventListener("mousedown", this._mousePan.bind(this), {
            passive: true
        });
    }
    MapRenderer.prototype.getViewBox = function () {
        return this._camera.currentViewBox();
    };
    MapRenderer.prototype.getMapSize = function () {
        return this._mapSize;
    };
    MapRenderer.prototype.addLayer = function (layer) {
        if (layer.mapSize !== this._mapSize)
            throw "Map layer size must match the map renderer's.";
        this._layers.push(layer);
        this._anchor.appendChild(layer.element);
        this._redraw(this.getViewBox(), this._camera.getZoom());
    };
    MapRenderer.prototype.getLayer = function (id) {
        for (var _i = 0, _a = this._layers; _i < _a.length; _i++) {
            var layer = _a[_i];
            if (layer.id === id)
                return layer;
        }
        return undefined;
    };
    MapRenderer.prototype.clearLayers = function () {
        this._anchor.innerText = "";
        this._layers = [];
    };
    MapRenderer.prototype.forEachLayer = function (callback) {
        var i = this._layers.length;
        while (i-- > 0)
            callback(this._layers[i]);
    };
    MapRenderer.prototype.jumpTo = function (target) {
        this._camera.jumpTo(target);
        this._constrainMapTarget();
        this._redraw(this.getViewBox(), this._camera.getZoom());
    };
    MapRenderer.prototype.setMapSize = function (value) {
        if (this._layers.length > 0)
            throw "Remove all map layers before changing map size.";
        this._mapSize = value;
        this._camera = new Camera({
            width: value, height: value
        }, {
            width: this.viewport.clientWidth,
            height: this.viewport.clientHeight
        });
    };
    MapRenderer.prototype._mousePan = function (evtDown) {
        var _this = this;
        if (evtDown.button === 2)
            return;
        this._setPanLock(true);
        var panStart = {
            x: this._camera.target.x,
            y: this._camera.target.y
        };
        var zoom = this._camera.getZoom();
        var startX = evtDown.clientX;
        var startY = evtDown.clientY;
        var drag = Utils.rafDebounce(function (evtDrag) {
            _this._camera.jumpTo({
                x: panStart.x - (evtDrag.clientX - startX) / zoom,
                y: panStart.y + (evtDrag.clientY - startY) / zoom
            });
            _this._constrainMapTarget();
            _this._redraw(_this.getViewBox(), zoom);
        });
        var up = function () {
            _this._setPanLock(false);
            _this.viewport.removeEventListener("mousemove", drag);
            document.removeEventListener("mouseup", up);
            _this._layers.forEach(function (layer) { return layer.updateLayer(); });
        };
        document.addEventListener("mouseup", up);
        this.viewport.addEventListener("mousemove", drag, {
            passive: true
        });
    };
    MapRenderer.prototype._setPanLock = function (locked) {
        this._isPanning = locked;
        var i = this._layers.length;
        while (i-- > 0) {
            var element = this._layers[i].element;
            if (locked)
                element.style.transition = "transform 0ms ease-out";
            else
                element.style.removeProperty("transition");
        }
    };
    MapRenderer.prototype._redraw = function (viewBox, zoom) {
        var i = this._layers.length;
        while (i-- > 0) {
            var layer = this._layers[i];
            layer.redraw(viewBox, zoom);
            layer.setRedrawArgs(viewBox, zoom);
        }
        this._anchor.dispatchEvent(this._buildViewBoxChangedEvent(viewBox));
    };
    MapRenderer.prototype._constrainMapTarget = function () {
        var targetX = this._camera.target.x;
        var targetY = this._camera.target.y;
        if (targetX < 0)
            targetX = 0;
        if (targetX > this._mapSize)
            targetX = this._mapSize;
        if (targetY < 0)
            targetY = 0;
        if (targetY > this._mapSize)
            targetY = this._mapSize;
        this._camera.target = {
            x: targetX,
            y: targetY
        };
    };
    MapRenderer.prototype._buildViewBoxChangedEvent = function (viewBox) {
        return new CustomEvent("ps2map_viewboxchanged", {
            detail: {
                viewBox: viewBox
            },
            bubbles: true,
            cancelable: true
        });
    };
    return MapRenderer;
}());
var Api;
(function (Api) {
    var restEndpoint = "http://127.0.0.1:5000/";
    function getBasesFromContinent(continentId) {
        var rounded = Math.round(continentId);
        var url = "".concat(restEndpoint, "bases/info?continent_id=").concat(rounded);
        return fetch(url).then(function (value) {
            return value.json();
        });
    }
    Api.getBasesFromContinent = getBasesFromContinent;
    function getContinent(continentId) {
        var url = "".concat(restEndpoint, "continents/info");
        return fetch(url)
            .then(function (value) {
            return value.json();
        })
            .then(function (contList) {
            for (var i = 0; i < contList.length; i++) {
                var cont = contList[i];
                if (cont.id == continentId)
                    return cont;
            }
            throw "unknown continent ID: ".concat(continentId);
        });
    }
    return SupportsBaseOwnership;
}());
;
var BasePolygonsLayer = (function (_super) {
    __extends(BasePolygonsLayer, _super);
    function BasePolygonsLayer(id, mapSize) {
        var _this = _super.call(this, id, mapSize) || this;
        _this.element.classList.add("ps2map__base-hexes");
        return _this;
    }
    BasePolygonsLayer.factory = function (continent, id) {
        return __awaiter(this, void 0, void 0, function () {
            var layer;
            return __generator(this, function (_a) {
                layer = new BasePolygonsLayer(id, continent.map_size);
                return [2, fetchContinentOutlines(continent.code)
                        .then(function (svg) {
                        svg.classList.add("ps2map__base-hexes__svg");
                        layer.element.appendChild(svg);
                        layer._applyPolygonHoverFix(svg);
                        return layer;
                    })];
            });
        });
    };
    BasePolygonsLayer.prototype.updateBaseOwnership = function (baseOwnershipMap) {
        var _this = this;
        var svg = this.element.firstElementChild;
        if (!svg)
            throw "Unable to find HexLayer SVG element";
        var colours = {
            0: "rgba(0, 0, 0, 1.0)",
            1: "rgba(160, 77, 183, 1.0)",
            2: "rgba(81, 123, 204, 1.0)",
            3: "rgba(226, 25, 25, 1.0)",
            4: "rgba(255, 255, 255, 1.0)"
        };
        baseOwnershipMap.forEach(function (owner, baseId) {
            var polygon = svg.querySelector("#".concat(_this._baseIdToPolygonId(baseId)));
            if (!polygon)
                throw "Unable to find polygon for base ".concat(baseId);
            polygon.style.fill = colours[owner];
        });
    };
    BasePolygonsLayer.prototype._applyPolygonHoverFix = function (svg) {
        var _this = this;
        svg.querySelectorAll("polygon").forEach(function (polygon) {
            polygon.id = _this._baseIdToPolygonId(polygon.id);
            var addHoverFx = function () {
                svg.appendChild(polygon);
                var removeHoverFx = function () { return polygon.style.removeProperty("stroke"); };
                polygon.addEventListener("mouseleave", removeHoverFx, {
                    passive: true
                });
                polygon.addEventListener("touchend", removeHoverFx, {
                    passive: true
                });
                polygon.addEventListener("touchcancel", removeHoverFx, {
                    passive: true
                });
                polygon.style.stroke = "#ffffff";
                _this.element.dispatchEvent(_this._buildBaseHoverEvent(_this._polygonIdToBaseId(polygon.id), polygon));
            };
            polygon.addEventListener("mouseenter", addHoverFx, {
                passive: true
            });
            polygon.addEventListener("touchstart", addHoverFx, {
                passive: true
            });
        });
    };
    BasePolygonsLayer.prototype.deferredLayerUpdate = function (_, zoom) {
        var svg = this.element.firstElementChild;
        if (svg) {
            var strokeWith = 10 / Math.pow(1.5, zoom);
            svg.style.setProperty("--ps2map__base-hexes__stroke-width", "".concat(strokeWith, "px"));
        }
    };
    BasePolygonsLayer.prototype._buildBaseHoverEvent = function (baseId, element) {
        return new CustomEvent("ps2map_basehover", {
            detail: {
                baseId: baseId,
                element: element
            },
            bubbles: true,
            cancelable: true
        });
    };
    BasePolygonsLayer.prototype._polygonIdToBaseId = function (id) {
        return parseInt(id.substring(id.lastIndexOf("-") + 1));
    };
    BasePolygonsLayer.prototype._baseIdToPolygonId = function (baseId) {
        return "base-outline-".concat(baseId);
    };
    return BasePolygonsLayer;
}(StaticLayer));
var Minimap = (function () {
    function Minimap(element, mapSize, background) {
        this.jumpToCallbacks = [];
        this.mapSize = mapSize;
        this.element = element;
        this.cssSize = this.element.clientWidth;
        this.element.style.height = "".concat(this.cssSize, "px");
        this.viewboxElement = document.createElement("div");
        this.element.appendChild(this.viewboxElement);
        this.element.style.backgroundImage = "url(".concat(background, ")");
        this.element.style.backgroundSize = "100%";
        this.element.addEventListener("mousedown", this.jumpToPosition.bind(this), {
            passive: true
        });
    }
    Minimap.prototype.configureMinimap = function (mapSize, background) {
        this.mapSize = mapSize;
        this.element.style.backgroundImage = "url(".concat(background, ")");
    };
    LatticeLayer.prototype.updateBaseOwnership = function (baseOwnershipMap) {
        var _this = this;
        var colours = {
            0: "rgba(0, 0, 0, 0.25)",
            1: "rgba(120, 37, 143, 1.0)",
            2: "rgba(41, 83, 164, 1.0)",
            3: "rgba(186, 25, 25, 1.0)",
            4: "rgba(50, 50, 50, 1.0)"
        };
        baseOwnershipMap.forEach(function (_, baseId) {
            var links = _this._links.filter(function (l) { return l.base_a_id === baseId || l.base_b_id === baseId; });
            links.forEach(function (link) {
                var ownerA = baseOwnershipMap.get(link.base_a_id);
                var ownerB = baseOwnershipMap.get(link.base_b_id);
                if (!ownerA || !ownerB)
                    return;
                var id = "#lattice-link-".concat(link.base_a_id, "-").concat(link.base_b_id);
                var element = _this.element.querySelector(id);
                if (!element)
                    return;
                if (ownerA === ownerB)
                    element.style.stroke = colours[ownerA];
                else if (ownerA === 0 || ownerB === 0)
                    element.style.stroke = colours[0];
                else
                    element.style.stroke = "orange";
            });
        });
    };
    Minimap.prototype.setViewbox = function (viewbox) {
        var mapSize = this.mapSize;
        var relViewbox = {
            top: (viewbox.top + mapSize * 0.5) / mapSize,
            left: (viewbox.left + mapSize * 0.5) / mapSize,
            bottom: (viewbox.bottom + mapSize * 0.5) / mapSize,
            right: (viewbox.right + mapSize * 0.5) / mapSize
        };
        var relHeight = relViewbox.top - relViewbox.bottom;
        var relWidth = relViewbox.right - relViewbox.left;
        var relLeft = relViewbox.left - 0.5;
        var relTop = relViewbox.bottom - 0.5;
        this.viewboxElement.style.height = "".concat(this.cssSize * relHeight, "px");
        this.viewboxElement.style.width = "".concat(this.cssSize * relWidth, "px");
        this.viewboxElement.style.left = "".concat(this.cssSize * relLeft, "px");
        this.viewboxElement.style.bottom = "".concat(this.cssSize * relTop, "px");
    };
    return Minimap;
}());
var HeroMap = (function () {
    function HeroMap(viewport, initialContinentId, endpoint) {
        this.continentId = initialContinentId;
        var mapSize = 8192;
        this.controller = new MapRenderer(viewport, mapSize);
        var minimapElement = document.getElementById("minimap");
        if (minimapElement == null)
            throw "Unable to locate minimap element.";
        if (minimapElement.tagName != "DIV")
            throw "Minimap element must be a DIV";
        this.minimap = new Minimap(minimapElement, mapSize, "http://127.0.0.1:5000/static/minimap/esamir.jpg");
        this.controller.viewboxCallbacks.push(this.minimap.setViewbox.bind(this.minimap));
        this.minimap.jumpToCallbacks.push(this.controller.jumpTo.bind(this.controller));
        var terrainLayer = new TerrainLayer("terrain", mapSize);
        Api.getContinent(this.continentId).then(function (continent) {
            terrainLayer.setContinent(continent.code);
            terrainLayer.updateLayer();
        });
        this.controller.addLayer(terrainLayer);
        var hexLayer = new HexLayer("hexes", mapSize);
        Api.getContinent(this.continentId)
            .then(function (continent) {
            return fetch("".concat(endpoint, "/static/hex/").concat(continent.code, "-minimal.svg"));
        })
            .then(function (data) {
            return data.text();
        })
            .then(function (payload) {
            hexLayer.element.appendChild(hexLayer.svgFactory(payload));
            hexLayer.updateLayer();
        });
        this.controller.addLayer(hexLayer);
        var namesLayer = new BaseNamesLayer("names", mapSize);
        Api.getBasesFromContinent(this.continentId)
            .then(function (bases) {
            namesLayer.loadBaseInfo(bases);
            namesLayer.updateLayer();
        });
        this.controller.addLayer(namesLayer);
        hexLayer.polygonHoverCallbacks.push(namesLayer.onBaseHover.bind(namesLayer));
        var bases = [];
        Api.getBasesFromContinent(this.continentId).then(function (data) { return bases = data; });
        var regionName = document.getElementById("widget_base-info_name");
        var regionType = document.getElementById("widget_base-info_type");
        hexLayer.polygonHoverCallbacks.push(function (baseId) {
            var i = bases.length;
            while (i-- > 0) {
                var base = bases[i];
                if (base.id == baseId) {
                    regionName.innerText = base.name;
                    regionType.innerText = base.type_name;
                    return;
                }
            }
        });
    }
    return HeroMap;
}());
document.addEventListener("DOMContentLoaded", function () {
    var apiEndpoint = "http://127.0.0.1:5000";
    var continentId = 8;
    var viewport = document.getElementById("hero-map");
    if (viewport == null) {
        throw "Unable to locate viewport element";
    }
    if (viewport.tagName != "DIV") {
        throw "Expected viewport of type \"DIV\" (got ".concat(viewport.tagName, ")");
    }
    new HeroMap(viewport, continentId, apiEndpoint);
});
var PointFeature = (function () {
    function PointFeature(pos, id, element, minZoom) {
        if (minZoom === void 0) { minZoom = 0; }
        this.visible = true;
        this.forceVisible = false;
        this.element = element;
        this.id = id;
        this.text = text;
        this.pos = pos;
        this.minZoom = minZoom;
    }
    return BaseNameFeature;
}());
var BaseNamesLayer = (function (_super) {
    __extends(BaseNamesLayer, _super);
    function BaseNamesLayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.features = [];
        return _this;
    }
    PointLayer.prototype.redraw = function (viewbox, zoom) {
        var targetX = (viewbox.right + viewbox.left) * 0.5;
        var targetY = (viewbox.top + viewbox.bottom) * 0.5;
        var halfMapSize = this.mapSize * 0.5;
        var offsetX = -halfMapSize;
        var offsetY = -halfMapSize;
        offsetX += (halfMapSize - targetX) * zoom;
        offsetY -= (halfMapSize - targetY) * zoom;
        this.element.style.transform = ("matrix(".concat(zoom, ", 0.0, 0.0, ").concat(zoom, ", ").concat(offsetX, ", ").concat(offsetY, ")"));
    };
    PointLayer.prototype.deferredLayerUpdate = function (viewbox, zoom) {
        var unzoom = 1 / zoom;
        var i = this.features.length;
        while (i-- > 0) {
            var feat = this.features[i];
            feat.element.style.transform = ("translate(-50%, calc(var(--ps2map__base-icon-size) * ".concat(unzoom, ")) ") +
                "scale(".concat(unzoom, ", ").concat(unzoom, ")"));
            if (!feat.forceVisible)
                if (zoom >= feat.minZoom)
                    feat.element.style.display = "block";
                else
                    feat.element.style.removeProperty("display");
            feat.visible = zoom >= feat.minZoom;
        }
    };
    return PointLayer;
}(MapLayer));
var BaseNamesLayer = (function (_super) {
    __extends(BaseNamesLayer, _super);
    function BaseNamesLayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BaseNamesLayer.prototype.getBaseIconFromType = function (typeId) {
        var fileName = "large-outpost";
        switch (typeId) {
            case 2:
                fileName = "amp-station";
                break;
            case 3:
                fileName = "bio-lab";
                break;
            case 4:
                fileName = "tech-plant";
                break;
            case 5:
                fileName = "large-outpost";
                break;
            case 6:
                fileName = "small-outpost";
                break;
            case 7:
                fileName = "warpgate";
                break;
            case 9:
                fileName = "construction-outpost";
                break;
            case 11:
                fileName = "containment-site";
                break;
            default:
                console.warn("Encountered unknown facility ID: ".concat(typeId));
        }
        return fileName;
    };
    BaseNamesLayer.prototype.loadBaseInfo = function (bases) {
        var features = [];
        var i = bases.length;
        while (i-- > 0) {
            var baseInfo = bases[i];
            if (baseInfo.type_code === "no-mans-land")
                continue;
            var pos = {
                x: baseInfo.map_pos[0],
                y: baseInfo.map_pos[1]
            };
            var element = document.createElement("div");
            var name_1 = baseInfo.name;
            if (baseInfo.type_id == 2 ||
                baseInfo.type_id == 3 ||
                baseInfo.type_id == 4) {
                name_1 += " ".concat(baseInfo.type_name);
            }
            element.innerText = "".concat(name_1);
            element.classList.add("ps2map__base-names__icon");
            element.style.left = "".concat(this.mapSize * 0.5 + pos.x, "px");
            element.style.bottom = "".concat(this.mapSize * 0.5 + pos.y, "px");
            var typeName = this.getBaseIconFromType(baseInfo.type_id);
            element.classList.add("ps2map__base-names__icon__".concat(typeName));
            var minZoom = 0;
            if (baseInfo.type_code === "small-outpost")
                minZoom = 0.60;
            if (baseInfo.type_code === "large-outpost")
                minZoom = 0.45;
            features.push(new BaseNameFeature(pos, baseInfo.id, baseInfo.name, element, minZoom));
            this.element.appendChild(element);
        }
        this.features = features;
    };
    BaseNamesLayer.prototype.setHoveredBase = function (base) {
        var i = this.features.length;
        while (i-- > 0) {
            var feat = this.features[i];
            if (feat.id === (base === null || base === void 0 ? void 0 : base.id)) {
                feat.forceVisible = true;
                feat.element.innerText = feat.text;
            }
            else {
                feat.forceVisible = false;
                if (!feat.visible)
                    feat.element.innerText = "";
            }
        }
    };
    BaseNamesLayer.prototype.deferredLayerUpdate = function (_, zoom) {
        var unzoom = 1 / zoom;
        var i = this.features.length;
        while (i-- > 0) {
            var feat = this.features[i];
            feat.element.style.transform = ("translate(-50%, calc(var(--ps2map__base-icon-size) * ".concat(unzoom, ")) ") +
                "scale(".concat(unzoom, ", ").concat(unzoom, ")"));
            if (!feat.forceVisible)
                if (zoom >= feat.minZoom)
                    feat.element.innerText = feat.text;
                else
                    feat.element.innerText = "";
            feat.visible = zoom >= feat.minZoom;
        }
    };
    return BaseNamesLayer;
}(StaticLayer));
var MapTile = (function () {
    function MapTile(box, element, gridPos) {
        this.visible = true;
        this.box = box;
        this.element = element;
        this.gridPos = gridPos;
    }
    return MapTile;
}());
var TileLayer = (function (_super) {
    __extends(TileLayer, _super);
    function TileLayer(id, mapSize, initialLod) {
        var _this = _super.call(this, id, mapSize) || this;
        _this.tiles = [];
        _this.lod = initialLod;
        return _this;
    }
    TileLayer.prototype.defineTiles = function (gridSize) {
        var newTiles = [];
        var tileSize = this.mapSize / gridSize;
        var baseSize = this.mapSize / gridSize;
        var y = gridSize;
        while (y-- > 0)
            for (var x = 0; x < gridSize; x++) {
                var pos = {
                    x: x,
                    y: y
                };
                var tile = this.createTile(pos, gridSize);
                tile.element.style.height = tile.element.style.width = ("".concat(tileSize.toFixed(), "px"));
                tile.element.style.left = "".concat(pos.x * baseSize, "px");
                tile.element.style.bottom = "".concat(pos.y * baseSize, "px");
                var url = this.generateTilePath(pos, this.lod);
                tile.element.style.backgroundImage = "url(".concat(url, ")");
                newTiles.push(tile);
            }
        this.tiles = newTiles;
    };
    TileLayer.prototype.tileIsVisible = function (tile, viewBox) {
        return Utils.rectanglesIntersect(tile.box, viewBox);
    };
    TileLayer.prototype.updateTileVisibility = function (viewBox) {
        var _this = this;
        var activeTiles = [];
        var i = this.tiles.length;
        while (i-- > 0) {
            var tile = this.tiles[i];
            if (this.tileIsVisible(tile, viewBox))
                activeTiles.push(tile.element);
        }
        requestAnimationFrame(function () {
            _this.element.innerHTML = "";
            i = activeTiles.length;
            while (i-- > 0)
                _this.element.append(activeTiles[i]);
        });
    };
    TileLayer.prototype.deferredLayerUpdate = function (viewBox, _) {
        this.updateTileVisibility(viewBox);
    };
    TileLayer.prototype.redraw = function (viewBox, zoom) {
        var targetX = (viewBox.right + viewBox.left) * 0.5;
        var targetY = (viewBox.top + viewBox.bottom) * 0.5;
        var halfMapSize = this.mapSize * 0.5;
        var offsetX = -halfMapSize;
        var offsetY = -halfMapSize;
        offsetX += (halfMapSize - targetX) * zoom;
        offsetY -= (halfMapSize - targetY) * zoom;
        this.element.style.transform = ("matrix(".concat(zoom, ", 0.0, 0.0, ").concat(zoom, ", ").concat(offsetX, ", ").concat(offsetY, ")"));
    };
    return TileLayer;
}(MapLayer));
var TerrainLayer = (function (_super) {
    __extends(TerrainLayer, _super);
    function TerrainLayer(id, mapSize) {
        var _this = _super.call(this, id, mapSize, 3) || this;
        _this._code = "";
        _this.element.classList.add("ps2map__terrain");
        return _this;
    }
    TerrainLayer.factory = function (continent, id) {
        return __awaiter(this, void 0, void 0, function () {
            var layer;
            return __generator(this, function (_a) {
                layer = new TerrainLayer(id, continent.map_size);
                layer._setContinent(continent.code);
                layer.updateLayer();
                return [2, layer];
            });
        });
    };
    TerrainLayer.prototype._setContinent = function (code) {
        if (this._code === code)
            return;
        this.code = code;
        this.element.style.backgroundImage = ("url(http://127.0.0.1:5000/static/minimap/".concat(code, ".jpg)"));
        var gridSize = this.mapTilesPerAxis(this.mapSize, this.lod);
        this.defineTiles(gridSize);
    };
    TerrainLayer.prototype._calculateLod = function (zoom) {
        var adjustedZoom = zoom * devicePixelRatio;
        if (adjustedZoom < 0.125)
            return 3;
        if (adjustedZoom < 0.25)
            return 2;
        if (adjustedZoom < 0.5)
            return 1;
        return 0;
    };
    TerrainLayer.prototype.createTile = function (pos, gridSize) {
        var mapStep = this.mapSize / gridSize;
        var box = {
            left: mapStep * pos.x,
            right: mapStep * (pos.x + 1),
            top: mapStep * (pos.y + 1),
            bottom: mapStep * pos.y
        };
        var element = document.createElement("div");
        element.classList.add("ps2map__terrain__tile");
        return new MapTile(box, element, pos);
    };
    TerrainLayer.prototype._formatTileCoordinate = function (value) {
        var negative = value < 0;
        var coord = Math.abs(value).toFixed();
        if (coord.length < 3)
            coord = ("00" + coord).slice(-3);
        if (negative)
            coord = "-" + coord.slice(1);
        return coord;
    };
    TerrainLayer.prototype.generateTilePath = function (pos, lod) {
        var _a = this.gridPosToTilePos(pos, lod), tileX = _a[0], tileY = _a[1];
        var coordX = this.formatTileCoordinate(tileX);
        var coordY = this.formatTileCoordinate(tileY);
        var filename = "".concat(this.code, "_tile_").concat(coordX, "_").concat(coordY, "_lod").concat(lod, ".jpeg");
        return "http://127.0.0.1:5000/static/tile/".concat(filename);
    };
    TerrainLayer.prototype._gridPosToTilePos = function (pos, lod) {
        var min = this._mapGridLimits(this.mapSize, lod)[0];
        var stepSize = this._mapStepSize(this.mapSize, lod);
        return [min + (stepSize * pos.x), min + (stepSize * pos.y)];
    };
    TerrainLayer.prototype._mapStepSize = function (mapSize, lod) {
        if (lod === 0)
            return 4;
        if (lod === 1 || mapSize <= 1024)
            return 8;
        if (lod === 2 || mapSize <= 2048)
            return 16;
        return 32;
    };
    TerrainLayer.prototype._mapTileCount = function (mapSize, lod) {
        return Math.ceil(Math.pow(4, (Math.floor(Math.log2(mapSize)) - 8 - lod)));
    };
    TerrainLayer.prototype._mapTilesPerAxis = function (mapSize, lod) {
        return Math.floor(Math.sqrt(this._mapTileCount(mapSize, lod)));
    };
    TerrainLayer.prototype._mapGridLimits = function (mapSize, lod) {
        var stepSize = this._mapStepSize(mapSize, lod);
        var tilesPerAxis = this._mapTilesPerAxis(mapSize, lod);
        var halfSize = stepSize * Math.floor(tilesPerAxis / 2);
        if (halfSize <= 0)
            return [-stepSize, -stepSize];
        return [-halfSize, halfSize - stepSize];
    };
    TerrainLayer.prototype.deferredLayerUpdate = function (viewBox, zoom) {
        var newLod = this._calculateLod(zoom);
        if (this.lod !== newLod) {
            this.lod = newLod;
            this.defineTiles(this._mapTilesPerAxis(this.mapSize, newLod));
        }
        this.updateTileVisibility(viewBox);
    };
    return TerrainLayer;
}(TileLayer));
var HeroMap = (function () {
    function HeroMap(viewport) {
        this._continent = undefined;
        this.renderer = new MapRenderer(viewport, 0);
    }
    HeroMap.prototype.continent = function () { return this._continent; };
    HeroMap.prototype.updateBaseOwnership = function (baseOwnershipMap) {
        var _this = this;
        var data = GameData.getInstance();
        var continentMap = new Map();
        baseOwnershipMap.forEach(function (owner, baseId) {
            var _a;
            var base = data.getBase(baseId);
            if (base && base.continent_id === ((_a = _this._continent) === null || _a === void 0 ? void 0 : _a.id))
                continentMap.set(baseId, owner);
        });
        function supportsBaseOwnership(object) {
            return "updateBaseOwnership" in object;
        }
        this.renderer.forEachLayer(function (layer) {
            if (supportsBaseOwnership(layer))
                layer.updateBaseOwnership(continentMap);
        });
    };
    HeroMap.prototype.switchContinent = function (continent) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var terrain, hexes, lattice, names;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (continent.code === ((_a = this._continent) === null || _a === void 0 ? void 0 : _a.code))
                            return [2];
                        terrain = TerrainLayer.factory(continent, "terrain");
                        hexes = BasePolygonsLayer.factory(continent, "hexes");
                        lattice = LatticeLayer.factory(continent, "lattice");
                        names = BaseNamesLayer.factory(continent, "names");
                        return [4, Promise.all([terrain, hexes, lattice, names]).then(function (layers) {
                                _this.renderer.clearLayers();
                                _this.renderer.setMapSize(continent.map_size);
                                _this.jumpTo({ x: continent.map_size / 2, y: continent.map_size / 2 });
                                layers.forEach(function (layer) {
                                    _this.renderer.addLayer(layer);
                                    layer.updateLayer();
                                });
                                _this._continent = continent;
                            })];
                    case 1:
                        _b.sent();
                        return [2];
                }
            });
        });
    };
    HeroMap.prototype.jumpTo = function (point) {
        var _a;
        (_a = this.renderer) === null || _a === void 0 ? void 0 : _a.jumpTo(point);
    };
    return HeroMap;
}());
var Minimap = (function () {
    function Minimap(element) {
        this._mapSize = 0;
        this._baseOutlineSvg = undefined;
        this._minimapHexAlpha = 0.5;
        this._polygons = new Map();
        this.element = element;
        this.element.classList.add("ps2map__minimap");
        this._cssSize = this.element.clientWidth;
        this.element.style.height = "".concat(this._cssSize, "px");
        this._viewBoxElement = document.createElement("div");
        this._viewBoxElement.classList.add("ps2map__minimap__viewbox");
        this.element.appendChild(this._viewBoxElement);
        this.element.addEventListener("mousedown", this._jumpToPosition.bind(this), {
            passive: true
        });
    }
    Minimap.prototype.updateViewbox = function (viewBox) {
        var mapSize = this._mapSize;
        var relViewBox = {
            top: (viewBox.top + mapSize * 0.5) / mapSize,
            left: (viewBox.left + mapSize * 0.5) / mapSize,
            bottom: (viewBox.bottom + mapSize * 0.5) / mapSize,
            right: (viewBox.right + mapSize * 0.5) / mapSize
        };
        var relHeight = relViewBox.top - relViewBox.bottom;
        var relWidth = relViewBox.right - relViewBox.left;
        var relLeft = relViewBox.left - 0.5;
        var relTop = relViewBox.bottom - 0.5;
        this._viewBoxElement.style.height = "".concat(this._cssSize * relHeight, "px");
        this._viewBoxElement.style.width = "".concat(this._cssSize * relWidth, "px");
        this._viewBoxElement.style.left = "".concat(this._cssSize * relLeft, "px");
        this._viewBoxElement.style.bottom = "".concat(this._cssSize * relTop, "px");
    };
    Minimap.prototype.updateBaseOwnership = function (baseOwnershipMap) {
        var _this = this;
        var colours = {
            0: "rgba(0, 0, 0, ".concat(this._minimapHexAlpha, ")"),
            1: "rgba(160, 77, 183, ".concat(this._minimapHexAlpha, ")"),
            2: "rgba(81, 123, 204, ".concat(this._minimapHexAlpha, ")"),
            3: "rgba(226, 25, 25, ".concat(this._minimapHexAlpha, ")"),
            4: "rgba(255, 255, 255, ".concat(this._minimapHexAlpha, ")")
        };
        baseOwnershipMap.forEach(function (factionId, baseId) {
            var polygon = _this._polygons.get(baseId);
            if (polygon)
                polygon.style.fill = colours[factionId];
        });
    };
    Minimap.prototype.switchContinent = function (continent) {
        return __awaiter(this, void 0, void 0, function () {
            var svg, polygons, i, poly;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, fetchContinentOutlines(continent.code)];
                    case 1:
                        svg = _a.sent();
                        this._mapSize = continent.map_size;
                        this.element.style.backgroundImage =
                            "url(".concat(UrlGen.mapBackground(continent.code), ")");
                        if (this._baseOutlineSvg)
                            this.element.removeChild(this._baseOutlineSvg);
                        this._polygons = new Map();
                        svg.classList.add("ps2map__minimap__hexes");
                        this._baseOutlineSvg = svg;
                        this.element.appendChild(this._baseOutlineSvg);
                        polygons = svg.querySelectorAll("polygon");
                        i = polygons.length;
                        while (i-- > 0) {
                            poly = polygons[i];
                            this._polygons.set(parseInt(poly.id), poly);
                            poly.id = this._polygonIdFromBaseId(poly.id);
                        }
                        return [2];
                }
            });
        });
    };
    Minimap.prototype._buildMinimapJumpEvent = function (target) {
        return new CustomEvent("ps2map_minimapjump", {
            detail: {
                target: target
            },
            bubbles: true,
            cancelable: true
        });
    };
    Minimap.prototype._jumpToPosition = function (evtDown) {
        var _this = this;
        if (this._mapSize === 0)
            return;
        var drag = Utils.rafDebounce(function (evtDrag) {
            var rect = _this.element.getBoundingClientRect();
            var relX = (evtDrag.clientX - rect.left) / (rect.width);
            var relY = (evtDrag.clientY - rect.top) / (rect.height);
            var target = {
                x: Math.round(relX * _this._mapSize),
                y: Math.round((1 - relY) * _this._mapSize)
            };
            _this.element.dispatchEvent(_this._buildMinimapJumpEvent(target));
        });
        var up = function () {
            _this.element.removeEventListener("mousemove", drag);
            document.removeEventListener("mouseup", up);
        };
        document.addEventListener("mouseup", up);
        this.element.addEventListener("mousemove", drag, {
            passive: true
        });
        drag(evtDown);
    };
    Minimap.prototype._polygonIdFromBaseId = function (baseId) {
        return "minimap-baseId-".concat(baseId);
    };
    return Minimap;
}());
var MapListener = (function () {
    function MapListener(server) {
        if (server === void 0) { server = undefined; }
        this._server = server;
        this._subscribers = [];
        this._baseUpdateIntervalId = undefined;
    }
    MapListener.prototype.subscribe = function (callback) {
        this._subscribers.push(callback);
    };
    MapListener.prototype.unsubscribe = function (callback) {
        this._subscribers = this._subscribers.filter(function (subscriber) { return subscriber !== callback; });
    };
    MapListener.prototype.notify = function (event, data) {
        this._subscribers.forEach(function (subscriber) { return subscriber(event, data); });
    };
    MapListener.prototype.clear = function () {
        this._subscribers = [];
    };
    MapListener.prototype.switchServer = function (server) {
        this._server = server;
        this._startMapStatePolling();
    };
    MapListener.prototype._pollBaseOwnership = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!this._server)
                    return [2];
                fetchContinents().then(function (continents) {
                    var status = [];
                    continents.forEach(function (continent) {
                        status.push(fetchBaseStatus(continent.id, _this._server.id));
                    });
                    var baseOwnership = new Map();
                    Promise.all(status).then(function (results) {
                        results.forEach(function (status) {
                            status.forEach(function (base) {
                                baseOwnership.set(base.base_id, base.owning_faction_id);
                            });
                        });
                    }).then(function () {
                        _this.notify("baseCaptured", baseOwnership);
                    });
                });
                return [2];
            });
        });
    };
    MapListener.prototype._startMapStatePolling = function () {
        var _this = this;
        if (this._baseUpdateIntervalId)
            clearInterval(this._baseUpdateIntervalId);
        this._pollBaseOwnership();
        this._baseUpdateIntervalId = setInterval(function () {
            _this._pollBaseOwnership();
        }, 5000);
    };
    return MapListener;
}());
var Tool = (function () {
    function Tool(viewport, map, tool_panel) {
        this._map = map;
        this._viewport = viewport;
        this._tool_panel = tool_panel;
        this._setUpToolPanel();
    }
    Tool.prototype.tearDown = function () {
        this._tool_panel.innerHTML = "";
        this._tool_panel.removeAttribute("style");
    };
    Tool.prototype._getMapPosition = function (event) {
        var relX = (event.clientX - this._viewport.offsetLeft) / this._viewport.clientWidth;
        var relY = 1 - (event.clientY - this._viewport.offsetTop) / this._viewport.clientHeight;
        var viewBox = this._map.renderer.getViewBox();
        var halfSize = this._map.renderer.getMapSize() * 0.5;
        return {
            x: -halfSize + viewBox.left + (viewBox.right - viewBox.left) * relX,
            y: -halfSize + viewBox.bottom + (viewBox.top - viewBox.bottom) * relY
        };
    };
    Tool.prototype._setUpToolPanel = function () { };
    Tool.id = "none";
    Tool.displayName = "None";
    Tool.defaultState = {};
    return Tool;
}());
var Cursor = (function (_super) {
    __extends(Cursor, _super);
    function Cursor(viewport, map, tool_panel) {
        var _this = _super.call(this, viewport, map, tool_panel) || this;
        _this._onMove = _this._onMove.bind(_this);
        _this._viewport.addEventListener("mousemove", _this._onMove, { passive: true });
        return _this;
    }
    Cursor.prototype.tearDown = function () {
        _super.prototype.tearDown.call(this);
        this._viewport.removeEventListener("mousemove", this._onMove);
    };
    Cursor.prototype._setUpToolPanel = function () {
        _super.prototype._setUpToolPanel.call(this);
        var x = Object.assign(document.createElement("span"), {
            id: "tool-cursor_x",
            textContent: "0.00"
        });
        var y = Object.assign(document.createElement("span"), {
            id: "tool-cursor_y",
            textContent: "0.00"
        });
        var frag = document.createDocumentFragment();
        frag.appendChild(document.createTextNode("X:"));
        frag.appendChild(x);
        frag.appendChild(document.createTextNode(" Y:"));
        frag.appendChild(y);
        this._tool_panel.appendChild(frag);
        Object.assign(this._tool_panel.style, {
            display: "grid",
            gridTemplateColumns: "1fr 3fr",
            minWidth: "120px",
            fontFamily: "Consolas, monospace",
            fontSize: "18px",
            justifyItems: "right"
        });
    };
    Cursor.prototype._updateToolPanel = function (target) {
        var x = document.getElementById("tool-cursor_x");
        if (x)
            x.textContent = target.x.toFixed(2);
        var y = document.getElementById("tool-cursor_y");
        if (y)
            y.textContent = target.y.toFixed(2);
    };
    Cursor.prototype._onMove = function (event) {
        this._updateToolPanel(this._getMapPosition(event));
    };
    Cursor.id = "cursor";
    Cursor.displayName = "Map Cursor";
    return Cursor;
}(Tool));
var BaseInfo = (function (_super) {
    __extends(BaseInfo, _super);
    function BaseInfo(viewport, map, tool_panel) {
        var _this = _super.call(this, viewport, map, tool_panel) || this;
        _this._onHover = _this._onHover.bind(_this);
        StateManager.subscribe(State.user.baseHovered, _this._onHover);
        return _this;
    }
    BaseInfo.prototype.tearDown = function () {
        _super.prototype.tearDown.call(this);
        StateManager.unsubscribe(State.user.baseHovered, this._onHover);
    };
    BaseInfo.prototype._setUpToolPanel = function () {
        _super.prototype._setUpToolPanel.call(this);
        var frag = document.createDocumentFragment();
        frag.appendChild(Object.assign(document.createElement("span"), {
            id: "tool-base-name",
            classList: "ps2map__tool__base-info__name"
        }));
        frag.appendChild(Object.assign(document.createElement("img"), {
            id: "tool-base-icon",
            classList: "ps2map__tool__base-info__type-icon"
        }));
        frag.appendChild(Object.assign(document.createElement("span"), {
            id: "tool-base-type",
            classList: "ps2map__tool__base-info__type"
        }));
        frag.appendChild(document.createElement("br"));
        frag.appendChild(Object.assign(document.createElement("img"), {
            id: "tool-base-resource-icon",
            classList: "ps2map__tool__base-info__resource-icon"
        }));
        frag.appendChild(Object.assign(document.createElement("span"), {
            id: "tool-base-resource-name",
            classList: "ps2map__tool__base-info__resource-text"
        }));
        this._tool_panel.appendChild(frag);
    };
    BaseInfo.prototype._updateBaseInfo = function (base) {
        if (!base) {
            this._tool_panel.removeAttribute("style");
            return;
        }
        this._tool_panel.style.display = "block";
        var name = document.getElementById("tool-base-name");
        var typeIcon = document.getElementById("tool-base-icon");
        var type = document.getElementById("tool-base-type");
        var resourceIcon = document.getElementById("tool-base-resource-icon");
        var resourceText = document.getElementById("tool-base-resource-name");
        name.textContent = base.name;
        type.textContent = base.type_name;
        typeIcon.src = "img/icons/".concat(base.type_code, ".svg");
        if (base.resource_code) {
            resourceIcon.src = "img/icons/".concat(base.resource_code, ".png");
            resourceText.textContent = "".concat(base.resource_capture_amount, " ").concat(base.resource_name, " (").concat(base.resource_control_amount.toFixed(1), "/min)");
        }
    };
    BaseInfo.prototype._onHover = function (state) {
        this._updateBaseInfo(state.user.hoveredBase);
    };
    BaseInfo.id = "base-info";
    BaseInfo.displayName = "Base Info";
    return BaseInfo;
}(Tool));
var available_tools = [Tool, Cursor, BaseInfo];
document.addEventListener("DOMContentLoaded", function () {
    var toolbar_container = document.getElementById("toolbar-container");
    toolbar_container.innerHTML = "";
    available_tools.forEach(function (tool) {
        var btn = document.createElement("input");
        btn.type = "button";
        btn.value = tool.displayName;
        btn.classList.add("toolbar__button");
        btn.id = "tool-".concat(tool.id);
        btn.addEventListener("click", function () {
            StateManager.dispatch(State.toolbox.setTool, { type: tool });
        });
        toolbar_container.appendChild(btn);
    });
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape")
            StateManager.dispatch(State.toolbox.setTool, { type: Tool });
    });
    StateManager.dispatch(State.toolbox.setTool, { type: Tool });
});
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var State;
(function (State) {
    var map;
    (function (map) {
        map.baseCaptured = "map/baseCaptured";
    })(map = State.map || (State.map = {}));
    State.defaultMapState = {
        baseOwnership: new Map()
    };
    function mapReducer(state, action, data) {
        switch (action) {
            case State.map.baseCaptured:
                return __assign(__assign({}, state), { baseOwnership: data });
            default:
                return state;
        }
    }
    State.mapReducer = mapReducer;
})(State || (State = {}));
var State;
(function (State) {
    var toolbox;
    (function (toolbox) {
        toolbox.setup = "toolbox/setup";
        toolbox.setTool = "toolbox/setTool";
    })(toolbox = State.toolbox || (State.toolbox = {}));
    State.defaultToolState = {
        currentTool: null,
        targetMap: null,
        data: {}
    };
    function toolboxReducer(state, action, data) {
        switch (action) {
            case toolbox.setup:
                return __assign(__assign(__assign({}, state), State.defaultToolState), { targetMap: data.map });
            case toolbox.setTool:
                if (state.currentTool)
                    state.currentTool.tearDown();
                var cls_1 = data.type;
                if (!cls_1)
                    cls_1 = Tool;
                var tool = null;
                var toolBar = document.getElementById("tool-panel");
                if (toolBar && state.targetMap)
                    tool = new cls_1(state.targetMap.renderer.viewport, state.targetMap, toolBar);
                document.querySelectorAll(".toolbar__button").forEach(function (btn) {
                    if (btn.id === "tool-".concat(cls_1.id))
                        btn.classList.add("toolbar__button__active");
                    else
                        btn.classList.remove("toolbar__button__active");
                });
                return __assign(__assign({}, state), { currentTool: tool });
            default:
                return state;
        }
    }
    State.toolboxReducer = toolboxReducer;
})(State || (State = {}));
var State;
(function (State) {
    var user;
    (function (user) {
        user.continentChanged = "user/continentChanged";
        user.serverChanged = "user/serverChanged";
        user.baseHovered = "user/baseHovered";
    })(user = State.user || (State.user = {}));
    ;
    State.defaultUserState = {
        server: undefined,
        continent: undefined,
        hoveredBase: null
    };
    function userReducer(state, action, data) {
        switch (action) {
            case "user/serverChanged":
                return __assign(__assign({}, state), { server: data });
            case user.continentChanged:
                return __assign(__assign({}, state), { continent: data });
            case "user/baseHovered":
                return __assign(__assign({}, state), { hoveredBase: data });
            default:
                return state;
        }
    }
    State.userReducer = userReducer;
})(State || (State = {}));
var State;
(function (State) {
    function appReducer(state, action, data) {
        return {
            map: State.mapReducer(state.map, action, data),
            tool: State.toolboxReducer(state.tool, action, data),
            user: State.userReducer(state.user, action, data)
        };
    }
    State.appReducer = appReducer;
})(State || (State = {}));
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
document.addEventListener("DOMContentLoaded", function () {
    var heroMap = new HeroMap(document.getElementById("hero-map"));
    var minimap = new Minimap(document.getElementById("minimap"));
    var listener = new MapListener();
    listener.subscribe(function (name, data) {
        StateManager.dispatch("map/".concat(name), data);
    });
    StateManager.subscribe(State.map.baseCaptured, function (state) {
        heroMap.updateBaseOwnership(state.map.baseOwnership);
        minimap.updateBaseOwnership(state.map.baseOwnership);
    });
    StateManager.subscribe(State.user.continentChanged, function (state) {
        heroMap.switchContinent(state.user.continent).then(function () {
            heroMap.updateBaseOwnership(state.map.baseOwnership);
        });
        minimap.switchContinent(state.user.continent).then(function () {
            minimap.updateBaseOwnership(state.map.baseOwnership);
        });
    });
    StateManager.subscribe(State.user.serverChanged, function (state) {
        listener.switchServer(state.user.server);
    });
    StateManager.subscribe(State.user.baseHovered, function (state) {
        var names = heroMap.renderer.getLayer("names");
        names.setHoveredBase(state.user.hoveredBase);
    });
    StateManager.dispatch(State.toolbox.setup, { map: heroMap });
    heroMap.renderer.viewport.addEventListener("ps2map_basehover", function (event) {
        var evt = event.detail;
        var base = GameData.getInstance().getBase(evt.baseId);
        if (base)
            StateManager.dispatch(State.user.baseHovered, base);
    });
    document.addEventListener("ps2map_viewboxchanged", function (event) {
        var evt = event.detail;
        minimap.updateViewbox(evt.viewBox);
    }, { passive: true });
    document.addEventListener("ps2map_minimapjump", function (event) {
        var evt = event.detail;
        heroMap.jumpTo(evt.target);
    }, { passive: true });
    var server_picker = document.getElementById("server-picker");
    server_picker.addEventListener("change", function () {
        var server = GameData.getInstance().servers()
            .find(function (s) { return s.id === parseInt(server_picker.value); });
        if (!server)
            throw new Error("No server found with id ".concat(server_picker.value));
        StateManager.dispatch(State.user.serverChanged, server);
    });
    var continent_picker = document.getElementById("continent-picker");
    continent_picker.addEventListener("change", function () {
        var continent = GameData.getInstance().continents()
            .find(function (c) { return c.id === parseInt(continent_picker.value); });
        if (!continent)
            throw new Error("No continent found with id ".concat(continent_picker.value));
        StateManager.dispatch(State.user.continentChanged, continent);
    });
    GameData.load().then(function (gameData) {
        var servers = __spreadArray([], gameData.servers(), true);
        var continents = __spreadArray([], gameData.continents(), true);
        servers.sort(function (a, b) { return b.name.localeCompare(a.name); });
        var i = servers.length;
        while (i-- > 0) {
            var server = servers[i];
            var option = document.createElement("option");
            option.value = server.id.toString();
            option.text = server.name;
            server_picker.appendChild(option);
        }
        continents.sort(function (a, b) { return b.name.localeCompare(a.name); });
        i = continents.length;
        while (i-- > 0) {
            var cont = continents[i];
            var option = document.createElement("option");
            option.value = cont.id.toString();
            option.text = cont.name;
            continent_picker.appendChild(option);
        }
        StateManager.dispatch(State.user.serverChanged, servers[servers.length - 1]);
        StateManager.dispatch(State.user.continentChanged, continents[continents.length - 1]);
    });
});
var StateManager = (function () {
    function StateManager() {
    }
    StateManager.dispatch = function (action, data) {
        var _this = this;
        var newState = this._update(action, data);
        if (newState === this._state) {
            console.warn("StateManager: dispatch: no change for action \"".concat(action, "\""));
            return;
        }
        this._state = newState;
        var subscriptions = this._subscriptions.get(action);
        if (subscriptions)
            subscriptions.forEach(function (callback) { return callback(_this._state); });
    };
    StateManager.subscribe = function (action, callback) {
        var subscriptions = this._subscriptions.get(action);
        if (!subscriptions)
            this._subscriptions.set(action, subscriptions = []);
        subscriptions.push(callback);
    };
    StateManager.unsubscribe = function (action, callback) {
        var subscriptions = this._subscriptions.get(action);
        if (!subscriptions)
            return;
        var index = subscriptions.indexOf(callback);
        if (index < 0)
            return;
        subscriptions.splice(index, 1);
    };
    StateManager.getState = function () {
        return this._state;
    };
    StateManager._update = function (action, data) {
        return State.appReducer(this._state, action, data);
    };
    StateManager._state = {
        map: State.defaultMapState,
        tool: State.defaultToolState,
        user: State.defaultUserState
    };
    StateManager._subscriptions = new Map();
    return StateManager;
}());
//# sourceMappingURL=index.js.map