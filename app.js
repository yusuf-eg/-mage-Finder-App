const fromWrapper = document.querySelector(".form-wrapper")
const form = document.querySelector("#form")
const serachInput = document.querySelector("#searchInput")
const buttonWrapper = document.querySelector(".button-wrapper")
const searchButton = document.querySelector(".searchButton")
const clearButton = document.querySelector(".clearButton")
const imageListener = document.querySelector(".imageListeners")

runEventListener();

function runEventListener(){
    form.addEventListener("submit" , search)
    clearButton.addEventListener("click", clear)
    document.addEventListener("DOMContentLoaded",()=>{
    
        changeBackgoroundImage();
        setInterval(changeBackgoroundImage,5000);
   
})
}

function clear (){
    serachInput.value= "";
    // Array.from(imageListener.children).forEach((child)=>{
    //     child.remove();
    // })
    imageListener.innerHTML = "";
}



function search(e){
    const value = serachInput.value.trim();
    
    fetch(`https://api.unsplash.com/search/photos?query=${value}`,{
    method : "GET",
    headers :{
        Authorization: "Client-ID h2ooRQciv_DIbQBZFs3CE4LtM5o3DqjQGcrgm93Ah94"
    }
    })
    .then((res)=>res.json())
    .then((data)=>{
        
        Array.from(data.results).forEach((image) => {
            addİmageToUI(image.urls.small)
        });


    })
    .catch((err)=>console.log(err))

    e.preventDefault();
    
}


function addİmageToUI(url){
    const div = document.createElement("div")
    div.className = "card"

    const img = document.createElement("img")
    img.setAttribute("src", url)
    img.height = "400"
    img.width = "400"

    div.appendChild(img)
    imageListener.appendChild(div)
}

const backgroundImageUrls = [
    'resim1.jpg',
    'resim2.jpg',
    'resim3.jpg',
    'background.jpg'
];

function getRandomImageUrl(){
    const randomIndex = Math.floor(Math.random()* backgroundImageUrls.length)
    return backgroundImageUrls[randomIndex]
}

function changeBackgoroundImage(){
    const randomImageUrl = getRandomImageUrl();
    const backgroundElement = document.querySelector(".background")
    backgroundElement.style.backgroundImage = `url(${randomImageUrl})`
}

