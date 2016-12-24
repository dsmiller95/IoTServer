import { Action, ActionReducer } from '@ngrx/store';
import { TEMPS_SUCCESS } from './temp.actions';

export interface IFeed {
  id: string;
  text: string;
  date: string;
  comments?: Array<{}>;
}

export const tempReducer: ActionReducer<IFeed[]> = (state: Array<IFeed> = [], action: Action): IFeed[] => {

  switch (action.type) {

    case TEMPS_SUCCESS:

      return action.payload;

    default:
      return state;
  }
};
