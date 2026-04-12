const heroSection = document.querySelector(".hero");
const images = [
    "/image/3.jpg",
    "/image/2.jpg",
    "/image/w5.jpg",
    "/image/d1.jpg"
];
let index = 0;

function changeBackground() {
    heroSection.style.backgroundImage = `url('${images[index]}')`;
    index = (index + 1) % images.length;
}

setInterval(changeBackground, 2000);

document.addEventListener("DOMContentLoaded", function () {
    const toggleArrow = document.createElement("button");
    toggleArrow.id = "toggle-arrow";
    toggleArrow.innerHTML = `<i class="fas fa-arrow-left"></i>`;
    document.body.appendChild(toggleArrow);

    const bookingMenu = document.createElement("div");
    bookingMenu.id = "booking-menu";
    bookingMenu.innerHTML = `<a style="margin-right:35px;margin-bottom:10px" href="/show-all-bookings">View Bookings</a>`;
    document.body.appendChild(bookingMenu);

    let isMenuOpen = false;

    toggleArrow.addEventListener("click", function () {
        if (isMenuOpen) {
            bookingMenu.style.right = "-200px";
            toggleArrow.innerHTML = `<i class="fas fa-arrow-left"></i>`;
        } else {
            bookingMenu.style.right = "0";
            toggleArrow.innerHTML = `<i class="fas fa-arrow-right"></i>`;
        }
        isMenuOpen = !isMenuOpen;
    });
});

