const userLatitude = localStorage.getItem("latitude");
const userLongitude = localStorage.getItem("longitude");

async function getRestaurants() {

    try {

        const response = await fetch(
            `https://smapi.lnu.se/api/?api_key=3bdTk4Bn
            &controller=food&method=getfromlatlng&lat=${userLatitude}&lng=${userLongitude}&radius=5`
        );

        const data = await response.json();

        console.log(data);

    } catch(error) {

        console.log(error);

    }

}

getRestaurants();