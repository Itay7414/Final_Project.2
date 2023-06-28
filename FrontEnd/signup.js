function submitForm() {
    const form = document.getElementById('signup-form');
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the form data
        const username = document.getElementById('userName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Create an object with the form data
        const formData = {
            username: username,
            email: email,
            password: password
        };

        // Send the form data to the server
        fetch('/users/signUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data); // Handle the success response
                // Optionally, redirect to a different page or show a success message
            })
            .catch(error => {
                console.error(error); // Handle the error response
                // Display an error message to the user
            });
    });
}