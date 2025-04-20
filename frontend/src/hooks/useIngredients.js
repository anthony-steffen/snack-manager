// src/hooks/useIngredients.js
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";

export function useIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const [formData, setFormData] = useState({ name: "", unitPrice: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const toast = useToast();

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
