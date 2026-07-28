function getPriceLevel(price) {
    price = Number(price);
    if (price < 100) {
        return "$";
    } else if (price <= 150) {
        return "$$";
    } else {
        return "$$$";
    }
}

const selectedRestaurant =JSON.parse(
    localStorage.getItem("selectedRestaurant")
);

console.log(selectedRestaurant);

document.getElementById("restaurant-name").textContent = selectedRestaurant.name;

document.getElementById("restaurant-title").textContent = selectedRestaurant.description;

const walkTimeMinutes = Math.round(((selectedRestaurant.distance_in_km * 1.5) / 5) * 60)

document.getElementById("restaurant-info").textContent =
`${selectedRestaurant.distance_in_km.toFixed(1)} km (ca ${walkTimeMinutes} min promenad) • ${getPriceLevel(selectedRestaurant.avg_lunch_pricing)}`;

document.getElementById("restaurant-rating").textContent =
`${parseFloat(selectedRestaurant.rating)} (${selectedRestaurant.num_reviews} omdömen)`;

document.getElementById("restaurant-type").textContent =
selectedRestaurant.sub_type.replaceAll("_"," ");

document.getElementById("restaurant-tags").textContent =
selectedRestaurant.search_tags.replaceAll(",", " • ");

document.getElementById("restaurant-buffet").textContent =
selectedRestaurant.buffet_option === "Y"
? "Buffé finns"
: "Ingen buffé";

document.getElementById("restaurant-vegetarian").textContent =
selectedRestaurant.vegetarian_option === "Y"
? "Vegetariska alternativ finns"
: "Inga vegetariska alternativ";

const backBtn = document.getElementById("back-button");
backBtn.addEventListener("click", () => {
    window.history.back();
});

const navBtn = document.querySelector(".navigation-button");
if (navBtn) {
    navBtn.addEventListener("click", () => {
        const userLat = localStorage.getItem("latitude");
        const userLng = localStorage.getItem("longitude");
        const restLat = selectedRestaurant.latitude || selectedRestaurant.lat;
        const restLng = selectedRestaurant.longitude || selectedRestaurant.lng;

    if (userLat && userLng && restLat && restLng) {
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${restLat},${restLng}`;
        window.open(googleMapsUrl, "_blank");
    } else {
        const fallbackUrl = `https://www.google.com/maps/dir/?api=1&destination=${restLat},${restLng}`;
        window.open(fallbackUrl, "_blank");
    }
    });
}

const websiteBtn = document.getElementById("restaurant-website");
const websiteUrl = selectedRestaurant.website || selectedRestaurant.url;

if (websiteBtn) {
    if (websiteUrl) {
       
        if (!websiteUrl.startsWith("http://") && !websiteUrl.startsWith("https://")) {
            websiteUrl = "https://" + websiteUrl;
        }
        websiteBtn.hrf = websiteUrl;
        websiteBtn.target = "_blank";
        websiteBtn.rel = "noopener noreferrer";
    }
}