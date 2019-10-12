import {Injectable} from '@angular/core';
import {Favorite} from '../models/favorites/add-favorite.model';

@Injectable({
    providedIn: 'root'
})
export class FavoritesService {

    constructor() {
    }

    addFavorite(addFavorite: Favorite) {
        localStorage.setItem(addFavorite.fdcId.toString(), JSON.stringify(addFavorite));
    }

    removeFavorite(fdcId: number) {
        localStorage.removeItem(fdcId.toString());
    }

    getFavorite(fdcId: number): Favorite {
        return JSON.parse(localStorage.getItem(fdcId.toString()));
    }

    getFavorites(): Favorite[] {
        const f = [];
        let key = 0;
        while (!!localStorage.key(key)) {
            f.push(localStorage.getItem(key.toString()));
            key++;
        }
        return f;
    }
}
