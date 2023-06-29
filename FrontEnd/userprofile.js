$(document).ready(function () {
    $('#signInForm').submit(function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the form data
        var formData = $(this).serialize();

        // Perform a form submission
        this.submit();
    });
});