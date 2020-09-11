let callMeForm = document.querySelector('.call-me-form');
let alert = document.querySelector('.alert-container');

document.addEventListener('DOMContentLoaded', async function() {
    let posts = await getPosts();
    let postContent = document.querySelector('.posts-row');
    postContent.innerHTML = '';

    posts.forEach((post) => {
        let postHTML = `  <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 col-12 mb-4">
        <div class="card">
             <div class="card-img-top">
                 <img src="${post.imageURL}" alt="${post.title}" class="img-fluid">
             </div>
             <div class="card-body">
                 <h4 class="card-title">${post.title}</h4>
                 <p class="card-text">${post.description}</p>
                 <a href="/place?id=${post.id}" class="btn btn-primary">Details</a>
             </div>
        </div> <!-- card ends here -->
    </div> <!-- col ends here --> `;
      postContent.insertAdjacentHTML('beforeend', postHTML);
    })
});

callMeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let phoneInp = callMeForm.querySelector('#phone-number');
    fetch('http://localhost:3000/callback-requests', {
        method: 'POST',
        headers:  {
          'Content-Type':   'application/json'
        },
        body: JSON.stringify({
            phoneNumber: phoneInp.value
        })
    }).then( (response) => response.text())
    .then( () => alert.classList.remove('d-none') );
});

