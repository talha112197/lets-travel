let createForm = document.querySelector('.create-post-form');
let createTitle = document.querySelector('#name');
let createCountry = document.querySelector('#country');
let createImgUrl = document.querySelector('#imageURL');
let createImgFile = document.querySelector('#CustomFile')
let createDescription = document.querySelector('#description');



createForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let text = createDescription.value;
        let data = new FormData();
        data.append('title', createTitle.value);
        data.append('country', createCountry.value);
        data.append('imageURL', createImgUrl.value);
        data.append('imageFile', createImgFile.files[0]);
        data.append('text', text);
        data.append('description',  text.slice(0, 150) + '...');
        
        fetch('http://localhost:3000/posts', {
          method: 'POST',
          
          body: data}).then( (response) => response.text()).then( (data) => window.history.go());
});

function disableInput(input1, input2) {
  if(input1.value) {
    input2.disabled = true;
  } else {
    input2.disabled = false;
  }
}

createImgUrl.addEventListener('change', function() {disableInput(this, createImgFile)});
createImgFile.addEventListener('change', function() {disableInput(this, createImgUrl)});