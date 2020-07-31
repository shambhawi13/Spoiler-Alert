$(document).ready(function() {
    // Getting references to our form and inputs
    var loginForm = $("#login-form");
    var emailInput = $("input#email-input");
    var passwordInput = $("input#password-input");

    //schedule an email alert when any one user tries to login
    $.get("/api/runScheduler").then(function(result){
        console.log(result);
    })
  
    // When the form is submitted, we validate there's an email and password entered
    loginForm.on("submit", function(event) {
      event.preventDefault();
      var userData = {
        email: emailInput.val().trim(),
        password: passwordInput.val().trim()
      };
      console.log(userData);
  
      if (!userData.email || !userData.password) {
        return;
      }
  
      // If we have an email and password we run the loginUser function and clear the form
      loginUser(userData.email, userData.password);
      emailInput.val("");
      passwordInput.val("");
    });
  
    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function loginUser(email, password) {
      $.post("/api/login", {
        email: email,
        password: password
      })
        .then(function(user) {
          console.log(user);
          window.sessionStorage.setItem("userId",user.id);
          window.location.replace("/dashboard");
          // If there's an error, log the error
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  });
  