document.addEventListener('DOMContentLoaded', () => {
    fetchRecipes();

    document.getElementById('filterForm').addEventListener('submit', function(event) {
        event.preventDefault();
        fetchRecipes(event);
    });
});

function fetchRecipes(event) {
   const checked = document.querySelector('input[name="category"]:checked').value

    console.log(checked);
 

    let apiUrl = `https://www.themealdb.com/api/json/v2/9973533/filter.php?c=${checked}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.meals && Array.isArray(data.meals)) {
                // Convertir les recettes en un format simplifié
                const recipes = data.meals.map(recipe => ({
                    idMeal: recipe.idMeal,
                    strMeal: recipe.strMeal,
                    strMealThumb: recipe.strMealThumb,
                }));

                // Sauvegarder les recettes dans localStorage
                localStorage.setItem('recipes', JSON.stringify(recipes));

                displayRecipes(recipes);
            } else {
                document.getElementById('recipes-container').textContent = 'Aucune recette trouvée.';
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
}

function displayRecipes(recipes) {
    const recipesContainer = document.getElementById('recipes-container');
    recipesContainer.innerHTML = '';

    if (!recipes) {
        recipesContainer.textContent = 'No recipes found';
        return;
    }

    recipes.forEach(recipe => {
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('card');
        recipeElement.style.width = "18rem";
        recipeElement.addEventListener('click', () => {
            window.location.href = `detail.html?id=${recipe.idMeal}`;  // Utilisation correcte de l'ID du repas
        });

        const img = document.createElement('img');
        img.classList.add('image');
        img.src = recipe.strMealThumb;
        img.alt = recipe.strMeal;

        const recipeElementBody = document.createElement('div');
        recipeElementBody.classList.add('card-body');

        const recipeElementTitle = document.createElement('h5');
        recipeElementTitle.classList.add('card-title');
        recipeElementTitle.textContent = recipe.strMeal;

        const recipeElementp = document.createElement('p');
        recipeElementp.classList.add('card-text');
        recipeElementp.textContent = '' 

        recipeElementBody.appendChild(recipeElementTitle);
        recipeElementBody.appendChild(recipeElementp);
        recipeElement.appendChild(img);
        recipeElement.appendChild(recipeElementBody);
        recipesContainer.appendChild(recipeElement);
    });
}
