import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';


import { REFRESH_TEMPS } from '../store/temp/temp.actions';

@Injectable()
export class ClientManager {

	constructor(private http: Http, private store: Store<{}>){


	}


}
