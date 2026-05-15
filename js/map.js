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