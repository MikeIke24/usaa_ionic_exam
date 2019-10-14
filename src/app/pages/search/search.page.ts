import {Component, OnDestroy, OnInit} from '@angular/core';
import {FoodSearchStore} from '../../stores/food-search.store';
import {FoodItemFromSearch} from '../../models/foods/food-item-from-search.model';
import {FOOD_ITEMS} from '../../localstorage.keys';
import {PageableDataList} from '../../models/api/pageble-data-list';
import {AppStore, BasicReportAccess} from '../../app.store';
import {Observable, Subject} from 'rxjs';
import {Router} from '@angular/router';
import {FavoritesService} from '../../services/favorites.service';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-search',
    templateUrl: './search.page.html',
    styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit, OnDestroy {

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
    loading = false;
    destroy$ = new Subject<boolean>();

    ngOnInit() {
        this.isMobile = this.appStore.isMobile();
        this.foodSearchStore.loading.pipe(takeUntil(this.destroy$)).subscribe(loading => {
            if (!loading) {
                this.foodSearchResults = (JSON.parse(localStorage.getItem(FOOD_ITEMS)) as PageableDataList<FoodItemFromSearch>).content;
                if (this.searchMade) {
                    this.firstSearchComplete = true;
                }
                this.loading = false;
            } else {
                this.searchMade = true;
                this.loading = true;
            }
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
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
        this.appStore.updateUiState({basicReportAccessedBy: BasicReportAccess.SEARCH});
        this.router.navigate(['app/basic-report', fdcId]);
    }

    addFavorite(food: FoodItemFromSearch): void {
        this.favorites.addFavorite({fdcId: food.fdcId, description: food.description, brand: food.brandOwner});
    }

    removeFavorite(fdcId: number): void {
        this.favorites.removeFavorite(fdcId);
    }

    isAFavorite(fdcId: number): boolean {
        return !!this.favorites.getFavorite(fdcId);
    }
}
