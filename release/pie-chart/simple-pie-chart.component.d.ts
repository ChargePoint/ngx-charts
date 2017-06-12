import { ViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { BaseChartComponent } from '../common/base-chart.component';
export declare class SimplePieChartComponent extends BaseChartComponent {
    gradient: boolean;
    totalLabel: string;
    totalValue: number;
    unit: string;
    data: any;
    dims: ViewDimensions;
    domain: any[];
    outerRadius: number;
    innerRadius: number;
    transform: string;
    colors: ColorHelper;
    legendWidth: number;
    margin: number[];
    update(): void;
    getDomain(): any[];
    onClick(data: any): void;
    setColors(): void;
}
