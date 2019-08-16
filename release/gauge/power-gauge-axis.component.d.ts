import { OnChanges, NgZone } from '@angular/core';
export interface ViewDimensions {
    width: number;
    height: number;
    xOffset: number;
}
export declare class PowerGaugeAxisComponent implements OnChanges {
    private zone;
    bigSegments: any;
    startAngle: number;
    pointerAngle: number;
    angleSpan: number;
    outerRadius: number;
    innerRadius: number;
    cornerRadius: number;
    tickFormatting: any;
    dims: ViewDimensions;
    pointerWidth: number;
    pointerTailLength: number;
    ticks: any[];
    rotationAngle: number;
    rotate: string;
    tickTurner: -1;
    animator: any;
    constructor(zone: NgZone);
    ngOnChanges(): void;
    startAnimation(pointerAngle: any): void;
    stopAnimation(): void;
    update(): void;
    updatePointer(pointerAngle: any, delay: any, duration: any, easeValue: any): void;
    getTicks(): any;
    getTickPath(startDistance: any, tickLength: any, angle: any): any;
    getPointerPath(): string;
}
