let postsDiv = document.querySelector('.table-body');

postsDiv.addEventListener('click', function(e) {
       if(e.target.classList.contains('btn-remove')) {
           let id = e.target.parentNode.parentNode.parentNode.querySelector('.id').value;
           fetch('http://localhost:3000/posts/' + id, {
               method: 'DELETE'
           }).then( (response) => response.text())
           .then( () =>  window.history.go() );
       }
});