const resultButton = document.querySelector(".result-button");
const distanceError = document.getElementById("distance-error");
const buttons = document.querySelectorAll(".filter-grid button");

const distanceFilter = document.getElementById("distance-filter");

if (distanceFilter) {
  const savedDistance = localStorage.getItem("distance");

  if (savedDistance) {
    distanceFilter.value = savedDistance;
  }

  distanceFilter.addEventListener("change", () => {
    localStorage.setItem("distance", distanceFilter.value);
  });
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        button.classList.toggle("selected");
    });
});

resultButton.addEventListener("click", (event) => {

    if (!distanceFilter.value) {
        event.preventDefault();
        distanceError.style.display = "block";
        return;
    }

    distanceError.style.display = "none";

    const selectedButtons = document.querySelectorAll(".filter-grid button.selected");

    const subTypes = [];
    const priceRanges = [];

    selectedButtons.forEach((btn) => {
        const value = btn.dataset.value || btn.textContent.trim();

        if (value === "$" || value === "$$" || value === "$$$") {
            priceRanges.push(value);
        } else {
            subTypes.push(value);
        }
    });

    localStorage.setItem("sub_types", JSON.stringify(subTypes));
    localStorage.setItem("price_ranges", JSON.stringify(priceRanges));
});

const randomBtn = document.getElementById("random-btn");

if (randomBtn) {
    randomBtn.addEventListener("click", () => {
        localStorage.setItem("shouldRandomize", "true");
        window.location.href = "result.html";
    });
}

function prepareQuickFilter() {
    const currentDistance = localStorage.getItem("distance");
    if (!currentDistance) {
        localStorage.setItem("distance", "2");
    }
}

document.getElementById("quick-asian")?.addEventListener("click", () => {
    prepareQuickFilter();
    localStorage.setItem("sub_types", JSON.stringify(["ASIAN"]));
    localStorage.setItem("price_ranges", JSON.stringify([]));
    window.location.href = "result.html";

});

document.getElementById("quick-cheap")?.addEventListener("click", () => {
    prepareQuickFilter();
    localStorage.setItem("sub_types", JSON.stringify([]));
    localStorage.setItem("price_ranges", JSON.stringify([$]));
    window.location.href = "result.html";
});

document.getElementById("quick-near")?.addEventListener("click", () => {
    localStorage.setItem("distance", "0.5");
    localStorage.setItem("sub_types", JSON.stringify([]));
    localStorage.setItem("price_ranges", JSON.stringify([]));
    window.location.href = "result.html";
});