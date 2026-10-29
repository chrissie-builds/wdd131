// Display the current year
const currentYearElement = document.getElementById("currentyear");

if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// Display the last modified date
const lastModifiedElement = document.getElementById("lastModified");

if (lastModifiedElement) {
    lastModifiedElement.textContent = document.lastModified;
}

const menuButton = document.querySelector(".menu-button");
const navList = document.querySelector("nav ul");

// Open and close the navigation menu
if (menuButton && navList) {
    menuButton.addEventListener("click", () => {
        const isOpen = navList.classList.toggle("show");

        menuButton.textContent = isOpen ? "✕" : "☰";

        menuButton.setAttribute("aria-expanded", String(isOpen));

        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });
}

const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Austin Texas",
        location: "Cedar Park, Texas, United States",
        dedicated: "Not yet dedicated",
        area: 30000,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/austin-texas-temple/austin-texas-temple-40361-main.jpg"
    },
    {
        templeName: "Bern Switzerland",
        location: "Zollikofen, Switzerland",
        dedicated: "1955, September, 11",
        area: 35546,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/bern-switzerland-temple/bern-switzerland-temple-54641-main.jpg"
    },
    {
        templeName: "Osaka Japan",
        location: "Hirakata City, Osaka, Japan",
        dedicated: "Not yet dedicated",
        area: 34320,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/osaka-japan-temple/osaka-japan-temple-64083-main.jpg"
    }
];


const templeContainer = document.getElementById("temple-container");
const pageTitle = document.getElementById("page-title");
const filterLinks = document.querySelectorAll(".filter-link");

// Create and display temple cards
function displayTemples(templeList) {
    if (!templeContainer) return;

    // Clear the existing gallery
    templeContainer.innerHTML = "";

    // Create a card for each temple
    templeList.forEach((temple) => {
        const figure = document.createElement("figure");
        const image = document.createElement("img");
        const caption = document.createElement("figcaption");

        // Temple image
        image.src = temple.imageUrl;
        image.alt = `${temple.templeName} Temple`;
        image.loading = "lazy";
        image.width = 400;
        image.height = 250;

        // Temple name
        const name = document.createElement("h3");
        name.textContent = temple.templeName;

        // Temple location
        const location = document.createElement("p");
        const locationLabel = document.createElement("strong");
        locationLabel.textContent = "Location: ";
        location.append(locationLabel, document.createTextNode(temple.location));

        // Temple dedication date
        const dedicated = document.createElement("p");
        const dedicatedLabel = document.createElement("strong");
        dedicatedLabel.textContent = "Dedicated: ";
        dedicated.append(
            dedicatedLabel,
            document.createTextNode(temple.dedicated)
        );

        // Temple size
        const area = document.createElement("p");
        const areaLabel = document.createElement("strong");
        areaLabel.textContent = "Size: ";
        area.append(
            areaLabel,
            document.createTextNode(
                `${temple.area.toLocaleString()} sq ft`
            )
        );

        // Add all information to the card
        caption.append(name, location, dedicated, area);
        figure.append(image, caption);

        // Add the card to the gallery
        templeContainer.appendChild(figure);
    });
}


function filterTemples(filter) {
    let filteredTemples = [];

    switch (filter) {
        case "old":
            // Temples dedicated before 1900
            filteredTemples = temples.filter((temple) => {
                const year = Number(temple.dedicated.slice(0, 4));
                return year < 1900;
            });
            break;

        case "new":
            // Temples dedicated after 2000
            filteredTemples = temples.filter((temple) => {
                const year = Number(temple.dedicated.slice(0, 4));
                return year > 2000;
            });
            break;

        case "large":
            // Temples larger than 90,000 square feet
            filteredTemples = temples.filter(
                (temple) => temple.area > 90000
            );
            break;

        case "small":
            // Temples smaller than 10,000 square feet
            filteredTemples = temples.filter(
                (temple) => temple.area < 10000
            );
            break;

        case "home":
        default:
            // Display every temple
            filteredTemples = temples;
            break;
    }

    displayTemples(filteredTemples);
}

filterLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        // Get the selected filter
        const filter = link.dataset.filter;

        // Display the filtered temples
        filterTemples(filter);

        // Update the page heading
        if (pageTitle) {
            pageTitle.textContent =
                filter.charAt(0).toUpperCase() + filter.slice(1);
        }

        // Highlight the selected navigation link
        filterLinks.forEach((item) => {
            item.classList.remove("active");
        });

        link.classList.add("active");

        // Close the mobile menu after a selection
        if (navList && menuButton) {
            navList.classList.remove("show");
            menuButton.textContent = "☰";
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        }
    });
});

// Display all temples when the page first loads
displayTemples(temples);
