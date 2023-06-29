// $(document).ready(function () {
//     $('#signInForm').submit(function (event) {
//         event.preventDefault(); // Prevent the form from submitting normally

//         const username = $('#userName').val();
//         const password = $('#password').val();

//         // Send a POST request to the server
//         $.ajax({
//             type: 'POST',
//             url: '/users/signIn', // Update the URL if necessary
//             data: { username: username, password: password }, // Send the data as an object
//             success: function (response) {
//                 // Handle the successful sign-in response
//                 console.log(response);

//                 if (response.exists && response.correctPassword) {
//                     // User exists and password is correct
//                     // Store the user session or token in a cookie
//                     document.cookie = 'session=' + response.sessionToken + '; path=/'; // Example code, modify as per your session management

//                     // Redirect to a new page or perform other actions
//                     window.location.href = '/dashboard'; // Example redirect, modify as per your application's routes
//                 } else if (!response.exists) {
//                     // User does not exist
//                     displayErrorMessage('User does not exist.');
//                 } else {
//                     // Password is incorrect
//                     displayErrorMessage('Incorrect password.');
//                 }
//             },
//             error: function (error) {
//                 // Handle the error response
//                 console.error(error.responseJSON.error);
//                 displayErrorMessage('An error occurred. Please try again later.');
//             },
//         });
//     });

//     function displayErrorMessage(message) {
//         $('.error-message').text(message);
//     }
// });



$(document).ready(function () {
    $('#signInForm').submit(function (event) {
        event.preventDefault(); // Prevent the form from submitting normally
        const username = $('#username').val();
        const password = $('#password').val();
        // Send a POST request to the server
        $.ajax({
            type: 'POST',
            url: '/users/signIn', // Update the URL if necessary
            data: { username: username, password: password }, // Send the data as an object
            success: function (response) {
                // Handle the successful sign-in response
                console.log(response);
                if (response.exists && response.correctPassword) {
                    // User exists and password is correct
                    // Store the user session or token in a cookie
                    document.cookie = 'session=' + response.sessionToken + '; path=/'; // Example code, modify as per your session management
                    document.cookie = 'username=' + username + '; path=/'; // Store the username in a cookie
                    // Redirect to a new page or perform other actions
                    window.location.href = '/dashboard'; // Example redirect, modify as per your application's routes
                } else if (!response.exists) {
                    console.log(username);
                    // User does not exist
                    displayErrorMessage('User does not exist.');
                } else {
                    // Password is incorrect
                    displayErrorMessage('Incorrect password.');
                }
            },
            error: function (error) {
                // Handle the error response
                console.error(error.responseJSON.error);
                displayErrorMessage('An error occurred. Please try again later.');
            },
        });
    });
    function displayErrorMessage(message) {
        $('.error-message').text(message);
    }
});


