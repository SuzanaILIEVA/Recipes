import { Search } from "./js/api.js";
import { controlBtn, elements, getFromLocal, setLocalStorage } from "./js/helpers.js";
import { Recipe } from "./js/recipe.js";
import { renderBasketItems, renderLoader, renderResult } from "./js/ui.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';  // essiz id olusturur

const recipe = new Recipe ()
let basket = getFromLocal("basket")|| []

// sayfanin yuklenme anini izler
document.addEventListener("DOMContentLoaded", () => {
    renderBasketItems(basket)
    controlBtn(basket)
})
 
const handleSubmit = async (e) => {
    e.preventDefault()
    
   const query = elements.searchInput.value       // inputun icindeki degeri alip bir degiskene aktardik
  
   // inputun icerisi bos ise alert ile ekrana bildirim gonderdik ve 
   //fonksiyonu durdurmak icin return kullandik
   if(query ===""){
    alert("Please enter a food name!")
   return
   } 
  
   // inputun icinde deger girildiginde calisir.
   if(query){
    const search = new Search(query);          //search class'inin bir ornegini olusturduk ve search degiskenine atadik

  
  
   renderLoader(elements.resultsList)           // inputa veri girdiigimizde loading amblemini calistirir.
             
  
   try{     

        await search.getResult()                // try - catch yapisi ile Search classi icinde bulunan getResult methodu ile API'ye istek attik 
        // console.log(search.result)
        renderResult(search.result)            // sonuclari ekrana yansitmak icin renderResult fonksiyonunun icine search.result'u parametre olarak verdik
  
       
    }
   catch(error){
    console.log (error)
   }

  
} }


const controlRecipe =async () => {
    // console.log(location.hash.replace("#",""))

    const id = location.hash.replace("#","")     // url'deki hash'a erisip replace ile # yerine bos bir yapi ekledik ve id degiskenine aktardik.

    if(id){
       
        try{
            await recipe.getRecipe(id);
            recipe.renderRecipe(recipe.info)
        }catch (error){
            console.log(error)
        }
    }
}

elements.form.addEventListener("submit", handleSubmit)

// eklenilen hash yapisi her degistiginde calisir,
window.addEventListener("hashchange", controlRecipe)

// load tum sayfa yuklendikten sonra calisir.
window.addEventListener("load" ,controlRecipe)

// yukaridaki iki yapiyi yazmanin diger yolu dizi yontemi
// ["hashchange", "load"].forEach((event)=>
//      window.addEventListener(event,controlRecipe))

const handleClick = (e) => {
    // console.log("tiklandi")
    // console.log(e.target.id)

   if(e.target.id === "add-to-basket"){
    // console.log("sepete tiklanildi ")
    // ingredients dizisini doner, her dondugu eleman icin yeni bir obje olusturur ve bu icerisinde id olusturur
    // olusturdugumuz her objeyi basket dizisine push methodu ile ekledik
    recipe.ingredients.forEach((title) => {
        const newItem = {
            id:uuidv4(),
            title,

        }
        // ingredians'i basket dizisine ekleme
        basket.push(newItem)
        // console.log(basket)
    })
        setLocalStorage("basket" ,basket)  // sepeti locale kaydetme 

        renderBasketItems(basket)   // ekrana sepet elemanlarini basar
        controlBtn(basket)
   }

   // tikladigimiz etiketin id'si like-btn ise begenilme islemini gerceklestirir.
    if(e.target.id === "like-btn"){
        recipe.controlLike()
    }
}

// sepete ekle butonuna ve like butonuna tiklanma olaylarini izler
elements.recipeArea.addEventListener("click" , handleClick)

const deleteItem = (e) => {
    //basketList alanindaki elemanlardan id'si delete-item olan calisir
    if (e.target.id === "delete-item"){
       const parent = e.target.parentElement  // x buyonunun kapsayicisina erismek icin parentElement yontemin kullandik

   basket = basket.filter((i) => i.id !== parent.dataset.id)   // secilen urunu diziden kaldirmak icin dataset ozelligi ile id'sine eristik.
                                                               //bu id'sini bildigimiz urunu basket dizisinden filter yontemi ile kaldirdik
   console.log(basket)
   setLocalStorage("basket",basket)      //locali gunceller
   parent.remove()                       // sayfadan parent etiketini kaldirir kaldirir
    
   controlBtn(basket)
}
    
}
// basketList alanina tiklanildiginda deleteItem fonksiyonu calisir
elements.basketList.addEventListener("click", deleteItem)



    const handleClear = ()=>{
     const res =   confirm("Your cart will be cleared! Are you sure?")
     
     // res true gelirse confirm onaylanirsa calisir
     if(res){
        setLocalStorage("basket", null)     //locali temizle
        basket = []                         //sepet dizisini temizle
        controlBtn(basket)                  //clear cart butonunu ortadan kaldirir
        elements.basketList.innerHTML ="";    //basket list alanini guncelledik 
     }

    }
    // clear cart butonuna tiklanma olayini izler
elements.clearBtn.addEventListener("click", handleClear)