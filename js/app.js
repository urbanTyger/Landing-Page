// All constant variables from index.html
const allSectionIds = document.querySelector(".main-container").children;
const caret = document.getElementById("caret");
const menu = document.querySelector(".header-container");
const logo = document.querySelector(".logo-image");
const menuOpenButton = document.getElementById("burger")
const menuCloseButton = document.getElementById("burger-close")
const mainMenu = document.querySelector(".main-menu");
const newMenu = document.getElementById('menu-items');
// additional variables & arrays
let running = false;
let stopwatch;
let menuItems = [];
let menuListData = [];

createMenu(menuListData);

// Function to create the menu from section "data-menu" information
function createMenu(menuListData) {
    let tempHolder = {};
    for (sectionId of allSectionIds) {
        tempHolder['id'] = sectionId.id;
        tempHolder['top'] = sectionId.getBoundingClientRect().top;
        tempHolder['menuName'] = sectionId.getAttribute("data-menu");
        menuListData.push(tempHolder);
        tempHolder = {};
    }

    for (menuList of menuListData) {
        menuItems.push(`<li class=\"menu-item ${menuList.id}\"><a href=\"#${menuList.id}\">${menuList.menuName}</a></li>`);
    }
    newMenu.innerHTML += menuItems.join("");
}




function menuShow() {
    menu.style.animation = "none";
    menu.style.padding = "10px";
    menu.style.position = "fixed";
    menu.style.top = window.pageYOffset;
    menu.style.width = "100%";
    menu.style.animation = "menuSlideIn 600ms";
}

function menuVanish(running) {
    if (running === false) {
        running = true;
        menu.style.animation = "menuSlideIn reverse 150ms";
        setTimeout(() => {
            menu.style.position = "static"
            menu.style.padding = "30px";
        }, 175);

    }
}

//  Scroll to top of page for caret
function toTop() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    });
}

// Open the menu on mobile screens
function openMenu() {
    mainMenu.style.transition = "all 500ms";
    menuOpenButton.style.display = "none"
    mainMenu.style.left = 0;
    setTimeout(() => {
        menuCloseButton.style.display = "block"
    }, 600);
}

// Close the menu on mobile screens
function closeMenu() {
    mainMenu.style.transition = "all 500ms";
    menuCloseButton.style.display = "none"
    mainMenu.style.left = "-1000px";
    setTimeout(() => {
        menuOpenButton.style.display = "block"
    }, 600);
}

//-- EVENT LISTENERS --


// Clicks on the menu will go to the related section
menu.addEventListener("click", (click) => {
    click.preventDefault();
    let myTarget = click.target.nodeName;
    if (myTarget === "A") {
        let linkFound = click.target.href;
        linkFound = linkFound.split('#');
        document.getElementById(linkFound[1]).scrollIntoView({ behavior: 'smooth' })
    } else if (myTarget === "H1") {
        toTop();
    };
});

// Collapse each section on click
document.body.addEventListener("click", (collapse) => {
    if (collapse.target.nodeName === "H2") {
        collapse.target.parentElement.parentElement.classList.toggle("collapse");
    }
});

// Determine if the user is scrolling to hide and show the menu and "to top" caret
// Also determines whether a section should be active or not by its location
window.addEventListener("scroll", () => {
    closeMenu();
    menu.style.animation = "none"; //reset animation for repeated use
    clearTimeout(stopwatch); //clears timer until scrolling has stopped
    if (window.pageYOffset >= (700)) {
        menuVanish(running);
        caret.style.visibility = "visible";
        caret.style.opacity = 1;
        stopwatch = setTimeout(menuShow, 1000);
    } else {
        caret.style.opacity = 0;
        caret.style.visibility = "hidden";
        menu.style.animation = "none";
    }
    for (section of allSectionIds) {
        let current = document.getElementById(section.id);
        let menuCurrent = document.querySelector("." + section.id);
        if (section.getBoundingClientRect().y < 500 && section.getBoundingClientRect().y > -500) {
            current.classList.add("active-section");
            menuCurrent.classList.add("active");
        } else {
            current.classList.remove("active-section");
            menuCurrent.classList.remove("active");
        }
    }
});