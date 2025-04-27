import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";

export function useRecipeList() {
  const toast = useToast();

  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [validityFilter, setValidityFilter] = useState("");
  const [sortDirection, setSortDirection] = useState("asc"); // asc | desc
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(6);

  const fetchRecipes = async () => {
    try {
      const res = await fetch("http://localhost:4000/recipes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (!res.ok) throw new Error("Erro ao carregar receitas");
      const data = await res.json();
      setRecipes(data);
      setFilteredRecipes(data);
    } catch (err) {
      toast({ title: "Erro", description: err.message, status: "error" });
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    let result = [...recipes];

    // Filtro de busca por nome
    if (searchTerm) {
      result = result.filter((r) =>
        r.product?.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro de categoria
    if (categoryFilter) {
      result = result.filter((r) => r.category?.name === categoryFilter);
    }

    // Filtro de validade
    if (validityFilter) {
      result = result.filter((r) => {
        const validityDays = parseInt(r.validity) || 0;
        return validityDays <= parseInt(validityFilter);
      });
    }

    // Ordenação por preço sugerido
    result.sort((a, b) => {
      const priceA = calculateSuggestedPrice(a);
      const priceB = calculateSuggestedPrice(b);
      return sortDirection === "asc" ? priceA - priceB : priceB - priceA;
    });

    setFilteredRecipes(result);
    setCurrentPage(1); // volta para página 1
  }, [recipes, searchTerm, categoryFilter, validityFilter, sortDirection]);

  const openRecipeDetails = (recipe) => setSelectedRecipe(recipe);
  const closeRecipeDetails = () => setSelectedRecipe(null);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  const goToPage = (page) => setCurrentPage(page);

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
    allRecipes: recipes, // para listar categorias
  };
}

// Função para calcular preço sugerido
function calculateSuggestedPrice(recipe) {
  const totalIngredientCost = recipe.items.reduce((acc, item) => {
    return acc + item.ingredient.unitPrice * item.quantity;
  }, 0);

  const wasteFactor = 1 + (recipe.wastePercentage || 0) / 100;
  const markupFactor = 1 + (recipe.markupPercentage || 0) / 100;

  const costWithWaste = totalIngredientCost * wasteFactor;
  const suggestedPrice = costWithWaste * markupFactor;

  return suggestedPrice || 0;
}
