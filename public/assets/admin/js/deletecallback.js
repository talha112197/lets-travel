{
let article = document.querySelector('#v-pills-article');
let callback = document.querySelector('#v-pills-callback');
let callbackDiv = document.querySelector('.callback-table-body');
let callbackRemoveAlert = document.querySelector('.remove-callback-alert');

callbackDiv.addEventListener('click', function(e) {
     
       if(e.target.classList.contains('btn-remove')) {
           let id = e.target.parentNode.parentNode.parentNode.querySelector('.id').value;
           fetch('http://localhost:3000/callback-requests/' + id, {
               method: 'DELETE'
           }).then( (response) => response.text())
           .then( () =>  window.history.go());
       }
});

}