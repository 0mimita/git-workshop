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

async function getRestaurants() {
  const latitude = localStorage.getItem("latitude");
  const longitude = localStorage.getItem("longitude");
  const subTypes = JSON.parse(localStorage.getItem("sub_types")) || [];
  const priceRanges = JSON.parse(localStorage.getItem("price_ranges")) || [];
  const maxDistance = Number(localStorage.getItem("distance")) || 5;
  const container = document.getElementById("restaurants-container");
  const sortSelect = document.getElementById("sort-select");
  const sortBy = sortSelect ? sortSelect.value : "";

  container.innerHTML = "";

  const apiUrl = `https://smapi.lnu.se/api/?api_key=3bdTk4Bn&controller=food&method=getfromlatlng&lat=${latitude}&lng=${longitude}&radius=5`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    let restaurants = data.payload || [];

    if (subTypes.length > 0) {
      restaurants = restaurants.filter((r) => {
        if (!r.sub_type) return false;
        return subTypes.includes(r.sub_type);
      });
    }

    if (priceRanges.length > 0) {
      restaurants = restaurants.filter((r) => {
        const price = parseInt(r.avg_lunch_pricing);

        if (isNaN(price)) return true;
        if (priceRanges.includes("$") && price < 100) return true;
        if (priceRanges.includes("$$") && price >= 100 && price <= 150)
          return true;
        if (priceRanges.includes("$$$") && price > 150) return true;

        return false;
      });
    }

    restaurants = restaurants.filter((restaurant) => {
      return Number(restaurant.distance_in_km) <= maxDistance;
    });

    if (sortBy === "priceAsc") {
      restaurants.sort(
        (a, b) => Number(a.avg_lunch_pricing) - Number(b.avg_lunch_pricing),
      );
    } else if (sortBy === "priceDesc") {
      restaurants.sort(
        (a, b) => Number(b.avg_lunch_pricing) - Number(a.avg_lunch_pricing),
      );
    } else if (sortBy === "rating") {
      restaurants.sort((a, b) => Number(b.rating) - Number(a.rating));
    } else if (sortBy === "reviews") {
      restaurants.sort((a, b) => Number(b.num_reviews) - Number(a.num_reviews));
    } else {
      restaurants.sort(
        (a, b) => parseFloat(a.distance_in_km) - parseFloat(b.distance_in_km),
      );
    }

    if (restaurants.length === 0) {
      container.innerHTML = "<p>Inga restauranger matchar dina val.</p>";
      return;
    }

    restaurants.forEach((restaurant) => {
      const card = document.createElement("div");
      card.className = "restaurant-card";

      card.innerHTML = `
        <div class="card-info">
          <h2>${restaurant.name}</h2>
          <img src="images/location-icon.svg" alt="Plats" class="icon-small">
          <p>${Number(restaurant.distance_in_km).toFixed(1)} km • ${getPriceLevel(restaurant.avg_lunch_pricing)}</p>
        </div>
      `;

      card.addEventListener("click", () => {
        localStorage.setItem("selectedRestaurant", JSON.stringify(restaurant));
        window.location.href = "restaurant.html";
      });

      container.appendChild(card);
    });
  } catch (error) {
    console.error(error);
    container.innerHTML = "<p>Kunde inte hämta restauranger.</p>";
  }
}

getRestaurants();

const sortSelect = document.getElementById("sort-select");

if (sortSelect) {
  sortSelect.addEventListener("change", getRestaurants);
}

const backBtn = document.getElementById("back-button");
if (backBtn) {
  backBtn.addEventListener("click", () => {
    window.history.back();
  });
}
