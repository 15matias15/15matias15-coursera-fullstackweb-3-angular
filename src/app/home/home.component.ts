import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMess: string;
  promErrMess: string;
  leadErrMess: string;
  constructor(
    private _ds: DishService,
    private _ps: PromotionService,
    private _ls: LeaderService,
    @Inject('BaseURL') private BaseURL
  ) {}

  ngOnInit() {
    this._ds
      .getFeaturedDish()
      .subscribe(
        dish => (this.dish = dish),
        errmess => (this.dishErrMess = <any>errmess.message)
      );
    this._ps
      .getFeaturedPromotion()
      .subscribe(
        promotion => (this.promotion = promotion),
        errmess => (this.promErrMess = <any>errmess.message)
      );
    this._ls
      .getFeaturedLeader()
      .subscribe(
        leader => (this.leader = leader),
        errmess => (this.leadErrMess = <any>errmess.message)
      );
  }
}
