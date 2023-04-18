document.addEventListener("DOMContentLoaded", ()=>{
    const memeForm = document.getElementById("meme-form");
    const imgInput = document.getElementById("image-url");
    const headingInput = document.getElementById("heading-text");
    const bottomTextInput = document.getElementById("bottom-text");

// display grid
const memeGrid = document.getElementById("meme-grid");

const toggle = document.getElementById("toggleButton");
if(localStorage.getItem("toggleEnabled")){
  document.body.className = "dark";
  toggle.value = true;
}
toggle.addEventListener("change", handleToggle);
function handleToggle(){
  const {checked} = toggle;
  // console.log(checked, 'true')
  if(checked){
    localStorage.setItem("toggleEnabled", true)
  } else{
    localStorage.removeItem("toggleEnabled")
  }
document.body.className = checked ? "dark" : ""

}

// const imageUrl = 'https://media.giphy.com/media/11quO2C07Sh2oM/giphy.gif';
// const topHeading = 'This is another heading';
// const bottomHeading = 'This is bottom heading';

// console.log(memeForm, 'form')
memeForm.addEventListener("submit", handleSubmit)

function handleSubmit(e){
    e.preventDefault();

    generateMemeElement(imgInput.value, headingInput.value, bottomTextInput.value);

    console.log(e.target.previousElement, 'target');

    imgInput.value = "";
    headingInput.value = "";
    bottomTextInput.value = "";
}



function generateMemeElement(url, headline, bottomText){
    // Create memeContainer
    const memeContainer = document.createElement("div");
    memeContainer.classList.add('col-md-4', 'meme-container');
    memeContainer.innerHTML = `
      <img src="${url}" alt="Sample Meme" class="img-fluid">
      <h3 class="meme-text meme-top-text mt-3">${headline}</h3>
      <h3 class="meme-text meme-bottom-text">${bottomText}</h3>
      <button type="button" class="btn btn-outline-danger hover-button btn-lg">Delete</button>
    `;
    memeGrid.appendChild(memeContainer)
  }

})

