function getFavorites() {
     const favorites = localStorage.getItem("favorites");
     return favorites ? JSON.parse(favorites) : [];
}

function saveFavorites(favorites) {
     localStorage.setItem("favorites", JSON.stringify(favorites));
}

function getSelectedRestaurant() {
     const selected = localStorage.getItem("selectedRestaurant");
     return selected ? JSON.parse(selected) : null;
}

function saveSelectedRestaurant(restaurant) {
     localStorage.setItem("selectedRestaurant", JSON.stringify(restaurant));
}