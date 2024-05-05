import { elements, getFromLocal, setLocalStorage } from "./helpers.js";

export class Recipe {
    constructor(){
        this.info = {}                                    // tarif hakkinda tum bilgiler
        this.ingredients = []                            // tarifin icerigi 
        this.likes = getFromLocal("likes") || [];

        this.renderLikes()
    }

    async getRecipe(id){
        // console.log(id)

        // tarif bilgilerini almak icin tekrar api'ye istek attik
        const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`)
        const data = await res.json()
        this.info = data.data.recipe;
        this.ingredients = data.data.recipe.ingredients;

        // console.log(data)
    }


    createIngredients(){
       const html =  this.ingredients.map((ingredient) => 
            `
            <li>
                <i class="bi bi-check-circle"></i>
                <p> ${ingredient.description}</p>
            </li>
            `
        ).join("")
        return html 
    }


    renderRecipe(recipe){
        // console.log(recipe)
        const markup = `
        <figure>
        <img src="${recipe.image_url}" alt="">
        <h1>${recipe.title}</h1>
        <p class="like-area">
            <i class="bi ${this.isRecipeLike() ? "bi-heart-fill" : "bi-heart"}" id="like-btn"></i>
        </p>
    </figure>
    <div class="ingredients">
        <ul>
           ${this.createIngredients()}
        </ul>
        <button id="add-to-basket">
           <i class="bi bi-cart-fill"></i> <span>Add To Cart</span>
        </button>
    </div>

    <div class="directions">
       <h2> How to Cook...</h2>
       <p>This recipe has been carefully prepared and tested by <span>${recipe.publisher}</span>. You can access other details on their website.</p>
       <a href="${recipe.source_url}" target="_blank">Instruction</a>
    </div>
        `;

        elements.recipeArea.innerHTML = markup;
    }

    // urun daha onceden begenilmis mi kontrol eder.
    isRecipeLike (){
       const found =  this.likes.find((i) => i.id === this.info.id)
       return found
    }


    renderLikes(){
       const html =  this.likes.map((item)=>`
        <a href="#${item.id}">
                <img src="${item.img}" alt="" width="50" />
                <p>${item.title}</p>
              </a>`
            ).join("")
            elements.likeList.innerHTML = html;
    }



    // like olaylarini kontrol eder
    controlLike(){
        // begenilen urunun ihtiyacimiz olan degerlerini alma
        const newObject = {
            id: this.info.id,
            img:this.info.image_url,
            title: this.info.title,
        }
            // eleman daha once eklenmisse calisir
        if(this.isRecipeLike()){
           this.likes =  this.likes.filter((i) => i.id !== newObject.id)
           console.log(this.likes)
        }else{
            // daha once diziye eklenmemis urunu push methodu ile ekledik
            this.likes.push(newObject)
            console.log(this.likes)
        }

        setLocalStorage("likes",this.likes)
        this.renderRecipe(this.info)
        this.renderLikes()
    }
}