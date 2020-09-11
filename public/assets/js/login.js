let signInForm = document.querySelector('.login-form');
let registrationForm = document.querySelector('.registration-form'); 
let wrongAlert = document.querySelector('.wrong-info-alert');
let newUserAlert = document.querySelector('.new-user-alert');
let registerTab = document.querySelector('#register');
let successfulRegistration = document.querySelector('#successful-reg');


signInForm.addEventListener('submit', function(e) {
          e.preventDefault();
          let email = document.querySelector('#username').value;
          let password = document.querySelector('#password').value;
          fetch('http://localhost:3000/users/login', {
              method: 'POST',
              headers: {
                  'Content-Type' : 'application/json'
              },
              body: JSON.stringify({email, password})
          }).then( (response) => {
            if(response.status === 400) {
                throw new Error();
            }
            return response.json();
        }).then( (data) => {
              window.location.href = data.redirectURL;
              
          }).catch(() => wrongAlert.classList.remove('d-none')); 
});

registrationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let email = document.querySelector('#newusername').value;
    let password = document.querySelector('#newpassword').value;
    let confirmPassword = document.querySelector('#conf-password').value;
    if(password !== confirmPassword){
        return;
    }
    fetch('http://localhost:3000/users/register', {
              method: 'POST',
              headers: {
                  'Content-Type' : 'application/json'
              },
              body: JSON.stringify({email, password})
          }).then( (response) => response.text())
          .then( () => {
              newUserAlert.classList.remove('d-none');
              registerTab.classList.remove('show');
              registerTab.classList.remove('active');
              successfulRegistration.classList.add('show');
              successfulRegistration.classList.add('active');
            });
});