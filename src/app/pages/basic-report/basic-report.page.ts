import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FoodService} from '../../services/food.service';
import {FoodDetailResponse, FoodNutrient} from '../../models/foods/food-detail-response.model';
import {FOOD_DETAIL} from '../../localstorage.keys';
import {Observable, Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {AppStore, BasicReportAccess} from '../../app.store';

@Component({
    selector: 'app-basic-report',
    templateUrl: './basic-report.page.html',
    styleUrls: ['./basic-report.page.scss'],
})
export class BasicReportPage implements OnInit, OnDestroy {
    id: number;
    foodDetails: FoodDetailResponse;
    returnText$: Observable<string>;
    returnPath: string;
    destroy$ = new Subject<boolean>();
    private sub: any;

    constructor(
        private route: ActivatedRoute,
        private foodService: FoodService,
        private router: Router,
        private appStore: AppStore
    ) {
    }

    ngOnInit() {
        this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
            this.id = +params.id;
            this.getFoodDetails();
        });
        this.returnText$ = this.appStore.getUiState().pipe(map(state => {
            if (state.basicReportAccessedBy === BasicReportAccess.LOAD) {
                this.returnPath = 'search';
                return 'Go to Search';
            } else if (state.basicReportAccessedBy === BasicReportAccess.SEARCH) {
                this.returnPath = 'search';
                return 'Return to Search';
            } else if (state.basicReportAccessedBy === BasicReportAccess.FAVORITES) {
                this.returnPath = 'favorites';
                return 'Return to Favorites';
            }
        }));
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    getDetailAmount(detail: FoodNutrient) {
        let val = detail.amount;
        let unit = detail.nutrient.unitName;
        if (unit === 'mg') {
            val = val / 1000;
        } else {
            val = val / 1000000;
        }
        unit = 'g';
        return `${val} ${unit}`;
    }

    getFoodDetails() {
        this.foodService.getFoodDeatiledInfo(this.id).pipe(takeUntil(this.destroy$)).subscribe(val => {
            this.foodDetails = JSON.parse(localStorage.getItem(FOOD_DETAIL));
        });
    }

    returnToSearch() {
        this.router.navigate([`app/${this.returnPath}`]);
    }
}
