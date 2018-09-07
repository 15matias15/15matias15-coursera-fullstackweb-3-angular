import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Http } from '@angular/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  constructor(
    private http: Http,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) {}

  getDishes(): Observable<Dish[]> {
    return this.http
      .get(baseURL + 'dishes')
      .pipe(
        map(res => {
          return this.processHTTPMsgService.extractData(res);
        })
      )
      .pipe(
        catchError(error => this.processHTTPMsgService.handlerError(error))
      );
  }

  getDish(id: number): Observable<Dish> {
    return this.http
      .get(baseURL + 'dishes/' + id)
      .pipe(
        map(res => {
          return this.processHTTPMsgService.extractData(res);
        })
      )
      .pipe(
        catchError(error => this.processHTTPMsgService.handlerError(error))
      );
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http
      .get(baseURL + 'dishes?featured=true')
      .pipe(
        map(res => {
          return this.processHTTPMsgService.extractData(res)[0];
        })
      )
      .pipe(
        catchError(error => this.processHTTPMsgService.handlerError(error))
      );
  }

  getDishIds(): Observable<number[] | any> {
    return this.getDishes()
      .pipe(
        map(dishes => {
          return dishes.map(dish => dish.id);
        })
      )
      .pipe(catchError(error => error));
  }
}
