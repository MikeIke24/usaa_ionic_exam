import {Injectable} from '@angular/core';
import {Favorite} from '../models/favorites/add-favorite.model';

interface FavoritesContainer {
    favorites: Favorite[];
}

@Injectable({
    providedIn: 'root'
})
export class FavoritesService {

    constructor() {
    }

    addFavorite(addFavorite: Favorite) {
        let favorites: FavoritesContainer = JSON.parse(localStorage.getItem('favorites'));
        if (!!favorites) {
            if (favorites.favorites.findIndex(f => f.fdcId === addFavorite.fdcId) === -1) {
                favorites.favorites.push(addFavorite);
            }
        } else {
            favorites = {favorites: []};
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    removeFavorite(fdcId: number) {
        const favorites = this.getFavoritesContainer();
        const newFavorites = favorites.favorites.filter(f => f.fdcId !== fdcId);
        favorites.favorites = newFavorites;
        this.setFavoritesContainer(favorites);
    }

    getFavorite(fdcId: number): Favorite {
        try {
            return this.getFavoritesContainer().favorites.find(f => f.fdcId === fdcId);
        } catch (e) {
            return null;
        }
    }

    getFavorites(): Favorite[] {
        const container = this.getFavoritesContainer();
        return !!container ? container.favorites : [];
    }

    getFavoritesContainer(): FavoritesContainer {
        return JSON.parse(localStorage.getItem('favorites')) as FavoritesContainer;
    }

    setFavoritesContainer(favoritesContainer: FavoritesContainer) {
        localStorage.setItem('favorites', JSON.stringify(favoritesContainer));
    }
}
