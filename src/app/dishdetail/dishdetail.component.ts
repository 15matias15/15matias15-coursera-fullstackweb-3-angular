import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';
import { visibility, flyInOut, expand } from '../animations/app.animations';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[@flyInOut]': 'true',
    style: 'display: block;'
  },
  animations: [flyInOut(), visibility(), expand()]
})
export class DishdetailComponent implements OnInit {
  dish: Dish;
  dishcopy = null;
  dishIds: number[];
  prev: number;
  next: number;
  commentForm: FormGroup;
  formErrors = {
    name: '',
    comment: ''
  };
  errMess: string;
  visibility = 'shown';

  validationMessages = {
    name: {
      required: 'First Name is required',
      minlength: 'First Name must be at least 2 characters long'
    },
    comment: {
      required: 'Message is required.'
    }
  };

  constructor(
    private route: ActivatedRoute,
    private _ds: DishService,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL
  ) {
    this.createForm();
  }

  ngOnInit() {
    this._ds.getDishIds().subscribe(ids => (this.dishIds = ids));
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          this.visibility = 'hidden';
          return this._ds.getDish(+params['id']);
        })
      )
      .subscribe(
        dish => {
          this.dish = dish;
          this.dishcopy = dish;
          this.setPrevNext(dish.id);
          this.visibility = 'shown';
        },
        errmess => (this.errMess = <any>errmess)
      );
  }

  setPrevNext(dishId: number) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[
      (this.dishIds.length + index - 1) % this.dishIds.length
    ];
    this.next = this.dishIds[
      (this.dishIds.length + index + 1) % this.dishIds.length
    ];
  }

  goBack(): void {
    this.location.back();
  }

  createForm() {
    this.commentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      comment: ['', Validators.required],
      rating: [5]
    });

    this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) {
      return;
    }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    const dt = new Date();
    const dateTime = dt.toISOString();
    const newComment: Comment = {
      rating: this.commentForm.get('rating').value,
      comment: this.commentForm.get('comment').value,
      author: this.commentForm.get('name').value,
      date: dateTime
    };
    this.dishcopy.comments.push(newComment);
    this.dishcopy.save().subscribe(dish => {
      this.dish = dish;
      console.log(this.dish);
    });
    this.commentForm.reset({
      name: '',
      comment: '',
      rating: 5
    });
  }
}
