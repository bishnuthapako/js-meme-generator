document.addEventListener("DOMContentLoaded", () => {
  const memeForm = document.getElementById("meme-form");
  const imgInput = document.getElementById("image-url");
  const headingInput = document.getElementById("heading-text");
  const bottomTextInput = document.getElementById("bottom-text");

  const memeGrid = document.getElementById("meme-grid");

  const toggle = document.getElementById("toggleButton");
  if (localStorage.getItem("toggleEnabled")) {
    document.body.className = "dark";
    toggle.value = true;
  }
  toggle.addEventListener("change", handleToggle);

  function handleToggle() {
    const { checked } = toggle;
    if (checked) {
      localStorage.setItem("toggleEnabled", true);
    } else {
      localStorage.removeItem("toggleEnabled");
    }
    document.body.className = checked ? "dark" : "";
  }

  displayToPage();

  memeForm.addEventListener("submit", handleSubmit);

  function handleSubmit(e) {
    e.preventDefault();

    const meme = {
      id: Date.now(),
      url: imgInput.value,
      heading: headingInput.value,
      bottomTxt: bottomTextInput.value,
    };

    generateMemeElement(meme);
    
    saveMemeToLocal(meme);

    imgInput.value = "";
    headingInput.value = "";
    bottomTextInput.value = "";
  }

  function generateMemeElement(meme) {
    const memeContainer = document.createElement("div");
    memeContainer.classList.add("col-md-4", "meme-container");
    memeContainer.innerHTML = `
      <img src="${meme.url}" alt="Sample Meme" class="img-fluid">
      <h3 class="meme-text meme-top-text mt-3">${meme.heading}</h3>
      <h3 class="meme-text meme-bottom-text">${meme.bottomTxt}</h3>
      <button type="button" data-id="${meme.id}" class="btn btn-outline-danger hover-button btn-lg">Delete</button>
    `;

    memeContainer.querySelector(".hover-button").addEventListener("click", function (e) {
      const id = e.target.dataset.id;
      handleRemoveFromLocal(id);
      e.target.parentElement.remove();
    });

    memeGrid.appendChild(memeContainer);
  }

  function saveMemeToLocal(meme) {
    const memeStore = JSON.parse(localStorage.getItem("meme") || "[]");
    memeStore.push(meme);
    localStorage.setItem("meme", JSON.stringify(memeStore));
  }

  function handleRemoveFromLocal(id) {
    const memeStore = JSON.parse(localStorage.getItem("meme") || "[]");
  //   const memeIndex = memeStore.findIndex((element) => element.id === parseInt(id));
  // if (memeIndex !== -1) {
  //   memeStore.splice(memeIndex, 1);
//     localStorage.setItem("meme", JSON.stringify(memeStore));
  // }
    const updateMeme = memeStore.filter((element) => element.id !== parseInt(id));
    localStorage.setItem("meme", JSON.stringify(updateMeme));
  }

  function displayToPage() {
    const memeStore = JSON.parse(localStorage.getItem("meme") || "[]");
    if(memeStore.length === 0){
      const memeDiv = document.querySelectorAll('.container');
      for(let divs of memeDiv){
        divs.style.display = "none"
      }
    } else {
      memeStore.forEach((element) => generateMemeElement(element));
    }
  }
});






// document.addEventListener("DOMContentLoaded", ()=>{
//     const memeForm = document.getElementById("meme-form");
//     const imgInput = document.getElementById("image-url");
//     const headingInput = document.getElementById("heading-text");
//     const bottomTextInput = document.getElementById("bottom-text");

// // display grid
// const memeGrid = document.getElementById("meme-grid");

// const toggle = document.getElementById("toggleButton");
// if(localStorage.getItem("toggleEnabled")){
//   document.body.className = "dark";
//   toggle.value = true;
// }
// toggle.addEventListener("change", handleToggle);
// function handleToggle(){
//   const {checked} = toggle;
//   // console.log(checked, 'true')
//   if(checked){
//     localStorage.setItem("toggleEnabled", true)
//   } else{
//     localStorage.removeItem("toggleEnabled")
//   }
// document.body.className = checked ? "dark" : ""

// }

// // const imageUrl = 'https://media.giphy.com/media/11quO2C07Sh2oM/giphy.gif';
// // const topHeading = 'This is another heading';
// // const bottomHeading = 'This is bottom heading';

// // console.log(memeForm, 'form')
// displayToPage()

// memeForm.addEventListener("submit", handleSubmit)

// function handleSubmit(e){
//     e.preventDefault();

//     const meme = {
//       id: Date.now(),
//       url: imgInput.value,
//       heading: headingInput.value ,
//       bottomTxt: bottomTextInput.value
//     }

//     console.log(meme.id, 'memeid')

//     saveMemeToLocal(meme)


//     generateMemeElement(meme);

//     console.log(e.target.previousElement, 'target');

//     imgInput.value = "";
//     headingInput.value = "";
//     bottomTextInput.value = "";
// }

// // url, headline, bottomText

// function generateMemeElement(meme){
//     // Create memeContainer
//     const memeContainer = document.createElement("div");
//     memeContainer.classList.add('col-md-4', 'meme-container');
//     memeContainer.innerHTML = `
//       <img src="${meme.url}" alt="Sample Meme" class="img-fluid">
//       <h3 class="meme-text meme-top-text mt-3">${meme.heading}</h3>
//       <h3 class="meme-text meme-bottom-text">${meme.bottomTxt}</h3>
//       <button type="button" data-id="${meme.id}" class="btn btn-outline-danger hover-button btn-lg">Delete</button>
//     `;
//     // const deleteButton = memeContainer.querySelector(".hover-button");
//    memeContainer.querySelector(".hover-button").addEventListener("click", function(e){
    
//     const id = e.target.dataset.id;
//     console.log(id, 'id')
//     // console.log(e, 'id')
//     handleRemoveFromLocal(id)
//     console.log(e.target.parentElement, 'target')
//     e.target.parentElement.remove();
  
//    })
//           // deleteButton.addEventListener("")

//     memeGrid.appendChild(memeContainer)
//   }

//   function saveMemeToLocal(meme) {
//     const memeStore = JSON.parse(localStorage.getItem("meme") || []);
//     memeStore.push(meme);
//     localStorage.setItem("meme", JSON.stringify(memeStore));
//   }

//   function handleRemoveFromLocal(id){
//     const memeStore = JSON.parse(localStorage.getItem("meme") || []);
//       console.log(memeStore, 'memeStore')
//       const updateMeme = memeStore.filter(element => element.id !== parseInt(id))
//       console.log(updateMeme, 'UPDATE')
//       localStorage.setItem("meme", JSON.stringify(updateMeme))
//       // localStorage.setItem(JSON.stringify("meme", updateMeme))
//   }

//   function displayToPage(){
//     const memeStore = JSON.parse(localStorage.getItem("meme") || []);
//     memeStore.forEach((element)=>generateMemeElement(element))
//   }

// })

