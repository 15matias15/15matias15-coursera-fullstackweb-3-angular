import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  dish: Dish;
  constructor(
    private route: ActivatedRoute,
    private _ds: DishService,
    private location: Location
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.dish = this._ds.getDish(id);
  }

  goBack(): void {
    this.location.back();
  }
}
