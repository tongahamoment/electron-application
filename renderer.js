// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
/* global mapboxgl */

mapboxgl.accessToken = 'pk.eyJ1IjoidXJhbW5lc2lhIiwiYSI6ImNpdnk0anFlbzAya2wyem8xNXgzc3YyNWsifQ.Uqbfco95fBZ4Afb289Hzbg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v9',
    center: [-103.59179687498357, 40.66995747013945],
    zoom: 3
});

map.on('load', function() {

    // Add a new source from our GeoJSON data and set the
    // 'cluster' option to true.
    map.addSource("rolendarGeoPoint", {
        type: "geojson",
        // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
        // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
        data: "https://rolendar.herokuapp.com/api/v1/geo/user/map/" + uid,
        cluster: true,
        clusterMaxZoom: 15, // Max zoom to cluster points on
        clusterRadius: 20 // Use small cluster radius for the heatmap look
    });

    // Use the earthquakes source to create four layers:
    // three for each cluster category, and one for unclustered points

    // Each point range gets a different fill color.
    var layers = [
        [0, '#CCC912'], //
        [2, '#D6BE0B'],  //
        [5, '#BF9500'],
        [10, '#D6940B'],
        [50, '#CC7C12'],
    ];

    layers.forEach(function (layer, i) {
        map.addLayer({
            "id": "cluster-" + i,
            "type": "circle",
            "source": "rolendarGeoPoint",
            "paint": {
                "circle-color": layer[1],
                "circle-radius": 70,
                "circle-blur": 1 // blur the circles to get a heatmap look
            },
            "filter": i === layers.length - 1 ?
                [">=", "point_count", layer[0]] :
                ["all",
                    [">=", "point_count", layer[0]],
                    ["<", "point_count", layers[i + 1][0]]]
        }, 'waterway-label');
    });

    map.addLayer({
        "id": "unclustered-points",
        "type": "circle",
        "source": "rolendarGeoPoint",
        "paint": {
            "circle-color": '#CCC912',
            "circle-radius": 20,
            "circle-blur": 1
        },
        "filter": ["!=", "cluster", true]
    }, 'waterway-label');
});
