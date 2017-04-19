import { OnChanges } from '@angular/core';
export declare class GaugeArcSeriesComponent implements OnChanges {
    bigSegments: any;
    colors: any;
    startAngle: number;
    angleSpan: number;
    innerRadius: number;
    outerRadius: number;
    cornerRadius: number;
    arcs: any[];
    ngOnChanges(): void;
    update(): void;
    getArcs(): any;
    color(arc: any): any;
    label(arc: any): string;
}
