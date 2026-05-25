const favoriteButton = document.querySelector(".favorite-icon");

favoriteButton.addEventListener("click", () => {
    favoriteButton.classList.toggle("active");

    let favorites = localStorage.getItem("favorites");

    if (favorites === null) {
        favorites = [];
    } else {
        favorites = JSON.parse(favorites);
    }

    const currentRestaurant = JSON.parse(localStorage.getItem("selectedRestaurant"));

    let exists = false;

    for (let i = 0; i < favorites.length; i++) {
        if (favorites[i].name === currentRestaurant.name) {
            exists = true;

        }
    }

    if (exists === true) {
        let newFavorites = [];

        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i].name !== currentRestaurant.name) {
                newFavorites.push(favorites[i]);
            }
        }

        favorites = newFavorites;
    } else {
        favorites.push(currentRestaurant);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));

    console.log(favorites);

   
});