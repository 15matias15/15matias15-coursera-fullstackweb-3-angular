import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { flyInOut, expand } from '../animations/app.animations';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[@flyInOut]': 'true',
    style: 'display: block;'
  },
  animations: [flyInOut(), expand()]
})
export class MenuComponent implements OnInit {
  dishes: Dish[];
  errMess: string;
  constructor(private _ds: DishService, @Inject('BaseURL') private BaseURL) {}

  ngOnInit() {
    this._ds
      .getDishes()
      .subscribe(
        dishes => (this.dishes = dishes),
        errmess => (this.errMess = <any>errmess)
      );
  }
}
