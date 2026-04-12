document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let contact = document.getElementById('contact').value;
    let password = document.getElementById('password').value;
    let dob = document.getElementById('dob').value;
    let gender = document.getElementById('gender').value;
    let address = document.getElementById('address').value;
    let city = document.getElementById('city').value;
    let pincode = document.getElementById('pincode').value;
    let hobbies = document.getElementById('hobbies').value;

    if (!name || !email || !contact || !password || !dob || !gender || !address || !city || !pincode) {
        alert('Please fill in all required fields.');
        return;
    }

    alert('Form submitted successfully!');
});
