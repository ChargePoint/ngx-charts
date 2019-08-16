import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { YAxisTicksComponent } from './y-axis-ticks.component';
export declare class YAxisComponent implements OnChanges {
    yScale: any;
    dims: any;
    tickFormatting: any;
    ticks: any[];
    showGridLines: boolean;
    showLabel: any;
    labelText: any;
    yAxisTickInterval: any;
    yAxisTickCount: any;
    yOrient: string;
<<<<<<< HEAD
=======
    referenceLines: any;
    showRefLines: any;
    showRefLabels: any;
    yAxisOffset: number;
>>>>>>> tags/10.0.0
    dimensionsChanged: EventEmitter<{}>;
    yAxisClassName: string;
    tickArguments: any;
    offset: any;
    transform: any;
<<<<<<< HEAD
    yAxisOffset: number;
=======
>>>>>>> tags/10.0.0
    labelOffset: number;
    fill: string;
    stroke: string;
    tickStroke: string;
    strokeWidth: number;
    padding: number;
    ticksComponent: YAxisTicksComponent;
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    emitTicksWidth({ width }: {
        width: any;
    }): void;
}
