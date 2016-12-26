import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';


import { REFRESH_TEMPS, NEW_TEMPS } from '../store/temp/temp.actions';

import { ITemp, tempReducer } from '../store/temp/temp.reducer';

@Component({
  selector: 'app-temperature',
  templateUrl: 'temperature.component.html'
})
export class TemperatureComponent {

	public temps: Observable<[{time: number, temp: number}]>;
	public tempData: number[][] = [[0, 0]];
	public maxDataGap: number = 1800000; //30 * 60 * 1000; 30 minutes

	public graphTitle: string;
	//public graphZoomEvent: (minDate: number, maxDate: number, ranges: number[][]) => void;


	constructor(private http: Http, private store: Store<{}>){
		this.temps = store.select('temps') as Observable<[{time: number, temp:number}]>;
		
		this.temps.subscribe((value) => {
			/*if(value.length <= 0){
				value.push({time: 0, temp: 0});
			}
			/*while(this.tempData.length > 0){
				this.tempData.pop();
			}*/

			//console.log(value);

			var data = [];
			for(var i = 0; i < value.length; i++){
				data.push([value[i].time, value[i].temp]);
			}
			if(data.length == 0){
				data.push([0, 0]);
			}
			this.tempData = data;
		});

		this.store.dispatch({
			type: REFRESH_TEMPS,
			payload: {}
		});


		Observable.interval(30000).subscribe((count) => {
			this.store.dispatch({
				type: REFRESH_TEMPS,
				payload: {}
			});
		});

	}

	public graphZoomed(event: {minDate: number, maxDate: number, ranges: number[][]}){
		//console.log(event);

		this.store.dispatch({
			type: NEW_TEMPS,
			payload: {
				oldest: event.minDate,
				newest: event.maxDate
			}
		});
	}
}
