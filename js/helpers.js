export const elements = {
    form: document.querySelector("form"),
    searchInput: document.querySelector("form input"),
    resultsList: document.querySelector( ".results"),
    recipeArea: document.querySelector(".recipe"),
    basketList : document.querySelector(".shopping ul"),
    clearBtn : document.querySelector("#clear"),
    likeList :  document.querySelector(".list"),

};

// localStorage'a veri ekleme ve guncelleme
export const setLocalStorage = (key, data )=>{
    const strData = JSON.stringify(data)       // datayi stringe cevirme

    localStorage.setItem(key, strData)        // verileri localStorage'a kaydetme   
}

export const getFromLocal = (key) => {
    // console.log(key)
    const strData = localStorage.getItem(key)      // localStrg 'dan string veriyi aldik 
    // console.log( JSON.parse(strData ) )                   
    return JSON.parse(strData )                  // aldigimiz veriyi json'a cevirip return ile disariya aktarma
}

// sepetin doluluk durumuna gore sepeti temizle butonu gorunur
export const controlBtn = (basket) =>{
    
    if (basket.length > 0 ){
        elements.clearBtn.style.display = "flex"
    }else{
        elements.clearBtn.style.display = "none"
    }

    console.log(elements.clearBtn)
}