//get dates file for footer section
const currentYearElement = document.getElementById("currentYear");
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

const lastModifiedElement = document.getElementById("lastModified");
if (lastModifiedElement) {
    lastModifiedElement.textContent += document.lastModified;
}

//Hamburger Button
const nav = document.querySelector("nav");
const navList = document.querySelector("nav ul");

const menuButton = document.createElement("button");

menuButton.classList.add("menu-button");
menuButton.setAttribute("aria-label", "Open navigation menu");
menuButton.innerHTML = "☰";

nav.parentNode.insertBefore(menuButton, nav);

menuButton.addEventListener("click", () => {
    navList.classList.toggle("show");

    if (navList.classList.contains("show")) {
        menuButton.innerHTML = "✕";
        menuButton.setAttribute("aria-label", "Close navigation menu");
    } else {
        menuButton.innerHTML = "☰";
        menuButton.setAttribute("aria-label", "Open navigation menu");
    }
});