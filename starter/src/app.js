/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import MarkerClusterer from '@google/markerclustererplus';

loadMapsJSAPI();

function clusterMarkers(map, markers) {
    const clustererOptions = { imagePath: './img/m' }
    const markerCluster = new MarkerClusterer(map, markers, clustererOptions);
}

function loadMapsJSAPI() {
    const googleMapsAPIKey = 'AIzaSyDJm7RM6jHwuOM17qn-6d3XWqTPbiIa3oA';
    const googleMapsAPIURI = `https://maps.googleapis.com/maps/api/js?key=${googleMapsAPIKey}&callback=runApp`;

    const script = document.createElement('script');
    script.src = googleMapsAPIURI;
    script.defer = true;
    script.async = true;

    window.runApp = runApp;

    document.head.appendChild(script);
}

function displayMap() {
    const mapOptions = {
        center: { lat: 57.779394661726094, lng: -100.56540878072823 },
        zoom: 6
    };

    const mapDiv = document.getElementById('map');

    const map = new google.maps.Map(mapDiv, mapOptions);

    return map;
}

function addMarkers(map) {
    const markers = [];
    const locations = {
        operaHouse: { lat: 58.002826448212474, lng: -98.80735184271073 },
        nearOperaHouse: { lat: 58.16889435334476, lng: -98.35858355895726 },
        southIndianLake: { lat: 56.87255327076977, lng: -98.94198232783675 },
        lynnLake: { lat: 56.8872655731571, lng: -101.00631643310264 },
        nearLynnLake: { lat: 56.803819264057225, lng: -100.89861204500181 }
    }

    for (const i in locations) {
        const markerOptions = {
            map: map,
            position: locations[i],
            icon: './img/custom_pin.png'
        }

        const marker = new google.maps.Marker(markerOptions);
        markers.push(marker);
    }

    return markers;
}

function drawCircle(map, location) {
    const circleOptions = {
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 1,
        map: map,
        center: location,
        radius: 300
    }

    const circle = new google.maps.Circle(circleOptions);

    return circle;
}

function addPanToMarker(map, markers) {
    let circle;

    markers.map(marker => {
        marker.addListener('click', event => {
            const location = { lat: event.latLng.lat(), lng: event.latLng.lng() };
            map.panTo(location);

            if (circle) {
                circle.setMap(null)
            }
            circle = drawCircle(map, location);
        });
    });
}

function runApp() {
    console.log('Maps JS API loaded');
    const map = displayMap();
    const markers = addMarkers(map);
    clusterMarkers(map, markers);
    addPanToMarker(map, markers);
}