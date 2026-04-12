// document.addEventListener("DOMContentLoaded", function() {
//     const searchBar = document.querySelector(".search-bar");
//     const userRows = document.querySelectorAll(".user-list tbody tr");

//     searchBar.addEventListener("input", function() {
//         const searchValue = searchBar.value.toLowerCase();
//         userRows.forEach(row => {
//             const userName = row.cells[1].textContent.toLowerCase();
//             if (userName.includes(searchValue)) {
//                 row.style.display = "table-row";
//             } else {
//                 row.style.display = "none";
//             }
//         });
//     });

//     document.querySelectorAll(".delete-btn").forEach(button => {
//         button.addEventListener("click", function() {
//             if (confirm("Are you sure you want to delete this user?")) {
//                 this.closest("tr").remove();
//             }
//         });
//     });
// });