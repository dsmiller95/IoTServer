import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';


import { REFRESH_TEMPS } from '../store/temp/temp.actions';

@Component({
  selector: 'app-temperature',
  templateUrl: 'temperature.component.html'
})
export class TemperatureComponent {

	public temps: Observable<[{time: number, temp: number}]>;
	public tempData: number[][] = [[0, 0]];
	public maxDataGap: number = 1800000; //30 * 60 * 1000; 30 minutes

	public graphTitle: string;

	constructor(private http: Http, private store: Store<{}>){
		this.temps = store.select('temps') as Observable<[{time: number, temp:number}]>;


		this.temps.subscribe((value) => {
			if(value.length <= 0){
				value.push({time: 0, temp: 0});
			}
			/*while(this.tempData.length > 0){
				this.tempData.pop();
			}*/
			var data = [];
			for(var i = 0; i < value.length; i++){
				data.push([value[i].time, value[i].temp]);
			}
			this.tempData = data;
		});


		this.graphTitle = "Temperature";

		/*http.get('/api/public/records')
		.map((response: Response) => response.json())
		.subscribe(response => {
			this.temps = response;
		});*/
		this.store.dispatch({
			type: REFRESH_TEMPS,
			payload: {}
		});

		Observable.interval(5000).subscribe((count) => {
			this.store.dispatch({
				type: REFRESH_TEMPS,
				payload: {}
			});
		});

	}


}
