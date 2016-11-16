import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';


import { REFRESH_TEMPS } from '../store/temp/temp.actions';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html'
})
export class ProfileComponent {

	public temps: Observable<{}>;

	constructor(private http: Http, private store: Store<{}>){
		this.temps = store.select('temps');

		/*http.get('/api/public/records')
		.map((response: Response) => response.json())
		.subscribe(response => {
			this.temps = response;
		});*/

		Observable.interval(1000).subscribe((count) => {
			console.log(count);
			this.store.dispatch({
				type: REFRESH_TEMPS,
				payload: {}
			});
		});

	}


}
