import { OnChanges, OnDestroy } from '@angular/core';
import { ViewDimensions } from '../common/view-dimensions.helper';
export declare class PowerGaugeAxisComponent implements OnChanges, OnDestroy {
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
    ngOnChanges(): void;
    ngOnDestroy(): void;
    startAnimation(pointerAngle: any): void;
    stopAnimation(): void;
    update(): void;
    updatePointer(pointerAngle: any, delay: any, duration: any, easeValue: any): void;
    getTicks(): any;
    getTickPath(startDistance: any, tickLength: any, angle: any): any;
    getPointerPath(): string;
}
