document.addEventListener("DOMContentLoaded", () => {
    const addProductBtn = document.querySelector(".add-product");
    const editButtons = document.querySelectorAll(".edit-btn");
    const deleteButtons = document.querySelectorAll(".delete-btn");

    addProductBtn.addEventListener("click", () => {
        alert("Redirecting to add product page...");
        window.location.href = "add_product.html"; // Modify as needed
    });

    editButtons.forEach(button => {
        button.addEventListener("click", () => {
            alert("Editing book...");
        });
    });

    deleteButtons.forEach(button => {
        button.addEventListener("click", () => {
            if (confirm("Are you sure you want to delete this book?")) {
                alert("Book deleted!");
            }
        });
    });
});
