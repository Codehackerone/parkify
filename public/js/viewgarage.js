var garage = JSON.parse(garage_raw);
mapboxgl.accessToken = mapboxtoken;

// Initialize the map
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: garage.geometry.coordinates,
    zoom: 9,
});

// Add garage marker to map
var marker = new mapboxgl.Marker()
    .setLngLat(garage.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h3>${garage.name}</h3><p>${garage.location}`
        )
    )
    .addTo(map);
