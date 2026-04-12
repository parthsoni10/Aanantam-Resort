document.addEventListener("DOMContentLoaded", function () {
  // Get elements
  const priceElement = document.getElementById("id");
  const taxElement = document.getElementById("price2");
  const subtotalElement = document.getElementById("price3");

  // Get room price
  let price = parseFloat(priceElement.textContent);
  if (isNaN(price)) {
      console.error("Invalid price value");
      return;
  }

  // Calculate GST (18%)
  let gst = price * 0.18;
  let subtotal = price + gst;

  // Update UI
  taxElement.textContent = `INR ${gst.toFixed(2)}`;
  subtotalElement.textContent = `INR ${subtotal.toFixed(2)}`;

  console.log("GST Calculated: ", gst);
  console.log("Subtotal Calculated: ", subtotal);
});

document.getElementById("payNow").addEventListener("click", async function () {
  let baseAmount = parseFloat(document.getElementById("amount").value);
  let gst = baseAmount * 0.18;
  let finalAmount = baseAmount + gst;

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const userId = document.getElementById("userId").value;
  const bookingId = document.getElementById("bookingId").value;
  const checkIn = document.getElementById("checkin").value;
  const checkOut = document.getElementById("checkout").value;
  const room_no = document.getElementById("room_no").value;
  const arrivalTime = document.getElementById("arrivalTime").value;

  if (!finalAmount || finalAmount <= 0) {
    alert("Please enter a valid amount");
    return;
  }
  if (!name || !email || !phone || !checkIn || !checkOut) {
    alert("Please enter all required details!");
    return;
  }

  try {
    console.log("🔹 Requesting order creation with amount:", finalAmount);

    const response = await fetch("/api/payment/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: finalAmount,
        currency: "INR",
        userId,
        bookingId,
        checkIn,
        checkOut,
        room_no,
        arrivalTime
      }),
    });

    const data = await response.json();
    console.log("✅ Order Object Received:", data);

    if (!data.success) {
      console.error("❌ Server Error:", data.message);
      alert("❌ " + data.message);
      return;
    }

    const options = {
      key: "rzp_test_aLv8J5srgHpjmh",
      amount: data.order.amount,
      currency: data.order.currency,
      order_id: data.order.id,
      name: "Anantam Resort",
      description: "Room Booking Payment",
      prefill: {
        name: name,
        email: email,
        contact: phone,
      },
      handler: async function (response) {
        console.log("✅ Payment Successful:", response);

        const verifyRes = await fetch("/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...response,
            userId,
            bookingId,
            amount: finalAmount,
            currency: "INR",
            checkIn,
            checkOut,
            room_no,
            arrivalTime
          }),
        });

        const verifyData = await verifyRes.json();

        if (verifyData.success) {
          alert("🎉 Payment Successful!");
          window.location.href = `/showbooking/${response.razorpay_payment_id}`;
        } else {
          alert("❌ Payment verification failed!");
        }
      },
      theme: { color: "#3399cc" },
    };

    console.log("🎯 Razorpay Options:", options);

    const rzp1 = new Razorpay(options);

    rzp1.on("payment.failed", function (response) {
      console.error("❌ Payment Failed:", response.error);
      alert(
        "Payment failed: " +
          response.error.description +
          "\nReason: " +
          response.error.reason
      );
    });

    console.log("🚀 Opening Razorpay interface...");
    rzp1.open();
  } catch (error) {
    console.error("❌ Error in payment process:", error);
    alert("Something went wrong!");
  }
});  

document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Booking Confirmed. Thank you for choosing Boulevard9!");
});

document.addEventListener("DOMContentLoaded", function () {
  let checkin = document.getElementById("checkin");
  let checkout = document.getElementById("checkout");

  let today = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  let formatDate = (date) => {
    let yyyy = date.getFullYear();
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  checkin.value = formatDate(today);
  checkout.value = formatDate(tomorrow);

  checkin.addEventListener("change", function () {
    let selectedDate = new Date(checkin.value);
    selectedDate.setDate(selectedDate.getDate() + 1);
    checkout.value = formatDate(selectedDate);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  let checkin2 = document.getElementById("checkin2");
  let checkout2 = document.getElementById("checkout2");

  let today = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  let formatDate = (date) => {
    let yyyy = date.getFullYear();
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  checkin2.value = formatDate(today);
  checkout2.value = formatDate(tomorrow);

  checkin2.addEventListener("change", function () {
    let selectedDate = new Date(checkin2.value);
    selectedDate.setDate(selectedDate.getDate() + 1);
    checkout2.value = formatDate(selectedDate);
  });
});

document.addEventListener("DOMContentLoaded", function () {
// Select all room dropdown options
const roomOptions = document.querySelectorAll(".room-option");

roomOptions.forEach(option => {
    option.addEventListener("click", function (event) {
        event.preventDefault();

        let selectedRooms = parseInt(this.getAttribute("data-rooms"));
        let pricePerRoom = parseFloat(this.getAttribute("data-price"));
        let taxAmount = 5000; // Fixed tax amount
        let totalRoomPrice = selectedRooms * pricePerRoom;
        let subtotal = totalRoomPrice + taxAmount;

        // Update the displayed room count
        document.getElementById("selectedRoomsText").textContent = selectedRooms;

        // Update the displayed prices
        document.getElementById("roomPrice").textContent = `INR ${totalRoomPrice.toFixed(2)}`;
        document.getElementById("subtotal").textContent = `INR ${subtotal.toFixed(2)}`;

        // Update hidden input fields for form submission
        let form = document.querySelector("form");
        form.querySelector("#selectedRooms").value = selectedRooms;
        form.querySelector("#totalPrice").value = subtotal;
    });
});
});
