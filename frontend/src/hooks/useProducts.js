import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    categoryId: "",
    description: "",
    price: "",
    imgUrl: "",
    stock: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const toast = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:4000/products", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      showToast("Error loading products", err.message, "error");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      code: "",
      name: "",
      categoryId: "",
      description: "",
      price: "",
      imgUrl: "",
      stock: "",
    });
  };

  const handleAddProduct = async () => {
    try {
      const res = await fetch("http://localhost:4000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          ...formData,
          code: Number(formData.code),
          price: parseFloat(formData.price),
          stock: Number(formData.stock),
          categoryId: Number(formData.categoryId),
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to add product");
      }

      const newProduct = await res.json();
      setProducts((prev) => [...prev, newProduct]);
      showToast("Product added successfully", "", "success");
      resetForm();
    } catch (err) {
      showToast("Error adding product", err.message, "error");
    }
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setEditingId(product.id);
    setFormData({
      code: product.code.toString(),
      name: product.name,
      categoryId: product.category?.id?.toString() || "",
      description: product.description || "",
      price: product.price.toString(),
      imgUrl: product.imgUrl || "",
      stock: product.stock.toString(),
    });
  };

  const handleUpdateProduct = async () => {
    try {
      const res = await fetch(`http://localhost:4000/products/${editingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          ...formData,
          code: Number(formData.code),
          price: parseFloat(formData.price),
          stock: Number(formData.stock),
          categoryId: Number(formData.categoryId),
        }),
      });

      if (!res.ok) throw new Error("Failed to update product");

      const updated = await res.json();
      setProducts((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p))
      );
      showToast("Product updated successfully", "", "success");
      resetForm();
    } catch (err) {
      showToast("Error updating product", err.message, "error");
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!id) {
      showToast("Erro", "ID do produto não informado", "error");
      return;
    }

    try {
      const res = await fetch(`http://localhost:4000/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!res.ok) throw new Error("Erro ao deletar o produto");

      setProducts((prev) => prev.filter((p) => p.id !== id));
      showToast("Produto deletado com sucesso", "", "success");
    } catch (err) {
      showToast("Erro ao deletar", err.message, "error");
    }
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
    products,
    formData,
    isEditing,
    handleInputChange,
    handleAddProduct,
    handleEdit,
    handleUpdateProduct,
    handleDeleteProduct,
  };
}
