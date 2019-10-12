import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FoodService} from '../../services/food.service';
import {FoodDetailResponse} from '../../models/foods/food-detail-response.model';
import {FOOD_DETAIL} from '../../localstorage.keys';

@Component({
  selector: 'app-basic-report',
  templateUrl: './basic-report.page.html',
  styleUrls: ['./basic-report.page.scss'],
})
export class BasicReportPage implements OnInit, OnDestroy {
  id: number;
  foodDetails: FoodDetailResponse;
  private sub: any;

  constructor(private route: ActivatedRoute, private foodService: FoodService, private router: Router) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params.id;
      this.getFoodDetails();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getFoodDetails() {
    this.foodService.getFoodDeatiledInfo(this.id).subscribe(val => {
      this.foodDetails = JSON.parse(localStorage.getItem(FOOD_DETAIL));
    });
  }

  returnToSearch() {
    this.router.navigate(['search']);
  }
}
