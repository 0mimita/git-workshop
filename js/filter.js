const buttons = document.querySelectorAll(".filter-grid button");

buttons.forEach((button) => {

    button.addEventListener("click", () => {
        
        button.classList.toggle("selected");

        let selectedFilters = localStorage.getItem("filters");

        if (selectedFilters === null) {
            selectedFilters = [];
        } else {
            selectedFilters = JSON.parse(selectedFilters);
        }

        const value = button.textContent;

        let alreadySelected = false;

        for (let i = 0; i < selectedFilters.length; i++) {
            if (selectedFilters[i] === value) {
                alreadySelected = true;
            }
        }

        if (alreadySelected === true) {
            let newArray = [];

            for (let i = 0; i < selectedFilters.length; i++) {
                if (selectedFilters[i] !== value) {
                    newArray.push(selectedFilters[i]);
                }
        }
        selectedFilters = newArray;
    } else {
        selectedFilters.push(value);
    }

    localStorage.setItem(
        "filters",
        JSON.stringify(selectedFilters)
    );

    console.log(selectedFilters);

    });
    
});