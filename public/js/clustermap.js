mapboxgl.accessToken = mapboxtoken;
var garages = { features: JSON.parse(garage_raw) };
const map = new mapboxgl.Map({
    container: 'cluster-map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [77.23149, 28.65195],
    zoom: 3,
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

map.on('load', function () {
    // Add a new source from our GeoJSON data and set the
    // 'cluster' option to true. GL-JS will add the point_count property to your source data.
    map.addSource('garages', {
        type: 'geojson',
        data: garages,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
    });

    // Add a cluster layer. This layer will cluster all point features in the source layer
    map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'garages',
        filter: ['has', 'point_count'],
        // cluster style configurations
        paint: {
            'circle-color': [
                'step',
                ['get', 'point_count'],
                '#00BCD4',
                10,
                '#2196F3',
                30,
                '#3F51B5',
            ],
            'circle-radius': [
                'step',
                ['get', 'point_count'],
                15,
                10,
                20,
                30,
                25,
            ],
        },
    });

    // Add a layer for the clusters' count labels
    map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'garages',
        filter: ['has', 'point_count'],
        layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12,
        },
    });

    // Add a layer for the unclustered point features.
    map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'garages',
        filter: ['!', ['has', 'point_count']],
        paint: {
            'circle-color': '#11b4da',
            'circle-radius': 4,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff',
        },
    });

    // inspect a cluster on click on clustered point
    map.on('click', 'clusters', function (e) {
        const features = map.queryRenderedFeatures(e.point, {
            layers: ['clusters'],
        });
        const clusterId = features[0].properties.cluster_id;
        map.getSource('garages').getClusterExpansionZoom(
            clusterId,
            function (err, zoom) {
                if (err) return;

                map.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom: zoom,
                });
            }
        );
    });

    // inspect a cluster on click on an unclustered point
    map.on('click', 'unclustered-point', function (e) {
        const { popUpMarkup } = e.features[0].properties;
        const coordinates = e.features[0].geometry.coordinates.slice();
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(popUpMarkup)
            .addTo(map);
    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'clusters', function () {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'clusters', function () {
        map.getCanvas().style.cursor = '';
    });
});
