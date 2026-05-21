const locationButton = document.querySelector(".location-button");

locationButton.addEventListener("click", () => {
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

            console.log(error);

        },

        {
            enableHighAccuracy: true,
            maximumAge: 0
        }

    );
});