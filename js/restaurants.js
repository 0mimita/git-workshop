const filters = JSON.parse(localStorage.getItem("filters"));
const userLatitude = localStorage.getItem("latitude");
const userLongitude = localStorage.getItem("longitude");

async function getRestaurants() {
    const subTypes = JSON.parse(localStorage.getItem("sub_types")) || [];
    const userLatitude = localStorage.getItem("latitude");
    const userLongitude = localStorage.getItem("longitude");

    let apiUrl = `https://smapi.lnu.se/api/?api_key=3bdTk4Bn&controller=food&method=getfromlatlng&lat=${userLatitude}&lng=${userLongitude}&radius=5`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        let restaurants = data.payload || [];

        if (subTypes.length > 0) {
            restaurants = restaurants.filter(r => subTypes.includes(r.sub_type));
        }

        const container = document.getElementById("restaurants-container");
        container.innerHTML = "";

        if (restaurants.length > 0) {
            restaurants.forEach((restaurant) => {
                const card = document.createElement("div");
                card.classList.add("restaurant-card");
                card.innerHTML = ` 
                    <h2>${restaurant.name}</h2>
                    <p>${restaurant.distance_in_km.toFixed(1)} km</p>
                `;
                container.appendChild(card);
            });
        } else {
            container.innerHTML = "<p>Inga restauranger matchar dina val.</p>";
        }
    } catch(error) {
        console.error("API-fel:", error);
    }
}