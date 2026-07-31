const resultButton = document.querySelector(".result-button");
const distanceError = document.getElementById("distance-error");
const buttons = document.querySelectorAll(".filter-grid button");

const distanceFilter = document.getElementById("distance-filter");

document.addEventListener("DOMContentLoaded", () => {
   
    const savedSubTypes = JSON.parse(localStorage.getItem("sub_types")) || [];
    const savedPriceRanges = JSON.parse(localStorage.getItem("price_ranges")) || [];
    
   buttons.forEach ((btn) => {
    const value = btn.dataset.value || btn.innerText.trim();
    if (savedSubTypes.includes(value) || savedPriceRanges.includes(value)) {
        btn.classList.add("selected");
    }
   });
});

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

const clearBtn = document.getElementById("clear-filters-btn");
if (clearBtn) {
    clearBtn.addEventListener("click", () => {
        localStorage.removeItem("distance");
        localStorage.removeItem("sub_types");
        localStorage.removeItem("price_ranges");

        document.querySelectorAll(".filter-grid button").forEach(btn => {
            btn.classList.remove("selected");
        
            });
        document.querySelectorAll("select").forEach(select => {
            select.selectedIndex = 0;
        });
       
    });
}