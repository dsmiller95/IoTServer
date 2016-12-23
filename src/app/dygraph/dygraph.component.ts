import { Component, Input, ViewChild, ElementRef, AfterViewInit, SimpleChanges,
	Output, EventEmitter } from '@angular/core';
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

	@Output()
	public onZoom: EventEmitter<any>;

	private dygraph: any;

	private timeRange: number = 14400000; //4 hours in ms



	constructor(private http: Http, private store: Store<{}>){
 		this.onZoom = new EventEmitter();
	}

	public ngAfterViewInit() {
		this.initDygraph();
	}

	public ngOnChanges(changes: SimpleChanges){
		if('data' in changes){
			if(this.dygraph){
				var newData = this.convertToDates(this.data, this.maximumSpace);

				var t = new Date();
				this.dygraph.updateOptions({
					file: newData,
					//dataWindow: [t.getTime() - this.timeRange, t.getTime()]
				});
			}
		}
	}

	private dygraphZoomed(minDate: number, maxDate: number, ranges: number[][]){
		this.onZoom.emit({
			minDate: minDate,
			maxDate: maxDate,
			ranges: ranges
		});
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
				},
				zoomCallback: (min, max, range) => {this.dygraphZoomed(min, max, range)}
			});
	}


	/**
	 * Take an array of data points as raw numbers and convert the ms to a Date object
	 * In addition; insert a point as NaN if the distance between any two points is greater than spliceDist
	 * to cause a break in the graph at that point
	 */
	private convertToDates(data: number[][], spliceDist: number) : [Date, number][]{
		var newData: [Date, number][] = [ [new Date(data[0][0]), data[0][1]] ];
		if(spliceDist != undefined){
			for(var i = 1; i < data.length; i++){
				if(data[i][0] - data[i - 1][0] >= spliceDist){
					//this.data.splice(i, 0, [this.data[i-1][0] + 1, NaN], [this.data[i][0]-1, NaN]);
					//i += 2; //skip those 2 that were just inserted
					newData.push([new Date(data[i-1][0] + 1), NaN]);
					newData.push([new Date(data[i][0] - 1), NaN]);
				}
				newData.push([new Date(data[i][0]), data[i][1]]);
			}
		}
		return newData;
	}

}
