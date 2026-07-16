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

    const subTypes = JSON.parse(localStorage.getItem("sub_types")) || [];
const priceRanges = JSON.parse(localStorage.getItem("price_ranges")) || [];

let restaurants = data.payload || [];

if (subTypes.length > 0) {
    restaurants = restaurants.filter(r => subTypes.includes(r.sub_type));
}

if (priceRanges.length > 0) {
    restaurants = restaurants.filter(r => {
        const price = parseInt(r.avg_lunch_pricing);

        if (isNaN(price)) return true;
        if (priceRanges.includes("$") && price < 100) return true;
        if (priceRanges.includes("$$") && price >= 100 && price <= 150) return true;
        if (priceRanges.includes("$$$") && price > 150) return true;

        return false;
    });
}

    restaurants.forEach((restaurant) => {

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