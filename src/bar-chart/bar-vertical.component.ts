import {
  Component,
  Input,
  ViewEncapsulation,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ContentChild,
  TemplateRef
} from '@angular/core';
import { scaleBand, scaleLinear } from 'd3-scale';

import { calculateViewDimensions, ViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { BaseChartComponent } from '../common/base-chart.component';

@Component({
  selector: 'ngx-charts-bar-vertical',
  template: `
    <ngx-charts-chart
      [view]="[width, height]"
      [showLegend]="legend"
      [legendOptions]="legendOptions"
      [activeEntries]="activeEntries"
      [animations]="animations"
      (legendLabelClick)="onClick($event)"
      (legendLabelActivate)="onActivate($event)"
      (legendLabelDeactivate)="onDeactivate($event)">
      <svg:text *ngIf="yAxisTickRoundingLabel" class="tick-round-label"
          [style.textAnchor]="'start'"
          [style.alignment-baseline]="'baseline'"
          [attr.transform]="labelTransform"
          alignment-baseline="central"
          x="20" dy="5">
          {{yAxisTickRoundingLabel}}
      </svg:text>
      <svg:g [attr.transform]="transform" class="bar-chart chart">
        <svg:g ngx-charts-x-axis
          *ngIf="xAxis"
          [xScale]="xScale"
          [dims]="dims"
          [showLabel]="showXAxisLabel"
          [labelText]="xAxisLabel"
          [tickFormatting]="xAxisTickFormatting"
          [xAxisTickLabels]="xAxisTickLabels"
          [showTicks]="showTicks"
          [ticks]="xAxisTicks"
          [xAxisOffset]="dataLabelMaxHeight.negative"
          (dimensionsChanged)="updateXAxisHeight($event)">
        </svg:g>
        <svg:g ngx-charts-y-axis
          *ngIf="yAxis"
          [yScale]="yScale"
          [dims]="dims"
          [showGridLines]="showGridLines"
          [showLabel]="showYAxisLabel"
          [labelText]="yAxisLabel"
          [tickFormatting]="yAxisTickFormatting"
          [yAxisTickCount]="maxTicks"
          [ticks]="yAxisTicks"
          (dimensionsChanged)="updateYAxisWidth($event)">
        </svg:g>
        <svg:g ngx-charts-series-vertical
          [type]="type"
          [xScale]="xScale"
          [yScale]="yScale"
          [colors]="colors"
          [series]="results"
          [dims]="dims"
          [gradient]="gradient"
          [tooltipDisabled]="tooltipDisabled"
          [tooltipFormatting]="tooltipFormatting"
          [tooltipTemplate]="tooltipTemplate"
          [showDataLabel]="showDataLabel"
          [dataLabelFormatting]="dataLabelFormatting"
          [activeEntries]="activeEntries"
          [roundEdges]="roundEdges"
          [animations]="animations"
          (activate)="onActivate($event)"
          (deactivate)="onDeactivate($event)"
          (select)="onClick($event)"
          (dataLabelHeightChanged)="onDataLabelMaxHeightChanged($event)"
          >          
        </svg:g>
        <svg:g
          *ngIf="showBaseLines">
          <svg:line
            class="gridline-path gridline-path-vertical"
            y1="0"
            [attr.y2]="dims.height" />
        </svg:g>
        <svg:g
          *ngIf="showBaseLines"
          [attr.transform]="xAxisLineTransform()">
          <svg:line
            class="gridline-path gridline-path-horizontal"
            x1="0"
            [attr.x2]="dims.width" />
        </svg:g>
      </svg:g>
    </ngx-charts-chart>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['../common/base-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BarVerticalComponent extends BaseChartComponent {

  @Input() legend = false;
  @Input() legendTitle: string = 'Legend';
  @Input() xAxis;
  @Input() yAxis;
  @Input() showXAxisLabel;
  @Input() showYAxisLabel;
  @Input() xAxisLabel;
  @Input() xAxisTickLabels: string[];
  @Input() yAxisLabel;
  @Input() yAxisTickRoundingLabel;
  @Input() tooltipDisabled: boolean = false;
  @Input() tooltipFormatting: any;
  @Input() gradient: boolean;
  @Input() showGridLines: boolean = true;
  @Input() showBaseLines: boolean = true;
  @Input() showAxisLines: boolean = false;
  @Input() activeEntries: any[] = [];
  @Input() schemeType: string;
  @Input() type: string = 'standard';
  @Input() xAxisTickFormatting: any;
  @Input() showTicks: boolean[];
  @Input() yAxisTickFormatting: any;
  @Input() maxTicks: number;
  @Input() barPadding: string | number  = 8;
  @Input() xAxisTicks: any[];
  @Input() yAxisTicks: any[];
  @Input() roundDomains: boolean = false;
  @Input() roundEdges: boolean = true;
  @Input() yScaleMax: number;
  @Input() yScaleMin: number;
  @Input() showDataLabel: boolean = false;
  @Input() dataLabelFormatting: any;

  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() deactivate: EventEmitter<any> = new EventEmitter();

  @ContentChild('tooltipTemplate') tooltipTemplate: TemplateRef<any>;

  dims: ViewDimensions;
  xScale: any;
  yScale: any;
  xDomain: any;
  yDomain: any;
  transform: string;
  labelTransform: string;
  colors: ColorHelper;
  margin: any[] = [10, 20, 10, 20];
  xAxisHeight: number = 0;
  yAxisWidth: number = 0;
  legendOptions: any;
  dataLabelMaxHeight: any = {negative: 0, positive: 0};

  update(): void {
    super.update();
   
    if (!this.showDataLabel) {
      this.dataLabelMaxHeight = {negative: 0, positive: 0};          
    }
    this.margin = [10 + this.dataLabelMaxHeight.positive, 20, 10 + this.dataLabelMaxHeight.negative, 20]; 

    this.dims = calculateViewDimensions({
      width: this.width,
      height: this.height,
      margins: this.margin,
      showXAxis: this.xAxis,
      showYAxis: this.yAxis,
      xAxisHeight: this.xAxisHeight,
      yAxisWidth: this.yAxisWidth,
      showXLabel: this.showXAxisLabel,
      showYLabel: this.showYAxisLabel,
      showLegend: this.legend,
      legendType: this.schemeType,
      yAxisLabel: this.yAxisLabel
    });

    if (this.showDataLabel) {
      this.dims.height -= this.dataLabelMaxHeight.negative;    
    }
    this.xScale = this.getXScale();
    this.yScale = this.getYScale();

    this.setColors();
    this.legendOptions = this.getLegendOptions();

    if (this.yAxisTickRoundingLabel) {
      let offset = this.margin[3];
      if (this.yAxisLabel) {
        offset += 20;
      }
      this.labelTransform = `translate(${ offset } , 20)`;
      this.margin[0] = 32;
    }
    //this.transform = `translate(${ this.dims.xOffset } , ${ this.margin[0] })`;
    console.log(this);
    this.transform = `translate(${ this.dims.xOffset } , ${ this.margin[0] + this.dataLabelMaxHeight.negative })`;
  }

  getXScale(): any {
    this.xDomain = this.getXDomain();
    let spacing = parseInt(this.barPadding.toString(), 10);
    if (this.barPadding !== (spacing + '%')) {
      spacing = this.xDomain.length / (this.dims.width / spacing + 1);
    } else {
      spacing /= 100;
    }
    const scale = scaleBand()
      .rangeRound([0, this.dims.width])
      .paddingInner(spacing)
      .domain(this.xDomain);

    return this.showBaseLines ? scale.paddingOuter(spacing / 2) : scale;
  }

  getYScale(): any {
    this.yDomain = this.getYDomain();
    const scale = scaleLinear()
      .range([this.dims.height, 0])
      .domain(this.yDomain);

    return this.roundDomains ? scale.nice() : scale;
  }

  getXDomain(): any[] {
    return this.results.map(d => d.name);
  }

  getYDomain() {
    const values = this.results.map(d => d.value);

    const min = this.yScaleMin
      ? Math.min(this.yScaleMin, ...values)
      : Math.min(0, ...values);

    const max = this.yScaleMax
      ? Math.max(this.yScaleMax, ...values)
      : Math.max(...values);

    return [min, max];
  }

  onClick(data) {
    this.select.emit(data);
  }

  setColors(): void {
    let domain;
    if (this.schemeType === 'ordinal') {
      domain = this.xDomain;
    } else {
      domain = this.yDomain;
    }

    this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
  }

  getLegendOptions() {
    const opts = {
      scaleType: this.schemeType,
      colors: undefined,
      domain: [],
      title: undefined
    };
    if (opts.scaleType === 'ordinal') {
      opts.domain = this.xDomain;
      opts.colors = this.colors;
      opts.title = this.legendTitle;
    } else {
      opts.domain = this.yDomain;
      opts.colors = this.colors.scale;
    }
    return opts;
  }

  updateYAxisWidth({ width }): void {
    this.yAxisWidth = width;
    this.update();
  }

  updateXAxisHeight({ height }): void {
    this.xAxisHeight = height;
    this.update();
  }
  
  onDataLabelMaxHeightChanged(event) {      
    if (event.size.negative)  {
      this.dataLabelMaxHeight.negative = Math.max(this.dataLabelMaxHeight.negative, event.size.height);
    } else {
      this.dataLabelMaxHeight.positive = Math.max(this.dataLabelMaxHeight.positive, event.size.height);
    }      
    if (event.index === (this.results.length - 1)) {
      setTimeout(() => this.update());
    }      
  }

  onActivate(item) {
    const idx = this.activeEntries.findIndex(d => {
      return d.name === item.name && d.value === item.value && d.series === item.series;
    });
    if (idx > -1) {
      return;
    }

    this.activeEntries = [ item, ...this.activeEntries ];
    this.activate.emit({ value: item, entries: this.activeEntries });
  }

  onDeactivate(item) {
    const idx = this.activeEntries.findIndex(d => {
      return d.name === item.name && d.value === item.value && d.series === item.series;
    });

    this.activeEntries.splice(idx, 1);
    this.activeEntries = [...this.activeEntries];

    this.deactivate.emit({ value: item, entries: this.activeEntries });
  }

  xAxisLineTransform(): string {
    return `translate(0,${this.dims.height})`;
  }
}
