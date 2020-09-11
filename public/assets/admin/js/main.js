
let addPost = document.querySelector('#add-post-btn');
let article = document.querySelector('#v-pills-article');
let createPost = document.querySelector('#v-pills-createpost');
let createEmail = document.querySelector('#v-pills-mails');
let logoutBtn = document.querySelector('.logout-btn');

document.addEventListener('DOMContentLoaded', async function() {
    addPosts();
    addCallbacks();
    addEmails();
});

addPost.addEventListener('click', function() {
      article.classList.remove('show');
      article.classList.remove('active');
      createPost.classList.add('show');
      createPost.classList.add('active');
});


async function addPosts() {
  let posts = await getPosts();
  let postContent = document.querySelector('.table-body');
  let i = 1;
  postContent.innerHTML = '';

  posts.forEach((post) => {
      let postHTML = ` <tr>
      <td class="num" scope="row">${i++}</td>
      <input value="${post.id}" type="hidden" class="id">
      <td class="name">${post.title}</td>
      <td class="country">${post.country}</td>
      <td class="date"> ${post.date}</td>
      <td><button type="button" class="btn btn-edit text-danger font-weight-bold p-0">Edit</button></td>
      <td><button type="button" class="btn text-danger font-weight-bold p-0"><i class="fas btn-remove fa-times"></i></button></td>
    </tr> `;
    postContent.insertAdjacentHTML('beforeend', postHTML);
})}

async function addCallbacks() {
  let requests = await getRequests();
  let callbackContent = document.querySelector('.callback-table-body');
  let i = 1;
  callbackContent.innerHTML = '';

  requests.forEach((request) => {
      let callbackHTML = ` <tr>
      <td class="num" scope="row">${i++}</td>
      <input value="${request.id}" type="hidden" class="id">
      <td class="phoneNumber">${request.phoneNumber}</td>
      <td class="date"> ${request.date}</td>
      <td><button type="button" class="btn text-danger font-weight-bold p-0"><i class="fas btn-remove fa-times"></i></button></td>
    </tr> `;
    callbackContent.insertAdjacentHTML('beforeend', callbackHTML);

})}

async function addEmails() {

  let emails = await getEmails();
  let emailsContent = document.querySelector('.emails-div');
  let i = 1;
  emailsContent.innerHTML = '';

  emails.forEach((email) => {
      let emailsHTML = ` <div class="card emails-card p-2 mb-3">
      <div class="card-body p-2">
      <h5 class="font-weight-bold">ID: <span class="email-id bg-light">${i++}</span> </h5>
      <input value="${email.id}" type="hidden" class="id">
      <h5 class="font-weight-bold">Name: <span class="email-sender-name email-info">${email.name}</span></h5>
      <h5 class="font-weight-bold">Email: <span class="email-sender-email email-info">${email.email}</span></h5>
      <h5 class="font-weight-bold">Phone Number: <span class="email-sender-number email-info">${email.phoneNumber}</span></h5>
      <h5 class="font-weight-bold">Message: <span class="email-sender-message email-info">${email.message}</span></h5>
      
      <button type="button" class="btn btn-danger delete-email-btn">Delete</button>
      </div> <!-- card-body ends here -->
      </div> <!-- card div ends here --> `;
    emailsContent.insertAdjacentHTML('beforeend', emailsHTML);

})};

logoutBtn.addEventListener('click', function() {
  document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });

  window.location.href = '/'
})