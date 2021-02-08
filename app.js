 

const mealsContainer = document.getElementById('meals-container');
const mealDetailsDiv = document.getElementById("meal-details");


// foods
const getMealData = mealInput => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealInput}`;
    fetch(url)
        .then(response => response.json())
        .then(data => updateUI(data));
}


// Search Button  
const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', () => {
    const mealInput = document.getElementById('food-search').value;
    getMealData(mealInput)
})


//  Meal's Name and Ingredients
const setMealDetails = (data) => {
    const meal = data.meals[0];
    document.getElementById("meal-image").setAttribute('src', `${meal.strMealThumb}`);
    document.getElementById("meal-name").innerText = meal.strMeal;
    const ul = document.getElementById("ingredients-list");
    ul.innerHTML = "";

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`] === "")
            break;
        const li = document.createElement('li');

        const ingredientName = meal[`strIngredient${i}`];
        const ingredientMeasure = meal[`strMeasure${i}`];

        li.innerHTML = `<i class="checkbox fas fa-check-square"></i>${ingredientMeasure} ${ingredientName}`;
        ul.appendChild(li);
    }
}


//    Meal Data By Meal ID
const mealDetails = mealId => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => setMealDetails(data))
    mealDetailsDiv.style.display = 'block';
    location.href = '#meal-details'
}


//   meal information
const updateUI = mealsCollection => {

    if (mealsCollection.meals === null) {
        clearBody();
        notFoundDisplay('block');
    }
    else {
        clear();

        mealsCollection.meals.forEach(singleMeal => {

            const singleMealDiv = document.createElement('div');
            singleMealDiv.className = "mealDisplay";

            const mealName = singleMeal.strMeal;
            const mealImage = singleMeal.strMealThumb;
            const mealId = singleMeal.idMeal;

            const singleMealInfo = `
            <img src="${mealImage}"/>
            <div class="d-flex justify-content-center align-items-center">
                <p class="text-center mealName">${mealName}</p>
            </div>
        `
            singleMealDiv.innerHTML = singleMealInfo;
            mealsContainer.appendChild(singleMealDiv);

            singleMealDiv.addEventListener('click', () => {
                mealDetails(mealId);
            });

        });
    }
}


// None Result Display Message 
const noneResultDisplay = displayValue => {
    document.getElementById("no-result").style.display = displayValue;
}


//   unnecessary element remove
const clear = () => {
    noneResultDisplay('none');
    mealsContainer.innerHTML = "";
    mealDetailsDiv.style.display = 'none';
}