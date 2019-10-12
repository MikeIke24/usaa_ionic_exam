import {CRUDStore} from '../core/stores/crud-store/crud-store';
import {Injectable} from '@angular/core';
import {FoodService} from '../services/food.service';
import {FoodSearchRequest} from '../models/foods/food-search-request.model';
import {Subscription} from 'rxjs';
import {first} from 'rxjs/operators';
import {NotificationService} from '../services/notification.service';
import {FoodItemFromSearch} from '../models/foods/food-item-from-search.model';

@Injectable({
    providedIn: 'root'
})
export class FoodSearchStore extends CRUDStore<FoodItemFromSearch> {
    constructor(private foodService: FoodService, private notification: NotificationService) {
        super();
    }

    searchForFood(request: FoodSearchRequest) {
        this.startLoading();
        let sub: Subscription;
        sub = this.foodService.foodSearch(request).pipe(
            first(),
        )
            .subscribe(res => {
                this.setEntitiesAndPaging(res);
                this.doneLoading();
                if (!!sub) {
                    sub.unsubscribe();
                }
            }, err => {
                this.doneLoading();
            });
    }
}
