
import {
  Component,
  Input,
  OnChanges,
  ChangeDetectionStrategy,
  NgZone
} from '@angular/core';

import { easeElastic } from 'd3-ease';
import { select } from 'd3-selection';
import { curveMonotoneX, line } from 'd3-shape';
export interface ViewDimensions {
  width: number;
  height: number;
  xOffset: number;
}

@Component({
  selector: 'g[ngx-charts-power-gauge-axis]',
  template: `
  <svg:g [attr.transform]="rotate">
    <svg:g *ngFor="let tick of ticks"
        class="gauge-tick gauge-tick-large">
        <svg:path [attr.d]="tick.line" />
    </svg:g>
    <svg:g *ngFor="let tick of ticks"
        class="gauge-tick gauge-tick-large">
        <svg:text *ngIf="tick.label"
            [style.textAnchor]="tick.textAnchor"
            [attr.transform]="tick.labelTransform"
            alignment-baseline="central">
            {{tick.label}}
        </svg:text>
        <svg:text
            [style.textAnchor]="tick.textAnchor"
            [attr.transform]="tick.textTransform"
            alignment-baseline="central">
            {{tick.text}}
        </svg:text>
    </svg:g>
  </svg:g>
  <svg:g [attr.transform]="'rotate(0)'" class="pointer">
    <svg:g>
      <svg:path
        [attr.d]="getPointerPath()"
      />
    </svg:g>
  </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PowerGaugeAxisComponent implements OnChanges {
  @Input() bigSegments: any;
  @Input() startAngle: number;
  @Input() pointerAngle: number;
  @Input() angleSpan: number;
  @Input() outerRadius: number;
  @Input() innerRadius: number;
  @Input() cornerRadius: number;
  @Input() tickFormatting: any;
  @Input() dims: ViewDimensions;
  @Input() pointerWidth = 13;
  @Input() pointerTailLength = 8;

  ticks: any[];
  rotationAngle: number;
  rotate: string = '';
  tickTurner: -1;
  animator: any;

  constructor(private zone: NgZone) { }

  ngOnChanges() {
    this.update();
  }

  // ngOnDestroy() {
  //   this.stopAnimation();
  // }

  startAnimation(pointerAngle) {
    this.zone.runOutsideAngular(() => {
      this.animator = setInterval(() => {
        const moveTick = Math.random() * 2;
        this.updatePointer(pointerAngle + moveTick, 0, 750, 1);
      }, 300);
    });
  }

  stopAnimation() {
    this.zone.runOutsideAngular(() => {
      clearInterval(this.animator);
    });
  }

  update(): void {
    this.rotationAngle = this.startAngle;
    this.rotate = `rotate(${this.rotationAngle})`;
    this.ticks = this.getTicks();

    // this.stopAnimation();
    //
    // this.zone.runOutsideAngular(() => {
    //   setTimeout(() => {
    //     this.startAnimation(this.pointerAngle);
    //   }, 1500);
    // });

    if (this.pointerAngle) {
      this.updatePointer(this.pointerAngle, 750, 750, 0.8);
    }
  }

  updatePointer(pointerAngle, delay, duration, easeValue): void {
    const pointer = select('.pointer');
    const pointerRotate = `rotate(${pointerAngle})`;
    const ease = easeElastic.period(easeValue);
    pointer
      .transition().delay(delay).duration(duration)
      .ease(ease)
      .attr('transform', pointerRotate);
  }

  getTicks(): any {
     // const bigTickSegment = this.angleSpan / this.bigSegments.length;
    const tickLength = this.outerRadius - this.innerRadius;
    const ticks = [];

    const startDistance = this.innerRadius;
    const textDist = this.outerRadius + 20;

    let startAngle = this.startAngle * Math.PI / 180;
    let bigSegment;

    for (let i = 0; i < this.bigSegments.length; i++) {
      bigSegment = this.bigSegments[i];
      const { data, endAngle } = bigSegment;
      let text = data.value;
      if (this.tickFormatting) {
        text = this.tickFormatting(text);
      }
      ticks.push({
        line: this.getTickPath(startDistance, tickLength, endAngle),
        textAnchor: bigSegment.textAnchor,
        text,
        label: data.name,
        labelTransform: `
          translate(${textDist * Math.cos(endAngle) + 20},
          ${textDist * Math.sin(endAngle) - 10}) rotate(${-this.rotationAngle})
        `,
        textTransform: `
          translate(${textDist * Math.cos(endAngle)}, ${textDist * Math.sin(endAngle)}) rotate(${-this.rotationAngle})
        `
      });
      startAngle = endAngle;
    }

    return ticks;
  }

  getTickPath(startDistance, tickLength, angle): any {
    const y1 = startDistance * Math.sin(angle);
    const y2 = (startDistance + tickLength) * Math.sin(angle);
    const x1 = startDistance * Math.cos(angle);
    const x2 = (startDistance + tickLength) * Math.cos(angle);

    const points = [{ x: x1, y: y1 }, { x: x2, y: y2 }];
    const lineGenerator = line<any>().x(d => d.x).y(d => d.y);
    return lineGenerator(points);
  }

  getPointerPath() {
    const rw = this.dims.width / 2;
    const rh = this.dims.height / 2;
    const r = rw < rh ? rw : rh;
    const pointerHeadLength = r + this.pointerWidth;
    const pointerLine = [{ x: this.pointerWidth / 2, y: 0 },
      { x: 0, y: -pointerHeadLength },
      { x: -(this.pointerWidth / 2), y: 0 },
      { x: 0, y: this.pointerTailLength },
      { x: this.pointerWidth / 2, y: 0 }];
    const lineGenerator = line<any>().x(d => d.x).y(d => d.y).curve(curveMonotoneX);
    return lineGenerator(pointerLine);
  }
}
