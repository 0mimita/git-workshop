const userLatitude = localStorage.getItem("latitude");
const userLongitude = localStorage.getItem("longitude");

async function getRestaurants() {

    try {

        const response = await fetch(
            `https://smapi.lnu.se/api/?api_key=3bdTk4Bn&controller=food&method=getfromlatlng&lat=${userLatitude}&lng=${userLongitude}&radius=5`
        );

        const data = await response.json();

        console.log(data);

        const container = document.getElementById("restaurants-container");

        data.payload.forEach((restaurant) => {
            const card = document.createElement("div");
            card.classList.add("restaurant-card")
            card.innerHTML = ` <h2>${restaurant.name}</h2>
            <p>
            ${restaurant.distance_in_km.toFixed(1)} km • 
            ${restaurant.avg_lunch_pricing} kr
            </p>
            <p>
             ${restaurant.rating} 
            (${restaurant.num_reviews} omdömen)
            </p>
            `;
            container.appendChild(card);
        });

    } catch(error) {

        console.log(error);

    }

}

getRestaurants();