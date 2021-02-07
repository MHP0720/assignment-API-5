const apiBase = 'https://www.themealdb.com/api/json/v1/1/search.php?';

const getMealData = meals => {
    const url = `${apiBase}f=${meals}`;
    fetch(url)
        .then(Response => Response.json())
        .then(data => updateUI(data))
}

const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', () => {
    const mealInput = document.getElementById('meal').value;
    getMealData(mealInput)
})

const updateUI = mealsCollection => {
    

    mealsCollection.meals.forEach(singleMeal => {
        const multipleMealDiv = document.getElementById('meals');

        const singleMealDiv = document.createElement('div');
        singleMealDiv.className = "mealDisplay";

        const mealName = singleMeal.strMeal || "Not Found";
        const mealImage = singleMeal.strMealThumb;

        const singleMealInfo = `
            <img src="${mealImage}"/>
            <div class="d-flex justify-content-center align-items-center">
                <p class="text-center mealName">${mealName}</p>
            </div>
        `

        singleMealDiv.innerHTML = singleMealInfo;
        multipleMealDiv.appendChild(singleMealDiv);
        
    });

    
 
}


getMealData('pasta');





const displayMealDetail = meals=>{
    const url = `https://www.themealdb.com/api/json/v1/1/categories.php${meals}`
     fetch(url)
     .then(Response => Response.json())
     .then(json => renderMealInfo(json));

    
 }

    const renderMealInfo = meal => {
        const mealDetail = document.getElementById('meals');    
         mealDetail.innerHTML = `
           <h1>${meal.name}</h1>
           <p>  ${meal.strArea}</p>
           <p>  ${meal.strCategory}</p>
            
           <p>  ${meal.strDrinkAlternate}</p>
          
   
           <p>   ${meal.strIngredient1}</p>
          
           <p>  ${meal.strIngredient2}</p>
            <p>  ${meal.strIngredient3}</p>
            <p>  ${meal.strIngredient4}</p>
            <p>  ${meal.strIngredient5}</p>
            <p>  ${meal.strIngredient6}</p>
            <p> ${meal.strIngredient7}</p>
            <p>  ${meal.strIngredient8}</p>
            <p>  ${meal.strIngredient9}</p>
            <p>  ${meal.strIngredient10}</p>
        
    `



 
}







