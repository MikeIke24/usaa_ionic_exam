export interface FoodDetailResponse {
    foodClass: string;
    description: string;
    foodNutrients: FoodNutrient[];
}

export interface FoodNutrient {
    type: string;
    id: number;
    nutrient: Nutrient;
    amount: number;
}

export interface Nutrient {
    id: number;
    number: string;
    name: string;
    rank: number;
    unitName: string;
}
