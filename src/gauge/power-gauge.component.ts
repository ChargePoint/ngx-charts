import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  ViewEncapsulation
} from '@angular/core';

import { BaseChartComponent } from '../common/base-chart.component';
import { formatLabel } from '../common/label.helper';
import { ColorHelper } from '../common/color.helper';
import { calculateViewDimensions, ViewDimensions } from '../common/view-dimensions.helper';
import { sortLinear } from '../utils/sort';
import { scaleLinear } from 'd3-scale';

@Component({
  selector: 'ngx-charts-power-gauge',
  template: `
    <ngx-charts-chart
      [view]="[width, height]">
      <svg:g [attr.transform]="transform" class="gauge chart">
        <svg:g ngx-charts-pie-arc
            class="background-arc"
            [startAngle]="arcSet.backgroundArc.startAngle"
            [endAngle]="arcSet.backgroundArc.endAngle"
            [innerRadius]="innerRadius"
            [outerRadius]="outerRadius"
            [cornerRadius]="cornerRadius"
            [data]="arcSet.backgroundArc.data"
            [animate]="true"
            [class.active]="true"
            [pointerEvents]="true"
            ngx-tooltip
            [tooltipDisabled]="false"
            [tooltipPlacement]="'top'"
            [tooltipType]="'tooltip'"
            [tooltipTitle]="tooltipText(arcSet.backgroundArc)">
        </svg:g>

        <svg:g ngx-charts-gauge-arc-series
          [bigSegments]="arcSet.valueArcs"
          [startAngle]="startAngle"
          [angleSpan]="angleSpan"
          [cornerRadius]="cornerRadius"
          [innerRadius]="innerRadius"
          [outerRadius]="outerRadius"
          [colors]="colors">
        </svg:g>

        <svg:g ngx-charts-power-gauge-axis
          [bigSegments]="axisValues"
          [startAngle]="startAngle"
          [pointerAngle]="pointerAngle"
          [angleSpan]="angleSpan"
          [cornerRadius]="cornerRadius"
          [innerRadius]="innerRadius"
          [outerRadius]="outerRadius"
          [tickFormatting]="axisTickFormatting"
          [dims]="dims">
        </svg:g>

        <svg:text #textEl
            [style.textAnchor]="'middle'"
            [attr.transform]="textTransform"
            alignment-baseline="central">
          <tspan x="0" dy="1.5em">{{displayValue}}
            <tspan class="units" *ngIf="units">{{units}}</tspan>
          </tspan>
        </svg:text>
      </svg:g>
    </ngx-charts-chart>
  `,
  styleUrls: [
    '../common/base-chart.component.scss',
    './gauge.component.scss',
    './power-gauge.component.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PowerGaugeComponent extends BaseChartComponent implements AfterViewInit {

  @Input() min: number = 0;
  @Input() max: number = 100;
  @Input() units: string;
  @Input() results: any[];
  @Input() axisPoints: any[];
  @Input() pointerValue: number;
  @Input() showAxis: boolean = true;
  @Input() axisTickFormatting: any;
  @Input() valueFormatting: any;
  // Specify margins
  @Input() margin: any[];
  @ViewChild('textEl') textEl: ElementRef;

  colors: ColorHelper;
  dims: ViewDimensions;
  domain: any[];
  valueDomain: any;
  valueScale: any;
  arcSet: any;
  axisValues: any;

  transform: string;
  displayValue: string;

  innerRadius: number;
  outerRadius: number;
  textRadius: number; // max available radius for the text
  resizeScale: number = 1;
  textTransform: string = 'scale(1, 1)';
  cornerRadius: number = 0;
  startAngle: number = -90;
  pointerAngle: number = 0;
  endAngle: number = 90;
  angleSpan: number = 180;

  tooltipText(arc): string {
    const label = formatLabel(arc.data.name);
    let val;

    if(this.axisTickFormatting) {
      val = this.axisTickFormatting(arc.data.value);
    } else {
      val = formatLabel(arc.data.value);
    }

    return `
      <span class="tooltip-label">${label}</span>
      <span class="tooltip-val">${val}</span>
    `;
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    // setTimeout(() => this.scaleText());
  }

  update(): void {
    super.update();

    this.zone.run(() => {
      if (!this.margin) {
        this.margin = [30, 60, 30, 60];
      }

      this.dims = calculateViewDimensions({
        width: this.width,
        height: this.height,
        margins: this.margin
      });

      this.domain = this.getDomain();
      this.setColors();
      this.valueDomain = this.getValueDomain();
      this.valueScale = this.getValueScale();
      this.displayValue = this.getDisplayValue();

      this.outerRadius = Math.min(this.dims.width, this.dims.height) * .7;
      const radiusPerArc = 100;
      const arcWidth = radiusPerArc * 0.38;
      this.innerRadius = this.outerRadius - arcWidth;
      this.textRadius = this.outerRadius - radiusPerArc;

      this.arcSet = this.getArcSet();
      this.axisValues = this.getAxisValues();

      const xOffset = this.margin[3] + (this.dims.width / 2) - 15;
      const yOffset = this.dims.height - (this.margin[0] / 2);

      this.transform = `translate(${ xOffset }, ${ yOffset })`;
      // setTimeout(() => this.scaleText(), 50);
    });
  }

  getArcSet(): any {
    const backgroundArc = {
      startAngle: this.startAngle * Math.PI / 180,
      endAngle: this.endAngle * Math.PI / 180,
      data: {
        value: this.max,
        name: 'Total'
      }
    };

    let i = 0;
    let angle;
    const valueArcs = [];
    this.results = sortLinear(this.results, 'value');
    for (const d of this.results) {
      angle = Math.min(this.valueScale(d.value) + this.startAngle, this.angleSpan);
      if (this.pointerValue === d.value) {
        this.pointerAngle = angle;
      }
      const valueArc = {
        endAngle: angle * Math.PI / 180,
        data: {
          value: d.value,
          name: d.name
        },
        textAnchor: this.getTextAnchor(angle)
      };

      valueArcs.push(valueArc);
      i++;
    }

    return {
      backgroundArc,
      valueArcs
    };
  }

  getAxisValues(): any {
    let i = 0;
    let angle;
    const axisValues = [];
    this.axisPoints = sortLinear(this.axisPoints, 'value');
    for (const d of this.axisPoints) {
      angle = Math.min(this.valueScale(d.value) + this.startAngle, this.angleSpan);
      if (this.pointerValue === d.value) {
        this.pointerAngle = angle;
      }
      const valueArc = {
        endAngle: angle * Math.PI / 180,
        data: {
          value: d.value,
          name: d.name
        }
      };

      axisValues.push(valueArc);

      i++;
    }

    return axisValues;
  }

  getTextAnchor(angle) {
    angle = (this.startAngle + angle) % 360;
    let textAnchor = 'middle';
    if (angle > 45 && angle <= 135) {
      textAnchor = 'start';
    } else if (angle > 225 && angle <= 315) {
      textAnchor = 'end';
    }
    return textAnchor;
  }

  getDomain(): any[] {
    return this.results.map(d => d.name);
  }

  getValueDomain(): any[] {
    const values = this.results.map(d => d.value);
    const dataMin = Math.min(...values);
    const dataMax = Math.max(...values);

    if (this.min !== undefined) {
      this.min = Math.min(this.min, dataMin);
    } else {
      this.min = dataMin;
    }

    if (this.max !== undefined) {
      this.max = Math.max(this.max, dataMax);
    } else {
      this.max = dataMax;
    }

    return [this.min, this.max];
  }

  getValueScale(): any {
    return scaleLinear()
      .range([0, this.angleSpan])
      .nice()
      .domain(this.valueDomain);
  }

  setColors(): void {
    this.colors = new ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
  }

  getDisplayValue(): string {
    if (this.valueFormatting) {
      return this.valueFormatting(this.pointerValue);
    }
    return this.pointerValue.toString();
  }
}
