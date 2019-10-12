import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API_KEY} from '../../../api.key';
import {FoodSearchRequest} from '../models/foods/food-search-request.model';
import {Observable} from 'rxjs';
import {FoodSearchResponse} from '../models/foods/food-search-response.model';
import {map, tap} from 'rxjs/operators';
import {PageableDataList} from '../models/api/pageble-data-list';
import {FoodItemFromSearch} from '../models/foods/food-item-from-search.model';
import {FOOD_DETAIL, FOOD_ITEMS} from '../localstorage.keys';
import {FoodDetailResponse} from '../models/foods/food-detail-response.model';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  readonly SEARCH_ENPOINT = `https://api.nal.usda.gov/fdc/v1/search?api_key=${API_KEY}`;
  readonly DETAILS_ENPOINT = `https://api.nal.usda.gov/fdc/v1/`;
  constructor(private http: HttpClient) { }

  foodSearch(request: FoodSearchRequest): Observable<PageableDataList<FoodItemFromSearch>> {
    const body = request;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<FoodSearchResponse>(this.SEARCH_ENPOINT, body, {headers}).pipe(map(res => {
      const mappedRes: PageableDataList<FoodItemFromSearch> = {
        content: res.foods,
        page: res.currentPage,
        totalPages: res.totalPages,
        totalElements: res.totalHits,
        size: 50
      };
      localStorage.setItem(FOOD_ITEMS, JSON.stringify(mappedRes));
      return mappedRes;
    }));
  }

  getFoodDeatiledInfo(fdcId: number): Observable<FoodDetailResponse> {
    return this.http.get<FoodDetailResponse>(`${this.DETAILS_ENPOINT}/${fdcId}?api_key=${API_KEY}`).pipe(tap(res => {
      localStorage.setItem(FOOD_DETAIL, JSON.stringify(res));
    }));
  }
}
