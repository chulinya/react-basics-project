import React, { useState } from "react";
import RecipeListPage from "./pages/RecipeListPage";
import RecipePage from "./components/RecipePage";

const App = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  return (
    <div>
      {selectedRecipe ? (
        <RecipePage
          recipe={selectedRecipe}
          onBack={() => setSelectedRecipe(null)}
        />
      ) : (
        <RecipeListPage
          onRecipeSelect={(recipe) => setSelectedRecipe(recipe)}
        />
      )}
    </div>
  );
};

export default App;
