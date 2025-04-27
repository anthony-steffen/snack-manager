// src/hooks/useRecipeList.js
import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";

export function useRecipeList() {
  const toast = useToast();
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Buscar todas as receitas
  const fetchRecipes = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:4000/recipes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!res.ok) throw new Error("Erro ao buscar receitas");

      const data = await res.json();
      setRecipes(data);
    } catch (err) {
      toast({
        title: "Erro ao carregar receitas",
        description: err.message,
        status: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Carregar as receitas assim que o componente montar
  useEffect(() => {
    fetchRecipes();
  }, []);

  // Quando clicar para ver detalhes
  const openRecipeDetails = (recipe) => {
    setSelectedRecipe(recipe);
  };

  // Quando fechar o modal
  const closeRecipeDetails = () => {
    setSelectedRecipe(null);
  };

  return {
    recipes,
    fetchRecipes,
    selectedRecipe,
    openRecipeDetails,
    closeRecipeDetails,
    isLoading,
  };
}
