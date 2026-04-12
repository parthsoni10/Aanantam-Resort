document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("registrationForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission initially

        let isValid = true; // Track overall form validity

        // Get input values
        let username = document.getElementById("username");
        let phone = document.getElementById("phone");
        let email = document.getElementById("email");
        let password = document.getElementById("password");
        let confirmPassword = document.getElementById("confirmPassword");
        let address = document.getElementById("address");

        // Get error message elements
        let usernameError = username.nextElementSibling;
        let phoneError = phone.nextElementSibling;
        let emailError = email.nextElementSibling;
        let passwordError = password.nextElementSibling;
        let confirmPasswordError = confirmPassword.nextElementSibling;
        let addressError = address.nextElementSibling;

        // Regular expressions for validation
        let usernameRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/; // At least 1 letter, 1 number, min 5 characters
        let phoneRegex = /^\d{10}$/; // Exactly 10 digits
        let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Valid email format

        // Reset all error messages
        document.querySelectorAll(".error-message").forEach(error => {
            error.textContent = "";
            error.style.visibility = "hidden";
        });

        // Username Validation
        if (!usernameRegex.test(username.value)) {
            usernameError.textContent = "Username must contain letters and numbers (min 5 characters).";
            usernameError.style.visibility = "visible";
            username.classList.add("error");
            isValid = false;
        } else {
            username.classList.remove("error");
        }

        // Phone Number Validation
        if (!phoneRegex.test(phone.value)) {
            phoneError.textContent = "Phone number must be exactly 10 digits.";
            phoneError.style.visibility = "visible";
            phone.classList.add("error");
            isValid = false;
        } else {
            phone.classList.remove("error");
        }

        // Email Validation
        if (!emailRegex.test(email.value)) {
            emailError.textContent = "Please enter a valid email address.";
            emailError.style.visibility = "visible";
            email.classList.add("error");
            isValid = false;
        } else {
            email.classList.remove("error");
        }

        // Password Match Validation
        if (password.value !== confirmPassword.value) {
            confirmPasswordError.textContent = "Passwords do not match.";
            confirmPasswordError.style.visibility = "visible";
            confirmPassword.classList.add("error");
            isValid = false;
        } else {
            confirmPassword.classList.remove("error");
        }

        // Address Length Validation
        if (address.value.length > 20) {
            addressError.textContent = "Address must not exceed 20 characters.";
            addressError.style.visibility = "visible";
            address.classList.add("error");
            isValid = false;
        } else {
            address.classList.remove("error");
        }

        // If all validations pass, submit the form
        if (isValid) {
            this.submit();
        }
    });
});
