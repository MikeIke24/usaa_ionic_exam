import {Component, OnInit} from '@angular/core';
import {FoodSearchStore} from '../../stores/food-search.store';
import {FoodItemFromSearch} from '../../models/foods/food-item-from-search.model';
import {FOOD_ITEMS} from '../../localstorage.keys';
import {PageableDataList} from '../../models/api/pageble-data-list';
import {AppStore} from '../../app.store';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {FavoritesService} from '../../services/favorites.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.page.html',
    styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

    constructor(
        private foodSearchStore: FoodSearchStore,
        private appStore: AppStore,
        private router: Router,
        private favorites: FavoritesService
    ) {
    }

    isMobile: Observable<boolean>;
    searchValue: string;
    foodSearchResults: FoodItemFromSearch[];
    searchMade = false;
    firstSearchComplete = false;

    ngOnInit() {
        this.isMobile = this.appStore.isMobile();
        this.foodSearchStore.loading.subscribe(loading => {
            if (!loading) {
                this.foodSearchResults = (JSON.parse(localStorage.getItem(FOOD_ITEMS)) as PageableDataList<FoodItemFromSearch>).content;
                if (this.searchMade) {
                    this.firstSearchComplete = true;
                }
                console.log(JSON.parse(localStorage.getItem(FOOD_ITEMS)));
            } else {
                this.searchMade = true;
            }
        });
    }

    search() {
        this.foodSearchStore.searchForFood({
            generalSearchInput: this.searchValue
        });
    }

    valueChange(value: any): void {
        this.searchValue = value.detail.value;
    }

    getFoodBasicReport(fdcId: number): void {
        this.router.navigate(['/basic-report', fdcId]);
    }

    addFavorite(food: FoodItemFromSearch): void {
        this.favorites.addFavorite({fdcId: food.fdcId, description: food.description});
    }

    removeFavorite(fdcId: number): void {
        this.favorites.removeFavorite(fdcId);
    }

    isAFavorite(fdcId: number): boolean {
        return !!localStorage.getItem(fdcId.toString());
    }
}
