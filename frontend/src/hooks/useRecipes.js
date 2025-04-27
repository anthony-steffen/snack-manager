import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";

const initialFormData = {
  productId: "",
  categoryId: "",
  validity: "",
  yield: "",
  description: "",
  wastePercentage: "",
  markupPercentage: "",
};


export const useRecipes = () => {
  const toast = useToast();

  const [formData, setFormData] = useState(initialFormData);
  const [items, setItems] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  // Atualiza o total toda vez que um ingrediente é adicionado ou removido
  useEffect(() => {
    const calculateTotal = () => {
      const total = items.reduce((acc, item) => {
        const ingredient = ingredients.find(i => i.id === Number(item.ingredientId));
        if (!ingredient) return acc;
        return acc + ingredient.unitPrice * parseFloat(item.quantity || 0);
      }, 0);
      setTotalCost(total);
    };
    calculateTotal();
  }, [items, ingredients]);

  // Formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddItem = () => {
    setItems((prev) => [...prev, { ingredientId: "", quantity: "", unit: "" }]);
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const handleRemoveItem = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  };

  const handleSubmit = async () => {
    try {
      if (!formData.productId || !formData.categoryId || !formData.validity || !formData.yield || items.length === 0) {
        toast({ title: "Preencha todos os campos obrigatórios", status: "warning" });
        return;
      }
      const res = await fetch("http://localhost:4000/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          productId: Number(formData.productId),
          categoryId: Number(formData.categoryId),
          validity: formData.validity,
          wastePercentage: Number(formData.wastePercentage),
          markupPercentage: Number(formData.markupPercentage),
          yield: Number(formData.yield),
          description: formData.description,
          items: items.map((item) => ({
            ingredientId: Number(item.ingredientId),
            quantity: Number(item.quantity),
            unit: item.unit,
          })),
        }),
      });
  
      if (!res.ok) throw new Error("Erro ao salvar receita");
  
      toast({ title: "Receita cadastrada com sucesso", status: "success" });
      setFormData(initialFormData);
      setItems([]);
    } catch (err) {
      toast({ title: "Erro", description: err.message, status: "error" });
    }
  };
  

  const fetchInitialData = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const [productsRes, categoriesRes, ingredientsRes] = await Promise.all([
        fetch("http://localhost:4000/products", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:4000/categories", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:4000/ingredients", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setProducts(await productsRes.json());
      setCategories(await categoriesRes.json());
      setIngredients(await ingredientsRes.json());
    } catch (err) {
      toast({ title: "Erro ao carregar dados", description: err.message, status: "error" });
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  return {
    formData,
    handleInputChange,
    handleSubmit,
    items,
    handleAddItem,
    handleItemChange,
    handleRemoveItem,
    products,
    categories,
    ingredients,
    totalCost,
  };
};
