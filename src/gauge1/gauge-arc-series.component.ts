import {
  Component,
  Input,
  OnChanges,
  ChangeDetectionStrategy
} from '@angular/core';

import d3 from '../d3';
import { formatLabel } from '../common/label.helper';

@Component({
  selector: 'g[ngx-charts-gauge-arc-series]',
  template: `
  <svg:g *ngFor="let arc of arcs">
    <svg:g ngx-charts-pie-arc
        [startAngle]="arc.startAngle"
        [endAngle]="arc.endAngle"
        [innerRadius]="innerRadius"
        [outerRadius]="outerRadius"
        [cornerRadius]="cornerRadius"
        [fill]="color(arc)"
        [data]="arc.data"
        [animate]="true">
    </svg:g>
  </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GaugeArcSeriesComponent implements OnChanges {
  @Input() bigSegments: any;
  @Input() colors;
  @Input() startAngle: number;
  @Input() angleSpan: number;
  @Input() innerRadius: number;
  @Input() outerRadius: number;
  @Input() cornerRadius: number;

  arcs: any[];

  ngOnChanges() {
    this.update();
  }

  update(): void {
    this.arcs = this.getArcs();
  }

  getArcs(): any {
    const arcs = [];

    let startAngle = this.startAngle * Math.PI / 180;
    let bigSegment;
    for (let i = 0; i < this.bigSegments.length; i++) {
      bigSegment = this.bigSegments[i];
      const { data, endAngle } = bigSegment;

      arcs.push({
        startAngle,
        endAngle,
        data
      });
      startAngle = endAngle;
    }

    return arcs;
  }

  color(arc): any {
    return this.colors.getColor(this.label(arc));
  }

  label(arc): string {
    return formatLabel(arc.data.name);
  }
}
