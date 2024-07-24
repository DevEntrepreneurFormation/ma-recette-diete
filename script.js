document.addEventListener('DOMContentLoaded', () => {
    // mise a jour 
    fetchRecipes(/*mettre data en param*/);

    document.getElementById('filterForm').addEventListener('submit', function(event) {
        event.preventDefault();
        fetchRecipes();
    });
});


function fetchRecipes() {
    //recupearation valuer formulaire
    const form = document.getElementById('filterForm');
    const formData = new FormData(form)
    ;
    const category = formData.get('category');
    const glutenFree = formData.get('glutenFree') ? true : false;
    const vegan = formData.get('vegan') ? true : false;

    //preparation base url

    let apiUrl = 'https://world.openfoodfacts.org/api/v0/product/737628064502.json';

    // Ajout des parametres
    const params = [];
    if (category) {
        params.push(`i=${category}`);
    }
    if (glutenFree) {
        params.push('gluten_free=true');
    }
    if (vegan) {
        params.push('vegan=true');
    }
    if (params.length > 0) {
        apiUrl += '?' + params.join('&');
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayRecipes(data);
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
}


function displayRecipes(data) {
    const recipesContainer = document.getElementById('recipes-container');

    // on reset tous si on est en modif
    recipesContainer.innerHTML = '';

    // Simuler des données de recettes pour l'exemple
    const recipes = [
        { id: 1, title: "Salade de fruits", image: "https://via.placeholder.com/100", description: "Une délicieuse salade de fruits frais." },
        { id: 2, title: "Soupe de légumes", image: "https://via.placeholder.com/100", description: "Une soupe réconfortante aux légumes." },
        { id: 3, title: "Pâtes au pesto", image: "https://via.placeholder.com/100", description: "Des pâtes savoureuses au pesto maison." }
    ];

    //dans le storage pour la page detail
    localStorage.setItem('recipes', JSON.stringify(recipes));

    recipes.forEach(recipe => {

        const recipeElement = document.createElement('div');
        recipeElement.classList.add('recipe');
        recipeElement.addEventListener('click', () => {
            window.location.href = `detail.html?id=${recipe.id}`;
        });

        const img = document.createElement('img');
        img.src = recipe.image;
        img.alt = recipe.title;

        const title = document.createElement('div');
        title.classList.add('recipe-title');
        title.textContent = recipe.title;

        recipeElement.appendChild(img);
        recipeElement.appendChild(title);
        recipesContainer.appendChild(recipeElement);
    });
}