import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import {
  REFRESH_TEMPS, TEMPS_FAIL, TEMPS_SUCCESS, NEW_TEMPS
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
        .catch(() => Observable.of(({ type: TEMPS_FAIL })))
        .map((response: Response) => response.json())
        .map((response) => ({type: TEMPS_SUCCESS, payload: response}));
    });

  @Effect()
  newTempScope$ = this.actions$
    .ofType(NEW_TEMPS)
    .switchMap((action: Action) => {

      var oldest = action.payload.oldest || -1;
      var newest = action.payload.newest || -1;
      if(Math.abs(oldest - newest) < 10){
        oldest -= 5;
        newest += 5;
      }

      return this.http.get(`/api/temps/records?oldest=${oldest}&newest=${newest}`, action.payload)
        .catch(() => Observable.of(({ type: TEMPS_FAIL })))
        .map((response: Response) => response.json())
        .map((response) => ({type: TEMPS_SUCCESS, payload: response}));
    });

  constructor(private actions$: Actions, private http: Http) {}
}
