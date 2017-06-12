import { EventEmitter, OnChanges, ElementRef, SimpleChanges, AfterViewInit } from '@angular/core';
export declare class XAxisTicksComponent implements OnChanges, AfterViewInit {
    scale: any;
    orient: any;
    tickArguments: number[];
    tickStroke: string;
    tickFormatting: any;
    showTicks: boolean[];
    showGridLines: boolean;
    gridLineHeight: any;
    width: any;
    tickLabels: string[];
    dimensionsChanged: EventEmitter<{}>;
    verticalSpacing: number;
    rotateLabels: boolean;
    innerTickSize: number;
    outerTickSize: number;
    tickPadding: number;
    tickValues: any;
    textAnchor: string;
    maxTicksLength: number;
    maxAllowedLength: number;
    trimLabel: (o: any) => any;
    adjustedScale: any;
    textTransform: any;
    ticks: any;
    tickFormat: (o: any) => any;
    height: number;
    ticksElement: ElementRef;
    constructor();
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    updateDims(): void;
    update(): void;
    getRotationAngle(ticks: any): number;
    getTicks(): any;
    getMaxTicks(tickWidth: number): number;
    tickTransform(tick: any): string;
    gridLineTransform(): string;
}
