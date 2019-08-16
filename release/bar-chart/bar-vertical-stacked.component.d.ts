import { EventEmitter, TemplateRef } from '@angular/core';
import { ViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { BaseChartComponent } from '../common/base-chart.component';
export declare class BarVerticalStackedComponent extends BaseChartComponent {
    legend: boolean;
    legendTitle: string;
    legendPosition: string;
    xAxis: any;
    yAxis: any;
    showXAxisLabel: any;
    showYAxisLabel: any;
    xAxisLabel: any;
    yAxisLabel: any;
    tooltipDisabled: boolean;
    gradient: boolean;
    showGridLines: boolean;
    activeEntries: any[];
    schemeType: string;
    xAxisTickFormatting: any;
    yAxisTickFormatting: any;
<<<<<<< HEAD
    barPadding: string | number;
=======
    xAxisTicks: any[];
    yAxisTicks: any[];
    barPadding: number;
>>>>>>> tags/10.0.0
    roundDomains: boolean;
    yScaleMax: number;
    showDataLabel: boolean;
    dataLabelFormatting: any;
    activate: EventEmitter<any>;
    deactivate: EventEmitter<any>;
    tooltipTemplate: TemplateRef<any>;
    dims: ViewDimensions;
    groupDomain: any[];
    innerDomain: any[];
    valueDomain: any[];
    xScale: any;
    yScale: any;
    transform: string;
    tickFormatting: (label: string) => string;
    colors: ColorHelper;
    margin: number[];
    xAxisHeight: number;
    yAxisWidth: number;
    legendOptions: any;
    dataLabelMaxHeight: any;
    update(): void;
    getGroupDomain(): any[];
    getInnerDomain(): any[];
    getValueDomain(): number[];
    getXScale(): any;
    getYScale(): any;
    onDataLabelMaxHeightChanged(event: any, groupIndex: any): void;
    groupTransform(group: any): string;
    onClick(data: any, group?: any): void;
    trackBy(index: any, item: any): any;
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
    onActivate(event: any, group?: any): void;
    onDeactivate(event: any, group?: any): void;
}
