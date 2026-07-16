const buttons = document.querySelectorAll(".filter-grid button");

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        button.classList.toggle("selected");

        const selectedButtons = document.querySelectorAll(".filter-grid button.selected");
        const subTypes = [];
        const priceRanges = [];

        selectedButtons.forEach((btn) => {
            const value = btn.getAttribute("data-value");
            
            if (value === "$" || value === "$$" || value === "$$$") {
                priceRanges.push(value);
            } else {
                subTypes.push(value);
            }
        });

        localStorage.setItem("sub_types", JSON.stringify(subTypes));
        localStorage.setItem("price_ranges", JSON.stringify(priceRanges));

        console.log("Subtypes:", subTypes);
        console.log("Prices:", priceRanges);
    });
});