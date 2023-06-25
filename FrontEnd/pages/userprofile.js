$(document).ready(function () {
  var profileInfoInputs = $('.profile-info input');
  var editProfileBtn = $('#edit-profile-btn');
  var saveProfileBtn = $('#save-profile-btn');
  var signUpBtn = $('#signup-btn'); // Added line: Get the "Sign up now" button

  editProfileBtn.click(function () {
    profileInfoInputs.prop('readonly', false);
    profileInfoInputs.addClass('edit-mode');
    editProfileBtn.hide();
    saveProfileBtn.show();
  });

  saveProfileBtn.click(function () {
    profileInfoInputs.prop('readonly', true);
    profileInfoInputs.removeClass('edit-mode');
    editProfileBtn.show();
    saveProfileBtn.hide();

    var firstName = $('#firstname').val();
    localStorage.setItem('firstName', firstName);

    // Perform any necessary actions to save the updated profile data
    // You can retrieve the updated values using profileInfoInputs.val()
    // and send them to the server or update them in your application

    window.location.href = 'signup.html'; // Redirect to the sign-up page
  });

  signUpBtn.click(function () {
    window.location.href = 'signup.html'; // Redirect to the sign-up page
  });
});
