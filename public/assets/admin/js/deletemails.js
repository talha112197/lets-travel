{
   
    let emailsDiv = document.querySelector('.emails-div');
    
    emailsDiv.addEventListener('click', function(e) {
         
           if(e.target.classList.contains('delete-email-btn')) {
               let id = e.target.parentNode.parentNode.querySelector('.id').value;
               fetch('http://localhost:3000/emails/' + id, {
                   method: 'DELETE'
               }).then( (response) => response.text())
               .then( () =>  window.history.go());
           }
    });
    
    }