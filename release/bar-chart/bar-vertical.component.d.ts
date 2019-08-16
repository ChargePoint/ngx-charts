import { EventEmitter, TemplateRef } from '@angular/core';
import { ViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { BaseChartComponent } from '../common/base-chart.component';
export declare class BarVerticalComponent extends BaseChartComponent {
    legend: boolean;
    legendTitle: string;
    legendPosition: string;
    xAxis: any;
    yAxis: any;
    showXAxisLabel: any;
    showYAxisLabel: any;
    xAxisLabel: any;
    xAxisTickLabels: string[];
    yAxisLabel: any;
    yAxisTickRoundingLabel: any;
    tooltipDisabled: boolean;
    tooltipFormatting: any;
    gradient: boolean;
    showGridLines: boolean;
    showBaseLines: boolean;
    showAxisLines: boolean;
    activeEntries: any[];
    schemeType: string;
    type: string;
    xAxisTickFormatting: any;
    showTicks: boolean[];
    yAxisTickFormatting: any;
<<<<<<< HEAD
    maxTicks: number;
    barPadding: string | number;
=======
    xAxisTicks: any[];
    yAxisTicks: any[];
    barPadding: number;
>>>>>>> tags/10.0.0
    roundDomains: boolean;
    roundEdges: boolean;
    yScaleMax: number;
    yScaleMin: number;
    showDataLabel: boolean;
    dataLabelFormatting: any;
    activate: EventEmitter<any>;
    deactivate: EventEmitter<any>;
    tooltipTemplate: TemplateRef<any>;
    dims: ViewDimensions;
    xScale: any;
    yScale: any;
    xDomain: any;
    yDomain: any;
    transform: string;
    labelTransform: string;
    colors: ColorHelper;
    margin: any[];
    xAxisHeight: number;
    yAxisWidth: number;
    legendOptions: any;
    dataLabelMaxHeight: any;
    update(): void;
    getXScale(): any;
    getYScale(): any;
    getXDomain(): any[];
    getYDomain(): number[];
    onClick(data: any): void;
    setColors(): void;
    getLegendOptions(): {
        scaleType: string;
        colors: any;
        domain: any[];
        title: any;
        position: string;
    };
    updateYAxisWidth({ width }: {
        width: any;
    }): void;
    updateXAxisHeight({ height }: {
        height: any;
    }): void;
    onDataLabelMaxHeightChanged(event: any): void;
    onActivate(item: any): void;
    onDeactivate(item: any): void;
    xAxisLineTransform(): string;
}
