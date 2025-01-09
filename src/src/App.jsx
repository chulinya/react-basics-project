import React, { useState } from "react";
import RecipeListPage from "../pages/RecipeListPage";
import RecipePage from "../components/RecipePage";

const App = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleBack = () => {
    setSelectedRecipe(null);
  };

  return (
    <div>
      {selectedRecipe ? (
        <RecipePage recipe={selectedRecipe} onBack={handleBack} />
      ) : (
        <RecipeListPage onRecipeSelect={handleRecipeSelect} />
      )}
    </div>
  );
};

export default App;
