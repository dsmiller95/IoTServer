import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import {
  REFRESH_TEMPS, REFRESH_TEMPS_FAIL, REFRESH_TEMPS_SUCCESS
} from './temp.actions';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class TempEffects {

  @Effect()
  addFeed$ = this.actions$
    .ofType(REFRESH_TEMPS)
    .switchMap((action: Action) => {
      return this.http.get('/api/temps/records', action.payload)
        .catch(() => Observable.of(({ type: REFRESH_TEMPS_FAIL })))
        .map((response: Response) => response.json())
        .map((response) => ({type: REFRESH_TEMPS_SUCCESS, payload: response}));
    });

  constructor(private actions$: Actions, private http: Http) {}
}
