"use strict";
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
                if (cont.id == continentId) {
                    return cont;
                }
            }
            throw "unknown continent ID: " + continentId;
        });
    }
    Api.getContinent = getContinent;
})(Api || (Api = {}));
var MapLayer = (function () {
    function MapLayer(name, mapSize) {
        this.isVisible = true;
        this.layer = document.createElement("div");
        this.layer.classList.add("ps2map__layer");
        this.name = name;
        this.mapSize = mapSize;
        this.layer.style.width = this.layer.style.height = mapSize + " px";
    }
    MapLayer.prototype.getMapSize = function () {
        return this.mapSize;
    };
    MapLayer.prototype.setMapSize = function (value) {
        this.mapSize = value;
    };
    MapLayer.prototype.hide = function () {
        this.isVisible = false;
    };
    MapLayer.prototype.show = function () {
        this.isVisible = true;
    };
    return MapLayer;
}());
