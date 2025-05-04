import { Category } from "./Category";
import { Ingredient } from "./Ingredient";


export interface RecipeItem {
  ingredient: Ingredient;
  quantity: number;
}

export interface Recipe {
  id: number;
  product: { name: string };
  category?: Category;
  validity: string;
  yield: string;
  wastePercentage?: number;
  markupPercentage?: number;
  items: RecipeItem[];
}
