"use strict";
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
            if (isScheduled)
                cancelAnimationFrame(handle);
            var args = arguments;
            handle = requestAnimationFrame(function () {
                target.apply(wrapper, args);
                isScheduled = false;
            });
            isScheduled = true;
        }
        return wrapper;
    }
    Utils.rafDebounce = rafDebounce;
    function remap(value, sourceLower, sourceUpper, targetLower, targetUpper) {
        var sourceSpan = sourceUpper - sourceLower;
        var targetSpan = targetUpper - targetLower;
        if (sourceSpan == 0)
            return targetLower;
        var relValue = value - sourceLower / sourceSpan;
        return targetLower + relValue * targetSpan;
    }
    Utils.remap = remap;
    function roundTo(value, decimals) {
        var factor = Math.pow(10, decimals);
        return Math.round(value * factor) / factor;
    }
    Utils.roundTo = roundTo;
})(Utils || (Utils = {}));
var MapCamera = (function () {
    function MapCamera(mapSize, viewportHeight, viewportWidth) {
        this.maxZoom = 10.0;
        this.zoomStep = 1.5;
        this.zoomIndex = -1;
        this.viewHeight = viewportHeight;
        this.viewWidth = viewportWidth;
        var zoom = this.maxZoom;
        this.zoom = [this.maxZoom];
        var stepInverse = 1 / this.zoomStep;
        while (mapSize * zoom > Math.min(viewportHeight, viewportWidth)) {
            zoom *= stepInverse;
            this.zoom.push(Utils.roundTo(zoom, 2));
        }
        this.zoomIndex = this.zoom.length - 1;
        this.target = {
            x: mapSize * 0.5,
            y: mapSize * 0.5
        };
    }
    MapCamera.prototype.bumpZoomLevel = function (direction) {
        var index = this.zoomIndex;
        if (direction == 0)
            return index;
        if (direction < 0)
            index--;
        else if (direction > 0)
            index++;
        if (index < 0)
            index = 0;
        else if (index >= this.zoom.length)
            index = this.zoom.length - 1;
        this.zoomIndex = index;
        return this.zoom[index];
    };
    MapCamera.prototype.getZoom = function () {
        return this.zoom[this.zoomIndex];
    };
    MapCamera.prototype.zoomTo = function (direction, viewX, viewY) {
        if (viewX === void 0) { viewX = 0.5; }
        if (viewY === void 0) { viewY = 0.5; }
        var oldZoom = this.getZoom();
        var newZoom = this.bumpZoomLevel(direction);
        var pixelDeltaX = (this.viewWidth / oldZoom) - (this.viewWidth / newZoom);
        var pixelDeltaY = (this.viewHeight / oldZoom) - (this.viewHeight / newZoom);
        var sideRatioX = Utils.remap(viewX, 0.0, 1.0, -0.5, 0.5);
        var sideRatioY = -Utils.remap(viewY, 0.0, 1.0, -0.5, 0.5);
        var targetX = this.target.x + pixelDeltaX * sideRatioX;
        var targetY = this.target.y + pixelDeltaY * sideRatioY;
        this.target = {
            x: targetX,
            y: targetY
        };
        return this.target;
    };
    MapCamera.prototype.viewboxFromTarget = function (target) {
        var viewboxWidth = this.viewWidth / this.getZoom();
        var viewboxHeight = this.viewHeight / this.getZoom();
        return {
            top: target.y + viewboxHeight * 0.5,
            right: target.x + viewboxWidth * 0.5,
            bottom: target.y - viewboxHeight * 0.5,
            left: target.x - viewboxWidth * 0.5
        };
    };
    return MapCamera;
}());
var MapLayer = (function () {
    function MapLayer(id, mapSize) {
        this.isVisible = true;
        this.id = id;
        this.mapSize = mapSize;
        this.element = document.createElement("div");
        this.element.id = "id";
        this.element.classList.add("ps2map__layer");
        this.element.style.height = this.element.style.width = mapSize + "px";
    }
    MapLayer.prototype.setVisibility = function (visible) {
        if (this.isVisible == visible)
            return;
        if (visible)
            this.element.style.removeProperty("display");
        else
            this.element.style.display = "none";
        this.isVisible = visible;
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
    function StaticLayer(name, mapSize) {
        return _super.call(this, name, mapSize) || this;
    }
    StaticLayer.prototype.addChild = function (element) {
        this.element.appendChild(element);
    };
    StaticLayer.prototype.removeChild = function (element) {
        this.element.removeChild(element);
    };
    StaticLayer.prototype.clearChildren = function () {
        this.element.innerHTML = "";
    };
    StaticLayer.prototype.redraw = function (viewbox, zoom) {
        var targetX = (viewbox.right + viewbox.left) * 0.5;
        var targetY = (viewbox.top + viewbox.bottom) * 0.5;
        var halfMapSize = this.mapSize * 0.5;
        var offsetX = -halfMapSize;
        var offsetY = -halfMapSize;
        offsetX += (halfMapSize - targetX) * zoom;
        offsetY -= (halfMapSize - targetY) * zoom;
        this.element.style.transform = ("matrix(" + zoom + ", 0.0, 0.0, " + zoom + ", " + offsetX + ", " + offsetY + ")");
    };
    return StaticLayer;
}(MapLayer));
var MapRenderer = (function () {
    function MapRenderer(viewport, mapSize) {
        var _this = this;
        this.mapSize = 1024;
        this.layers = new Map();
        this.isPanning = false;
        this.viewboxCallbacks = [];
        this.onZoom = Utils.rafDebounce(function (evt) {
            evt.preventDefault();
            if (_this.isPanning)
                return;
            var view = _this.viewport.getBoundingClientRect();
            var relX = Utils.clamp((evt.clientX - view.left) / view.width, 0.0, 1.0);
            var relY = Utils.clamp((evt.clientY - view.top) / view.height, 0.0, 1.0);
            var newTarget = _this.camera.zoomTo(evt.deltaY, relX, relY);
            var newViewbox = _this.camera.viewboxFromTarget(newTarget);
            _this.redraw(newViewbox, _this.camera.getZoom());
        });
        this.viewport = viewport;
        this.viewport.classList.add("ps2map__viewport");
        this.anchor = document.createElement("div");
        this.anchor.classList.add("ps2map__anchor");
        this.viewport.appendChild(this.anchor);
        this.setMapSize(mapSize);
        this.camera = new MapCamera(mapSize, this.viewport.clientHeight, this.viewport.clientWidth);
        this.panOffsetX = this.viewport.clientWidth * 0.5;
        this.panOffsetY = this.viewport.clientHeight * 0.5;
        this.anchor.style.left = this.panOffsetX + "px";
        this.anchor.style.top = this.panOffsetY + "px";
        this.viewport.addEventListener("wheel", this.onZoom.bind(this), {
            passive: false
        });
        this.viewport.addEventListener("mousedown", this.mousePan.bind(this), {
            passive: true
        });
    }
    MapRenderer.prototype.addLayer = function (layer) {
        if (layer.mapSize != this.mapSize)
            throw "Map layer size must match the map renderer's.";
        this.layers.set(layer.id, layer);
        this.anchor.appendChild(layer.element);
        this.redraw(this.camera.viewboxFromTarget(this.camera.target), this.camera.getZoom());
    };
    MapRenderer.prototype.getMapSize = function () {
        return this.mapSize;
    };
    MapRenderer.prototype.setMapSize = function (value) {
        if (this.layers.size > 0)
            throw "Remove all map layers before changing map size.";
        this.mapSize = value;
        this.camera = new MapCamera(value, this.viewport.clientHeight, this.viewport.clientWidth);
    };
    MapRenderer.prototype.mousePan = function (evtDown) {
        var _this = this;
        this.isPanning = true;
        var refX = this.camera.target.x;
        var refY = this.camera.target.y;
        var zoom = this.camera.getZoom();
        var startX = evtDown.clientX;
        var startY = evtDown.clientY;
        var drag = Utils.rafDebounce(function (evtDrag) {
            var deltaX = evtDrag.clientX - startX;
            var deltaY = evtDrag.clientY - startY;
            _this.camera.target = {
                x: refX - deltaX / zoom,
                y: refY + deltaY / zoom
            };
            _this.redraw(_this.camera.getViewbox(), zoom);
        });
        var up = function () {
            _this.isPanning = false;
            _this.viewport.removeEventListener("mousemove", drag);
            document.removeEventListener("mouseup", up);
        };
        document.addEventListener("mouseup", up);
        this.viewport.addEventListener("mousemove", drag, {
            passive: true
        });
    };
    MapRenderer.prototype.redraw = function (viewbox, zoom) {
        this.layers.forEach(function (layer) {
            layer.redraw(viewbox, zoom);
        });
        var i = this.viewboxCallbacks.length;
        while (i-- > 0)
            this.viewboxCallbacks[i](viewbox);
    };
    return MapRenderer;
}());
var Api;
(function (Api) {
    var restEndpoint = "http://127.0.0.1:5000/";
    function getBasesFromContinent(continentId) {
        var rounded = Math.round(continentId);
        var url = restEndpoint + "bases/info?continent_id=" + rounded;
        return fetch(url).then(function (value) {
            return value.json();
        });
    }
    Api.getBasesFromContinent = getBasesFromContinent;
    function getContinent(continentId) {
        var url = restEndpoint + "continents/info";
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
            throw "unknown continent ID: " + continentId;
        });
    }
    Api.getContinent = getContinent;
})(Api || (Api = {}));
var Minimap = (function () {
    function Minimap(element, mapSize, background) {
        this.mapSize = mapSize;
        this.element = element;
        this.cssSize = this.element.clientWidth;
        this.element.style.height = this.cssSize + "px";
        this.viewboxElement = document.createElement("div");
        this.element.appendChild(this.viewboxElement);
        this.element.style.backgroundImage = "url(" + background + ")";
        this.element.style.backgroundSize = "100%";
    }
    Minimap.prototype.configureMinimap = function (mapSize, background) {
        this.mapSize = mapSize;
        this.element.style.backgroundImage = "url(" + background + ")";
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
        this.viewboxElement.style.height = this.cssSize * relHeight + "px";
        this.viewboxElement.style.width = this.cssSize * relWidth + "px";
        this.viewboxElement.style.left = this.cssSize * relLeft + "px";
        this.viewboxElement.style.bottom = this.cssSize * relTop + "px";
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
        this.minimap = new Minimap(minimapElement, mapSize, "../ps2-map-api/map_assets/Indar_LOD3.png");
        this.controller.viewboxCallbacks.push(this.minimap.setViewbox.bind(this.minimap));
        var hexLayer = new StaticLayer("hexes", mapSize);
        hexLayer.element.classList.add("ps2map__base-hexes");
        Api.getContinent(this.continentId)
            .then(function (continent) {
            return fetch(endpoint + "/static/hex/" + continent.code + ".svg");
        })
            .then(function (data) {
            return data.text();
        })
            .then(function (payload) {
            var factory = document.createElement("template");
            factory.innerHTML = payload.trim();
            var svg = factory.content.firstElementChild;
            if (svg == null) {
                throw "Unable to load map hexes";
            }
            svg.classList.add("ps2map__base-hexes__hex");
            svg.querySelectorAll("polygon").forEach(function (polygon) {
                var promoteElement = function () {
                    svg.appendChild(polygon);
                    var removeHover = function () {
                        polygon.removeAttribute("style");
                    };
                    polygon.addEventListener("mouseleave", removeHover, {
                        passive: true
                    });
                    polygon.addEventListener("touchend", removeHover, {
                        passive: true
                    });
                    polygon.addEventListener("touchcancel", removeHover, {
                        passive: true
                    });
                    polygon.style.stroke = "#ffffff";
                };
                polygon.addEventListener("mouseenter", promoteElement, {
                    passive: true
                });
                polygon.addEventListener("touchstart", promoteElement, {
                    passive: true
                });
            });
            hexLayer.addChild(svg);
        });
        this.controller.addLayer(hexLayer);
    }
    return HeroMap;
}());
document.addEventListener("DOMContentLoaded", function () {
    var apiEndpoint = "http://127.0.0.1:5000";
    var continentId = 2;
    var viewport = document.getElementById("hero-map");
    if (viewport == null) {
        throw "Unable to locate viewport element";
    }
    if (viewport.tagName != "DIV") {
        throw "Expected viewport of type \"DIV\" (got " + viewport.tagName + ")";
    }
    new HeroMap(viewport, continentId, apiEndpoint);
});
