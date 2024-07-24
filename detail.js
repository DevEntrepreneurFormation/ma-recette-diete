document.addEventListener('DOMContentLoaded', () => {
    displayRecipeDetail();
});

function displayRecipeDetail() {
    //recuperation de l'ID
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = parseInt(urlParams.get('id'));

    //recuperation des ingredients
    const recipes = JSON.parse(localStorage.getItem('recipes'));
    const recipe = recipes.find(r => r.id === recipeId);

    const recipeDetailContainer = document.getElementById('recipe-detail');

    if (recipe) {
        const img = document.createElement('img');
        img.src = recipe.image;
        img.alt = recipe.title;

        const title = document.createElement('div');
        title.classList.add('recipe-title');
        title.textContent = recipe.title;

        const description = document.createElement('div');
        description.classList.add('recipe-description');
        description.textContent = recipe.description;

        recipeDetailContainer.appendChild(img);
        recipeDetailContainer.appendChild(title);
        recipeDetailContainer.appendChild(description);
    } else {
        recipeDetailContainer.textContent = 'Recette non trouvée.';
    }
}
