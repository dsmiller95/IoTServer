import { Component, Input, ViewChild, ElementRef, AfterViewInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';

import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'dygraph',
  template: '<div #dygraph></div>'
})
export class DygraphCompenent implements AfterViewInit {

	@ViewChild('dygraph')
	private elt:ElementRef;

	@Input()
	public title:string;

	@Input()
	public data: (number | Date)[][] = [[0, 0], [1, 0]];

	private dygraph: any;


	public ngAfterViewInit() {
		this.initDygraph();
	}

	public ngOnChanges(changes: SimpleChanges){
		if('data' in changes){
			if(this.dygraph){
				var t = new Date();
				this.dygraph.updateOptions({
					file: this.data,
					dataWindow: [t.getTime() - 3600000, t.getTime()]
				});
			}
		}
	}

	private initDygraph(){
		var t = new Date();
		
		var options = {weekday: "short", month: "short", day: "numeric", hour: "2-digit", minute:"2-digit"};

		this.dygraph = new Dygraph(this.elt.nativeElement,
			this.data, {
				drawPoints: true,
				title: this.title,
				//showRoller: true,
				xlabel: '<br/><br/>Time',
				dateWindow: [t.getTime() - 3600000, t.getTime()],
				isZoomedIgnoreProgrammaticZoom: true,
				rightGap: 20,
				axes: {
					x: {
						axisLabelFormatter: function(x){
							return (new Date(x)).toLocaleTimeString("en-us", options);
						}
					},
					y: {
						axisLabelFormatter: function(x){
							return (x.toFixed(1) + '°C');
						}
					}
				}
			});
	}

	constructor(private http: Http, private store: Store<{}>){

		//this.temps = store.select('temps');
		/*http.get('/api/public/records')
		.map((response: Response) => response.json())
		.subscribe(response => {
			this.temps = response;
		});*/

		/*this.data = [];
		var t = new Date();
		for (var i = 28; i >= 0; i--) {
			var x = new Date(t.getTime() - i * 1000);
			this.data.push([x, Math.random()]);
		}*/


		/*Observable.interval(1000).subscribe((count) => {
			console.log(count);
			var x = new Date();  // current time
		    var y = Math.random();
		    this.data.push([x, y]);
		    
		    //console.log(JSON.stringify(this.data));
		    this.dygraph.updateOptions( {
		    	'file': this.data,
		        'dateWindow': [x.getTime() - 60000, x.getTime()]
		    } );
		});*/
	}
}
