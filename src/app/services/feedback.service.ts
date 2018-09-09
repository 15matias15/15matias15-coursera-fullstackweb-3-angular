import { Injectable } from '@angular/core';
import { Feedback } from '../shared/feedback';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Restangular } from 'ngx-restangular';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  constructor(private restangular: Restangular) {}

  submitFeedback(feedback: Feedback): Observable<Feedback[]> {
    return this.restangular.all('feedback').post(feedback);
  }
}
