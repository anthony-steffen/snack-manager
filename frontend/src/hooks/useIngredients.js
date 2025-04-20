import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";

export function useIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const [formData, setFormData] = useState(() => {
    const stored = localStorage.getItem("ingredientFormData");
    return stored ? JSON.parse(stored) : { name: "", unitPrice: "" };
  });

  const [isEditing, setIsEditing] = useState(() => {
    return localStorage.getItem("ingredientIsEditing") === "true";
  });

  const [editingId, setEditingId] = useState(() => {
    const id = localStorage.getItem("ingredientEditingId");
    return id ? Number(id) : null;
  });

  const toast = useToast();

  // 🔁 Persistência automática ao alterar formData
  useEffect(() => {
    localStorage.setItem("ingredientFormData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem("ingredientIsEditing", isEditing.toString());
  }, [isEditing]);

  useEffect(() => {
    if (editingId !== null) {
      localStorage.setItem("ingredientEditingId", editingId.toString());
    } else {
      localStorage.removeItem("ingredientEditingId");
    }
  }, [editingId]);

  // 🔄 Carregamento inicial
  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    try {
      const res = await fetch("http://localhost:4000/ingredients", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();
      setIngredients(data);
    } catch (err) {
      showToast("Error loading ingredients", err.message, "error");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddIngredient = async () => {
    try {
      if (!formData.name || !formData.unitPrice) {
        showToast("Please fill in all fields", "", "warning");
        return;
      }

      if (isEditing) {
        await handleUpdateIngredient();
        return;
      }

      const res = await fetch("http://localhost:4000/ingredients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          name: formData.name,
          unitPrice: parseFloat(formData.unitPrice),
        }),
      });

      if (!res.ok) throw new Error("Failed to add ingredient");

      const newIngredient = await res.json();
      setIngredients((prev) => [...prev, newIngredient]);
      resetForm();
      showToast("Ingredient added", "", "success");
    } catch (err) {
      showToast("Error adding ingredient", err.message, "error");
    }
  };

  const handleEdit = (ingredient) => {
    setIsEditing(true);
    setEditingId(ingredient.id);
    setFormData({
      name: ingredient.name,
      unitPrice: ingredient.unitPrice.toString(),
    });
  };

  const handleUpdateIngredient = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/ingredients/${editingId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({
            name: formData.name,
            unitPrice: parseFloat(formData.unitPrice),
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to update ingredient");

      const updated = await res.json();
      setIngredients((prev) =>
        prev.map((i) => (i.id === updated.id ? updated : i))
      );
      resetForm();
      showToast("Ingredient updated", "", "success");
    } catch (err) {
      showToast("Error updating ingredient", err.message, "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:4000/ingredients/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      setIngredients((prev) => prev.filter((i) => i.id !== id));
      showToast("Ingredient deleted", "", "success");
    } catch (err) {
      showToast("Error deleting ingredient", err.message, "error");
    }
  };

  const resetForm = () => {
    setFormData({ name: "", unitPrice: "" });
    setIsEditing(false);
    setEditingId(null);
    localStorage.removeItem("ingredientFormData");
    localStorage.removeItem("ingredientIsEditing");
    localStorage.removeItem("ingredientEditingId");
  };

  const showToast = (title, description, status) => {
    toast({
      title,
      description,
      status,
      duration: 3000,
      isClosable: true,
    });
  };

  return {
    ingredients,
    formData,
    isEditing,
    handleInputChange,
    handleAddIngredient,
    handleEdit,
    handleUpdateIngredient,
    handleDelete,
  };
}
