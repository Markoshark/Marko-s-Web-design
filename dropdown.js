// dropdown.js
document.addEventListener("DOMContentLoaded", function() {
    // Select the hamburger menu button and dropdown content
    var hamburger = document.querySelector('.hamburger-menu');
    var dropdownContent = document.querySelector('.dropdown-content');

    // Toggle dropdown on click
    hamburger.addEventListener('click', function(event) {
        // Prevent clicks on the hamburger from being captured by the document listener
        event.stopPropagation();
        // Toggle the display CSS property
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
    });

    // Close the dropdown if clicking outside of it
    document.addEventListener('click', function() {
        dropdownContent.style.display = 'none';
    });

    // Optional: Prevent clicks within the dropdown from closing it
    dropdownContent.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});


