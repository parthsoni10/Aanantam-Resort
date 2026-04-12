let currentSlide = 0;
const slides = [
    "/image/r1.JPG",
    "/image/r3.jpg",
    "/image/r2.jpg",
    "/image/r4.jpg"
];
const sliderImage = document.getElementById("slider-image");

// Function to update the slider
function updateSlider() {
    sliderImage.style.opacity = 0; // Fade-out effect
    setTimeout(() => {
        sliderImage.src = slides[currentSlide];
        sliderImage.style.opacity = 1; // Fade-in effect
    }, 500);
}

// Previous slide function
function prevSlide() {
    currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
    updateSlider();
    resetAutoSlide(); // Reset auto-slide timer
}

// Next slide function
function nextSlide() {
    currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
    updateSlider();
    resetAutoSlide(); // Reset auto-slide timer
}

// Auto-slide function
function autoSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
}

// Automatically change images every 2 seconds
let slideInterval = setInterval(autoSlide, 2000);

// Reset the timer when manually navigating
function resetAutoSlide() {
    clearInterval(slideInterval);
    slideInterval = setInterval(autoSlide, 2000);
}

    function searchRooms() {
        const checkin = document.getElementById("checkin").value;
        const checkout = document.getElementById("checkout").value;
        const members = document.getElementById("members").value;
        const promoCode = document.getElementById("promo-code").value;

        alert(`Searching for rooms with the following details:
        Check-in: ${checkin}
        Check-out: ${checkout}
        Members: ${members}
        Promo Code: ${promoCode}`);
    }

    document.addEventListener("DOMContentLoaded", function () {
        const dropdownMenus = document.querySelectorAll(".dropdown-menu .dropdown-item");
    
        dropdownMenus.forEach(item => {
            item.addEventListener("click", function (event) {
                event.preventDefault();
    
                // Get the full selected row
                let selectedRow = this.closest("tr");
    
                // Get all rows and buttons on the page
                let allRows = document.querySelectorAll(".room-table tbody tr");
                let allButtons = document.querySelectorAll(".room-table tbody tr button");
    
                // Enable all initially
                allRows.forEach(row => {
                    row.style.opacity = "1";
                    row.style.pointerEvents = "auto";
                });
    
                allButtons.forEach(button => {
                    button.disabled = false;
                    button.style.opacity = "1";
                });
    
                // Disable all rows and buttons except the selected one
                allRows.forEach(row => {
                    if (row !== selectedRow) {
                        row.style.opacity = "0.5";
                        row.style.pointerEvents = "none";
                    }
                });
    
                allButtons.forEach(button => {
                    if (!selectedRow.contains(button)) {
                        button.disabled = true;
                        button.style.opacity = "0.5";
                    }
                });
            });
        });
    });

    document.addEventListener("DOMContentLoaded", function () {
        // Get all room selection dropdown items
        const roomOptions = document.querySelectorAll(".room-option");
    
        roomOptions.forEach(option => {
            option.addEventListener("click", function (event) {
                event.preventDefault();
    
                let selectedRooms = parseInt(this.getAttribute("data-rooms"));
                let pricePerRoom = parseFloat(this.getAttribute("data-price"));
    
                // Calculate new total price
                let totalPrice = selectedRooms * pricePerRoom;
    
                // Update the displayed price
                let roomPriceElement = this.closest("tr").querySelector(".room-price");
                roomPriceElement.textContent = `INR ${totalPrice.toFixed(2)}`;
    
                // Update hidden input fields for form submission
                let form = this.closest("tr").querySelector("form");
                form.querySelector("#selectedRooms").value = selectedRooms;
                form.querySelector("#totalPrice").value = totalPrice;
            });
        });
    });

    document.addEventListener("DOMContentLoaded", function () {
        const dropdownItems = document.querySelectorAll(".dropdown-item.room-option");
    
        dropdownItems.forEach(item => {
            item.addEventListener("click", function (event) {
                event.preventDefault(); // Prevent default link behavior
    
                let selectedRooms = parseInt(this.getAttribute("data-rooms"), 10); // Selected room count
                let pricePerRoom = parseFloat(this.getAttribute("data-price").replace(",", "")); // Convert price to float
                let row = this.closest("tr"); // Get the row of the selected room
                let priceCell = row.querySelector(".room-price"); // Price cell
                let dropdownButton = row.querySelector(".dropdown-toggle"); // Dropdown button
                let selectedRoomsInput = row.querySelector("input[name='selectedRooms']"); // Hidden input for rooms
                let totalPriceInput = row.querySelector("input[name='totalPrice']"); // Hidden input for total price
    
                // **Fix: Correctly calculate total price**
                let totalRoomPrice = 1* pricePerRoom; 
    
                // Ensure integer formatting for INR currency
                let formattedPrice = `INR ${totalRoomPrice.toLocaleString('en-IN')}`; 
    
                // Update displayed price
                priceCell.textContent = formattedPrice.split(".")[0]; // Ensures no `.00`
    
                // Update dropdown button text
                dropdownButton.textContent = `Rooms (${selectedRooms})`;
    
                // Update hidden input fields in the form
                selectedRoomsInput.value = selectedRooms;
                totalPriceInput.value = totalRoomPrice; // Ensure correct price is passed
            });
        });
    });
    

    // document.addEventListener("DOMContentLoaded", function () {
    //     const dropdownItems = document.querySelectorAll(".dropdown-item.room-option");
    
    //     dropdownItems.forEach(item => {
    //         item.addEventListener("click", function (event) {
    //             event.preventDefault(); // Prevent default link behavior
    
    //             let selectedRooms = parseInt(this.getAttribute("data-rooms"), 10); // Selected room count
    //             let pricePerRoom = parseInt(this.getAttribute("data-price").replace(",", ""), 10); // Base price
    //             let row = this.closest("tr"); // Get the row of the selected room
    //             let priceCell = row.querySelector(".room-price"); // Price cell
    //             let dropdownButton = row.querySelector(".dropdown-toggle"); // Dropdown button
    //             let selectedRoomsInput = row.querySelector("input[name='selectedRooms']"); // Hidden input for rooms
    //             let totalPriceInput = row.querySelector("input[name='totalPrice']"); // Hidden input for total price
    
    //             // Calculate total price
    //             let totalRoomPrice = pricePerRoom * selectedRooms; 
    
    //             // Force display as an integer (remove decimals)
    //             let formattedPrice = `INR ${totalRoomPrice.toLocaleString('en-IN')}`; 
    
    //             // Update displayed price (integer only)
    //             priceCell.textContent = formattedPrice.split(".")[0]; // Ensures no `.00`
    
    //             // Update dropdown button text
    //             dropdownButton.textContent = `Rooms (${selectedRooms})`;
    
    //             // Update hidden input fields in the form
    //             selectedRoomsInput.value = selectedRooms;
    //             totalPriceInput.value = totalRoomPrice;
    //         });
    //     });
    // });
    
    document.addEventListener("DOMContentLoaded", function () {
        // Select all images inside elements with the class "room-image"
        const roomImages = document.querySelectorAll(".room-image img");
    
        roomImages.forEach(image => {
            image.addEventListener("click", function () {
                // Create a modal container
                const modal = document.createElement("div");
                modal.classList.add("image-modal");
    
                // Disable scrolling on background
                document.body.style.overflow = "hidden";
    
                // Create a close button
                const closeButton = document.createElement("span");
                closeButton.classList.add("close-btn");
                closeButton.innerHTML = "&times;";
    
                // Create an enlarged image
                const enlargedImg = document.createElement("img");
                enlargedImg.src = image.src; // Get the clicked image's source
                enlargedImg.classList.add("enlarged-img");
    
                // Append elements to modal
                modal.appendChild(closeButton);
                modal.appendChild(enlargedImg);
                document.body.appendChild(modal);
    
                // Close modal on button click
                closeButton.addEventListener("click", function () {
                    document.body.removeChild(modal);
                    document.body.style.overflow = "auto"; // Restore scrolling
                });
    
                // Close modal when clicking outside image
                modal.addEventListener("click", function (e) {
                    if (e.target === modal) {
                        document.body.removeChild(modal);
                        document.body.style.overflow = "auto"; // Restore scrolling
                    }
                });
            });
        });
    
        // Add CSS for styling dynamically
        const style = document.createElement("style");
        style.innerHTML = `
            .image-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                overflow: hidden;
            }
            .enlarged-img {
                max-width: 80%;
                max-height: 80%;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
            }
            .close-btn {
                position: absolute;
                top: 20px;
                right: 30px;
                font-size: 40px;
                color: white;
                cursor: pointer;
                font-weight: bold;
            }
            body.modal-open {
                overflow: hidden;
            }
        `;
        document.head.appendChild(style);
    });
    const rooms = [
        { id: 101, occupiedUntil: "2025-02-20" },
        { id: 102, occupiedUntil: "2025-02-18" },
        { id: 103, occupiedUntil: "2025-02-25" },
        { id: 104, occupiedUntil: "2025-02-12" }
    ];
    
    function searchRooms() {
        const checkinDate = new Date(document.getElementById("checkin").value);
        const checkoutDate = new Date(document.getElementById("checkout").value);
        const today = new Date();
        const maxDate = new Date();
        maxDate.setDate(today.getDate() + 15);
        
        if (!checkinDate || !checkoutDate || checkoutDate <= checkinDate || checkinDate < today || checkinDate > maxDate) {
            alert("Please select a valid check-in date within the next 15 days and a proper check-out date.");
            return;
        }
        
        let availableRooms = rooms.filter(room => new Date(room.occupiedUntil) < checkinDate);
        
        displayRooms(availableRooms);
    }
    
    function displayRooms(availableRooms) {
        let resultSection = document.getElementById("results");
        resultSection.innerHTML = ""; // Clear previous results
        
        rooms.forEach(room => {
            let roomInfo = document.createElement("p");
            roomInfo.textContent = `Room ${room.id}`;
            roomInfo.style.color = new Date(room.occupiedUntil) < new Date(document.getElementById("checkin").value) ? "green" : "red";
            resultSection.appendChild(roomInfo);
        });
    }
    
    document.getElementById("checkin").addEventListener("input", function () {
        let checkinDate = new Date(this.value);
        let checkoutInput = document.getElementById("checkout");
        let minCheckoutDate = new Date(checkinDate);
        minCheckoutDate.setDate(minCheckoutDate.getDate() + 1);
        checkoutInput.min = minCheckoutDate.toISOString().split("T")[0];
        
        let maxDate = new Date();
        maxDate.setDate(new Date().getDate() + 15);
        this.max = maxDate.toISOString().split("T")[0];
        
        displayRooms(rooms.filter(room => new Date(room.occupiedUntil) < checkinDate));
    });

    document.addEventListener("DOMContentLoaded", function () {
        const userIcon = document.getElementById("user-icon");
        const dropdownMenu = document.getElementById("user-dropdown");
    
        userIcon.addEventListener("click", function (event) {
            dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
            event.stopPropagation(); // Prevent closing when clicking the icon
        });
    
        document.addEventListener("click", function (event) {
            if (!userIcon.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.style.display = "none";
            }
        });
    });

    document.getElementById("payment-form").addEventListener("submit", async function(event) {
        event.preventDefault();
        
        const formData = new FormData(this);
        const response = await fetch("/payment/create-order", {
            method: "POST",
            body: new URLSearchParams(formData),
        });
        const { order, paymentId } = await response.json();

        var options = {
            key: "YOUR_RAZORPAY_KEY",
            amount: order.amount,
            currency: order.currency,
            name: "Resort Booking",
            description: "Room Payment",
            order_id: order.id,
            handler: async function (response) {
                await fetch("/payment/verify-payment", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        paymentId: paymentId,
                    }),
                });

                alert("Payment Successful!");
                window.location.href = "/home";
            },
        };

        var rzp1 = new Razorpay(options);
        rzp1.open();
    });

    document.querySelectorAll('.room-option').forEach(option => {
        option.addEventListener('click', function (e) {
            e.preventDefault();

            const index = this.getAttribute('data-index');
            const selectedRooms = this.getAttribute('data-rooms');
            const totalPrice = this.getAttribute('data-price');

            document.getElementById(`selectedRooms-${index}`).value = selectedRooms;
            document.getElementById(`totalPrice-${index}`).value = totalPrice;
        });
    });

  document.addEventListener("DOMContentLoaded", () => {
    const roomOptions = document.querySelectorAll(".room-option");

    roomOptions.forEach(option => {
      option.addEventListener("click", (e) => {
        e.preventDefault();
        
        const baseId = option.getAttribute("data-base-id");
        const price = parseInt(option.getAttribute("data-price"));
        const rooms = parseInt(option.getAttribute("data-rooms"));

        const totalPrice = price * rooms;

        // Update total price and room count in the form
        document.getElementById(`selectedRooms-${baseId}`).value = rooms;
        document.getElementById(`totalPrice-${baseId}`).value = totalPrice;

        // Update display
        document.getElementById(`price-${baseId}`).textContent = totalPrice;
      });
    });
  });

  app.get('/room-details/:id', (req, res) => {
    const roomData = {
        name: "Chalet Grandeur",
        description: "Our Chalet Grandeur offers an exquisite blend of luxury and nature, perfect for an indulgent getaway...",
        options: [
            {
                type: "Deluxe Room",
                maxPersons: 2,
                roomCounts: [
                    { rooms: 1, price: 1500 },
                    { rooms: 2, price: 2900 },
                    { rooms: 3, price: 4200 },
                    { rooms: 4, price: 5500 },
                    { rooms: 5, price: 6800 },
                ],
                price: 1500,
                _id: "room1_id"
            },
            {
                type: "Suite",
                maxPersons: 2,
                roomCounts: [
                    { rooms: 1, price: 1800 },
                    { rooms: 2, price: 3400 },
                    { rooms: 3, price: 5000 },
                    { rooms: 4, price: 6400 },
                    { rooms: 5, price: 7800 },
                ],
                price: 1800,
                _id: "room2_id"
            }
        ]
    };
    res.render('room-details', { room: roomData });
});







 
    
    