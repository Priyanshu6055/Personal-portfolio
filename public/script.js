document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();  // Prevent form submission to check data

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    console.log("Form Data:", { name, email, message });  // Check form data in console

    // You can now submit the form data using AJAX or the normal form submission
    // For now, we'll let it submit as normal:
    this.submit();
});
