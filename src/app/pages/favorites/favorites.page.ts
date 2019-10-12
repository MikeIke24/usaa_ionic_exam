import {Component, OnInit} from '@angular/core';
import {FavoritesService} from '../../services/favorites.service';
import {AppStore} from '../../app.store';
import {Observable} from 'rxjs';
import {Favorite} from '../../models/favorites/add-favorite.model';
import {FoodItemFromSearch} from '../../models/foods/food-item-from-search.model';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.page.html',
    styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

    isMobile: Observable<boolean>;
    favorites: Favorite[] = [];

    constructor(
        private favoritesService: FavoritesService,
        private appStore: AppStore
    ) {
    }

    ngOnInit() {
        this.isMobile = this.appStore.isMobile();
        this.favorites = this.favoritesService.getFavorites();
    }

    addFavorite(food: FoodItemFromSearch): void {
        this.favoritesService.addFavorite({fdcId: food.fdcId, description: food.description, brand: food.brandOwner});
    }

    removeFavorite(fdcId: number): void {
        this.favoritesService.removeFavorite(fdcId);
    }

    isAFavorite(fdcId: number): boolean {
        return !!localStorage.getItem(fdcId.toString());
    }
}
