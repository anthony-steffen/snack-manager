import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { Category } from "../types/Category";

// export interface Category {
//   id: number;
//   name: string;
// }

export function useCategories() {
  const toast = useToast();
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:4000/categories", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (!res.ok) throw new Error("Erro ao carregar categorias");
      const data: Category[] = await res.json();
      setCategories(data);
    } catch (err: any) {
      toast({ title: "Erro", description: err.message, status: "error" });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, fetchCategories };
}
