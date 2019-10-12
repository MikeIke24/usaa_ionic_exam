import {FoodItemFromSearch} from './food-item-from-search.model';

export interface FoodSearchResponse {
    foodSearchCriteria: FoodSearchCriteria;
    totalHits: number;
    currentPage: number;
    totalPages: number;
    foods: FoodItemFromSearch[];
}

interface FoodSearchCriteria {
    generalSearchInput: string;
    pageNumber: number;
    requiredAllWords: boolean;
}
