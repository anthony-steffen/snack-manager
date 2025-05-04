export interface Product {
	id: number;
	name: string;
}

export interface Category {
	id: number;
	name: string;
}

export interface Ingredient {
	id: number;
	name: string;
  unitPrice: number;
}

export interface RecipeItem {
	ingredientId: number | string;
	quantity: number ;
	unit: string;
}

export interface RecipeFormData {
	productId: number | string;
	categoryId: number | string;
	description: string;
	yield: number | string;
	validity: string;
	wastePercentage: number | string;
	markupPercentage: number | string;
}
  