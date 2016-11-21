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
	public data: number[][] = [[0, 0], [1, 0]];

	@Input()
	public maximumSpace: (number) = undefined;

	private dygraph: any;

	private timeRange: number = 14400000; //4 hours in ms


	public ngAfterViewInit() {
		this.initDygraph();
	}

	public ngOnChanges(changes: SimpleChanges){
		if('data' in changes){
			if(this.dygraph){
				var newData: [Date, number][] = [ [new Date(this.data[0][0]), this.data[0][1]] ];
				if(this.maximumSpace != undefined){
					for(var i = 1; i < this.data.length; i++){
						if(this.data[i][0] - this.data[i - 1][0] >= this.maximumSpace){
							//this.data.splice(i, 0, [this.data[i-1][0] + 1, NaN], [this.data[i][0]-1, NaN]);
							//i += 2; //skip those 2 that were just inserted
							newData.push([new Date(this.data[i-1][0] + 1), NaN]);
							newData.push([new Date(this.data[i][0] - 1), NaN]);
						}
						newData.push([new Date(this.data[i][0]), this.data[i][1]]);
					}
				}
				/*for(var i = 0; i < this.data.length; i++){
					this.data[i][0] = new Date(this.data[i][0]);
				}*/

				var t = new Date();
				this.dygraph.updateOptions({
					file: newData,
					dataWindow: [t.getTime() - this.timeRange, t.getTime()]
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
				dateWindow: [t.getTime() - this.timeRange, t.getTime()],
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
