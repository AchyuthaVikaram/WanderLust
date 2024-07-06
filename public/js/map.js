mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    center: listing.geometry.coordinates, // [longitude,latitude]
    zoom: 9,
});

const marker = new mapboxgl.Marker({ color: "red" })
    .setLngLat(listing.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // Create a new Popup instance
            .setHTML(`<h4>${listing.location}, ${listing.country}</h4><p>Exact location provided after booking</p>`)
    )
    .addTo(map);
