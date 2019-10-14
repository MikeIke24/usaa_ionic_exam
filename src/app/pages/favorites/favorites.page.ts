import {Component, OnInit} from '@angular/core';
import {FavoritesService} from '../../services/favorites.service';
import {AppStore, BasicReportAccess} from '../../app.store';
import {Observable} from 'rxjs';
import {Favorite} from '../../models/favorites/add-favorite.model';
import {Router} from '@angular/router';

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
        private appStore: AppStore,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.isMobile = this.appStore.isMobile();
        this.favorites = this.favoritesService.getFavorites();
    }

    removeFavorite(fdcId: number): void {
        this.favoritesService.removeFavorite(fdcId);
        this.favorites = this.favoritesService.getFavorites();
    }

    isAFavorite(fdcId: number): boolean {
        return !!localStorage.getItem(fdcId.toString());
    }


    getFoodBasicReport(fdcId: number): void {
        this.appStore.updateUiState({basicReportAccessedBy: BasicReportAccess.FAVORITES});
        this.router.navigate(['app/basic-report', fdcId]);
    }
}
