export class RecipeItem {
  ingredientId: number;
  quantity: number;
}

export class Recipe {
  id: number;
  productId: number;
  createdAt: Date;
  items: RecipeItem[];
}
