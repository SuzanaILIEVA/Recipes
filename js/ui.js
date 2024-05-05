import { elements } from "./helpers.js";

export const renderResult = (recipe) =>{
//   console.log(recipe)
elements.resultsList.innerHTML = "";       // veri geldiginde loader ableminin ekrandan gitmesi icin resultsList'in innerHTML'ini baslangicta bos yaptik.
// console.log(recipe.slice(0,10))  

recipe.slice(0,10).forEach((recipe) => {
    const markup = `
    <a href="#${recipe.id}" class="result-link">
        <img src="${recipe.image_url}"  width="50" alt="" />

      <div class="data">
         <h4>${recipe.title}</h4>
        <p>${recipe.publisher}</p>
      </div>
    </a>
    `;

   // olusturdugumuz HTML'i  .result un icine  gonderme
//    elements.resultsList.innerHTML += markup;     1.yol
    elements.resultsList.insertAdjacentHTML("beforeend",markup)  //2.yol
})
 
}

export const renderLoader = (parent) =>{
    // console.log(parent)
    parent.innerHTML = "";
    const loader = `
    <div class="loader">
        <img src="./../images/foodGif.gif"/>
    </div>    
    `;

    parent.insertAdjacentHTML("afterbegin",loader)   // loaderi html elemaninin icine gonderme afterbegin kapsayicinin basina ekler beforebegin sonuna ekler

}

export const renderBasketItems = (items) => {
   const markup = items.map(item =>
         `
    <li data-id=${item.id}>
    <i id="delete-item" class="bi bi-x"></i>
    <span>${item.title.description}</span>
</li>`
 ).join("")
    elements.basketList.innerHTML = markup
}