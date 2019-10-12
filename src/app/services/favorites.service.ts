import {Injectable} from '@angular/core';
import {AddFavorite} from '../models/favorites/add-favorite.model';

@Injectable({
    providedIn: 'root'
})
export class FavoritesService {

    constructor() {
    }

    addFavorite(addFavorite: AddFavorite) {
        localStorage.setItem(addFavorite.fdcId.toString(), addFavorite.description);
    }

    removeFavorite(fdcId: number) {
        localStorage.removeItem(fdcId.toString());
    }
}
