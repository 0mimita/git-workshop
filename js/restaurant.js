const selectedRestaurant =JSON.parse(
    localStorage.getItem("selectedRestaurant")
);

console.log(selectedRestaurant);

document.getElementById("restaurant-name").textContent = selectedRestaurant.name;

document.getElementById("restaurant-title").textContent = selectedRestaurant.description;

document.getElementById("restaurant-info").textContent =
`${selectedRestaurant.distance_in_km.toFixed(1)} km • ${selectedRestaurant.avg_lunch_pricing} kr`;

document.getElementById("restaurant-rating").textContent =
`${selectedRestaurant.rating} (${selectedRestaurant.num_reviews} omdömen)`;

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