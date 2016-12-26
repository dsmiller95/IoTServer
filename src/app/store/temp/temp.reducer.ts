import { Action, ActionReducer } from '@ngrx/store';
import { TEMPS_SUCCESS } from './temp.actions';

export interface ITemp {
  time: number;
  temp: number;
}

export const tempReducer: ActionReducer<ITemp[]> = (state: Array<ITemp> = [], action: Action): ITemp[] => {

  switch (action.type) {

    case TEMPS_SUCCESS:
      var current: {[time: number]: number} = {};
      for(var tmp of state){
        current[tmp.time] = tmp.temp;
      }

      for(var temp of action.payload){
        current[temp.time] = temp.temp;
      }
      var newTemps: ITemp[] = new Array<ITemp>();
      for(var time in current){
        newTemps.push({'time': parseInt(time), 'temp': current[time]});
      }

      newTemps.sort((a: ITemp, b: ITemp) => {
        return a.time - b.time;
      })

      return newTemps;
    default:
      return state;
  }
};
