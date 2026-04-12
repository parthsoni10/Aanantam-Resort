// JavaScript for Boulevard9 Website

// "Learn More" Button Alert
document.getElementById('learn-more-btn').addEventListener('click', function () {
    alert("Discover our premium services and venues!");
});

// Service Buttons Functionality
const serviceButtons = document.querySelectorAll('.service-btn');
serviceButtons.forEach(button => {
    button.addEventListener('click', () => {
        alert("Service details coming soon!");
    });
});

// Contact Form Submission
document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from reloading the page
    alert("Thank you for contacting us! We will respond shortly.");
});
