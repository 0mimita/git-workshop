const latitude =
localStorage.getItem("latitude");

const longitude =
localStorage.getItem("longitude");

const map =
L.map('map').setView(
    [latitude, longitude],
    15
);

L.tileLayer(
    'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        maxZoom: 19,

        attribution:
        '&copy; OpenStreetMap'
    }

).addTo(map);

L.marker([latitude, longitude])

.addTo(map)

.bindPopup("Din position")

.openPopup();

async function showRestaurantsOnMap() {

    const response = await fetch(
        `https://smapi.lnu.se/api/?api_key=3bdTk4Bn&controller=food&method=getfromlatlng&lat=${latitude}&lng=${longitude}&radius=5`
    );

    const data = await response.json();

    data.payload.forEach((restaurant) => {

        L.marker([
            parseFloat(restaurant.lat),
            parseFloat(restaurant.lng)
        ])

        .addTo(map)

        .bindPopup(`
            <b>${restaurant.name}</b><br>
            ${restaurant.rating}
        `);

    });

}

showRestaurantsOnMap();