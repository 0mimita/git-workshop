const buttons = document.querySelectorAll(".filter-grid button");

buttons.forEach((button) => {

    button.addEventListener("click", () => {
        
        button.classList.toggle("selected");

    });
});