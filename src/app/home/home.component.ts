import { Component, OnInit } from '@angular/core';
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
  constructor(
    private _ds: DishService,
    private _ps: PromotionService,
    private _ls: LeaderService
  ) {}

  ngOnInit() {
    this.dish = this._ds.getFeaturedDish();
    this.promotion = this._ps.getFeaturedPromotion();
    this.leader = this._ls.getFeaturedLeader();
  }
}
