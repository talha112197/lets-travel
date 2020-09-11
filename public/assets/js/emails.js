{
let emailRequestForm = document.querySelector('.email-request-form');
let alert = document.querySelector('.quote-form-alert');
let clientName = document.querySelector('.client-name');

emailRequestForm.addEventListener('submit', function(e) {
        e.preventDefault();
        fetch('http://localhost:3000/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: document.querySelector('#name').value,
                email: document.querySelector('#email').value,
                phoneNumber: document.querySelector('#phone').value,
                message: document.querySelector('#message').value
            })
        }).then( (response) => response.text())
        .then( (data) =>  { 
            emailRequestForm.reset();
            alert.classList.remove('d-none');
            
        })
});

}