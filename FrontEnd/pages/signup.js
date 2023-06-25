
$(document).ready(function () {
  $('#signup-form').submit(function (e) {
    e.preventDefault();

    // Collect form data
    var formData = {
      email: $('#email').val(),
      password: $('#password').val()
      // Add more fields as needed
    };

    // Submit the form by creating a hidden form and triggering its submission
    var hiddenForm = document.createElement('form');
    hiddenForm.style.display = 'none';
    hiddenForm.method = 'POST';
    hiddenForm.action = '/users'; // Server-side route to handle signup and store user data in the "users" collection

    // Create form fields and append them to the hidden form
    for (var key in formData) {
      if (formData.hasOwnProperty(key)) {
        var field = document.createElement('input');
        field.type = 'hidden';
        field.name = key;
        field.value = formData[key];
        hiddenForm.appendChild(field);
      }
    }

    // Append the hidden form to the document body and submit it
    document.body.appendChild(hiddenForm);
    hiddenForm.submit();
  });
});

