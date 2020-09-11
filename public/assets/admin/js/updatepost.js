{
let postsDiv = document.querySelector('.table-body');
let article = document.querySelector('#v-pills-article');
let updateName = document.querySelector('#update-name');
let updateCountry = document.querySelector('#update-country');
let description = document.querySelector('#update-description')
let updatePost = document.querySelector('#v-pills-updatepost');
let updateForm = document.querySelector('.update-post-form');
let id;

postsDiv.addEventListener('click', async function(e) {
    if(e.target.classList.contains('btn-edit')) {
         id = e.target.parentNode.parentNode.querySelector('.id').value;
 
       let postInfo = await fetch('http://localhost:3000/posts/' + id)
        .then( (response) => response.json())
        .then( (data) => data)

        updateName.value = postInfo.title;
        updateCountry.value = postInfo.country;
        description.value = postInfo.text;
    


    article.classList.remove('show');
    article.classList.remove('active');
    updatePost.classList.add('show');
    updatePost.classList.add('active');
    }
})

updateForm.addEventListener('submit', function(e) {
      e.preventDefault();
      let text = description.value;

      fetch('http://localhost:3000/posts/' + id, {
             method: 'PUT',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify({
                 title: updateName.value,
                 text: text,
                 description: text.slice(0, 150) + '...'
             })
      }).then( (response) => response.text())
      .then( () => window.history.go() ); 
});
}