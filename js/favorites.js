const favoriteButton = document.querySelector(".favorite-icon");

favoriteButton.addEventListener("click", () => {
    favoriteButton.classList.toggle("active");
});