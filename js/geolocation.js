const locationButton = document.querySelector(".location-button");
const loader = document.getElementById("loader");

locationButton.addEventListener("click", () => {
    loader.style.display = "block";
    locationButton.disabled = true;

    navigator.geolocation.getCurrentPosition((position) => {

        localStorage.setItem(
            "latitude",
            position.coords.latitude
        );

        localStorage.setItem(
            "longitude",
            position.coords.longitude
        );
        
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
       
        window.location.href = "filter.html";
        

        },

        (error) => {
            loader.style.display = "none";
            locationButton.disabled = false;
            console.log(error);

        },

        {
            enableHighAccuracy: true,
            maximumAge: 0
        }

    );
});

window.addEventListener("pageshow", () => {
    loader.style.display = "none";
    locationButton.disabled = false;
});