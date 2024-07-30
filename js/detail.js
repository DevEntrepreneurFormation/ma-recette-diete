document.addEventListener('DOMContentLoaded', () => {
    displayRecipeDetail();
});

function displayRecipeDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');
    
    // Assurez-vous que `recipeId` est bien défini
    if (!recipeId) {
        console.error('Aucun ID de recette trouvé dans l\'URL.');
        return;
    }

    let apiUrl = `https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=${recipeId}`;
    console.log(apiUrl);

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.meals && Array.isArray(data.meals)) {
                // Convertir les recettes en un format simplifié
                const recipes = data.meals.map(recipe => ({
                    idMeal: recipe.idMeal,
                    strMeal: recipe.strMeal,
                    strMealThumb: recipe.strMealThumb,
                    strInstructions: recipe.strInstructions ? recipe.strInstructions : 'No description available.'
                }));

                // Sauvegarder les recettes dans localStorage
                localStorage.setItem('recipes', JSON.stringify(recipes));

                displayRecipe(recipes, recipeId);
            } else {
                document.getElementById('recipe-detail').textContent = 'Aucune recette trouvée.';
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
}

function displayRecipe(recipes, recipeId) {
    // Assurez-vous que les recettes sont correctement récupérées et analysées
    if (!recipes) {
        console.error('Aucune recette trouvée dans le localStorage.');
        return;
    }

    try {
        recipes = JSON.parse(localStorage.getItem('recipes'));
    } catch (error) {
        console.error('Erreur lors du parsing JSON des recettes:', error);
        return;
    }

    if (!Array.isArray(recipes)) {
        console.error('Les recettes ne sont pas au format tableau.');
        return;
    }

    // Trouver la recette par ID
    const recipe = recipes.find(r => r.idMeal === recipeId);
    const recipeDetailContainer = document.getElementById('recipe-detail');

    if (recipe) {
        const bandeTitleContainer = document.getElementById('bande');
        const bandeTitle = document.createElement('h2');
        bandeTitle.textContent = recipe.strMeal;
        bandeTitleContainer.appendChild(bandeTitle);

        const cardContain = document.createElement('div');
        cardContain.classList.add('card');

        const cardDetail = document.createElement('div');
        cardDetail.classList.add('card-body');

        const img = document.createElement('img');
        img.classList.add('image');
        img.src = recipe.strMealThumb;
        img.style.height = '450px';
        img.style.width = '620px';

        const title = document.createElement('h3');
        title.classList.add('card-title');
        title.textContent = recipe.strMeal;

        const description = document.createElement('p');
        description.classList.add('card-text');
        description.textContent = recipe.strInstructions;

        recipeDetailContainer.appendChild(cardContain);
        cardContain.appendChild(cardDetail);
        cardDetail.appendChild(img);
        cardDetail.appendChild(title);
        cardDetail.appendChild(description);
    } else {
        recipeDetailContainer.textContent = 'Recette non trouvée.';
    }
}
