import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { Recipe } from "../types/Recipe";
// export interface RecipeItem {
//   ingredient: Ingredient;
//   quantity: number;
// }

// export interface Recipe {
//   id: number;
//   product: { name: string };
//   category?: Category;
//   validity: string;
//   yield: string;
//   wastePercentage?: number;
//   markupPercentage?: number;
//   items: RecipeItem[];
// }

export function useRecipeList() {
  const toast = useToast();

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [validityFilter, setValidityFilter] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<string>("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [recipesPerPage] = useState<number>(6);

  const fetchRecipes = async () => {
    try {
      const res = await fetch("http://localhost:4000/recipes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (!res.ok) throw new Error("Erro ao carregar receitas");
      const data: Recipe[] = await res.json();
      setRecipes(data);
      setFilteredRecipes(data);
    } catch (err: any) {
      toast({ title: "Erro", description: err.message, status: "error" });
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    let result = [...recipes];

    if (searchTerm) {
      result = result.filter((r) =>
        r.product?.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter) {
      result = result.filter((r) => r.category?.name === categoryFilter);
    }

    if (validityFilter) {
      result = result.filter((r) => {
        const validityDays = parseInt(r.validity) || 0;
        return validityDays <= parseInt(validityFilter);
      });
    }

    result.sort((a, b) => {
      const priceA = calculateSuggestedPrice(a);
      const priceB = calculateSuggestedPrice(b);
      return sortDirection === "asc" ? priceA - priceB : priceB - priceA;
    });

    setFilteredRecipes(result);
    setCurrentPage(1);
  }, [recipes, searchTerm, categoryFilter, validityFilter, sortDirection]);

  const openRecipeDetails = (recipe: Recipe) => setSelectedRecipe(recipe);
  const closeRecipeDetails = () => setSelectedRecipe(null);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  const goToPage = (page: number) => setCurrentPage(page);

  return {
    recipes: currentRecipes,
    selectedRecipe,
    openRecipeDetails,
    closeRecipeDetails,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    validityFilter,
    setValidityFilter,
    sortDirection,
    setSortDirection,
    currentPage,
    totalPages,
    goToPage,
    fetchRecipes,
    allRecipes: recipes,
  };
}

function calculateSuggestedPrice(recipe: Recipe): number {
  const totalIngredientCost = recipe.items.reduce((acc, item) => {
    return acc + item.ingredient.unitPrice * item.quantity;
  }, 0);

  const wasteFactor = 1 + (recipe.wastePercentage || 0) / 100;
  const markupFactor = 1 + (recipe.markupPercentage || 0) / 100;

  const costWithWaste = totalIngredientCost * wasteFactor;
  const suggestedPrice = costWithWaste * markupFactor;

  return suggestedPrice || 0;
}
