import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ViewChild,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { YAxisTicksComponent } from './y-axis-ticks.component';
import d3 from '../../d3';

@Component({
  selector: 'g[ngx-charts-y-axis]',
  template: `
    <svg:g
      [attr.class]="yAxisClassName"
      [attr.transform]="transform">
      <svg:g ngx-charts-y-axis-ticks
        [tickFormatting]="tickFormatting"
        [tickArguments]="[maxTicks]"
        [tickStroke]="tickStroke"
        [scale]="yScale"
        [orient]="yOrient"
        [showGridLines]="showGridLines"
        [gridLineWidth]="dims.width"
        [height]="dims.height"
        (dimensionsChanged)="emitTicksWidth($event)"
      />

      <svg:g ngx-charts-axis-label
        class="fake"
        *ngIf="showLabel"
        [label]="labelText"
        [offset]="labelOffset"
        [orient]="yOrient"
        [height]="dims.height"
        [width]="dims.width">
      </svg:g>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YAxisComponent implements OnChanges {

  @Input() yScale;
  @Input() dims;
  @Input() tickFormatting;
  @Input() tickArguments;
  @Input() maxTicks;
  @Input() showGridLines = false;
  @Input() showLabel;
  @Input() labelText;
  @Input() yAxisTickInterval;
  @Input() yAxisTickCount: any;
  @Output() dimensionsChanged = new EventEmitter();

  yAxisClassName: string = 'y axis';
  offset: any;
  transform: any;
  yAxisOffset: number = -5;
  yOrient: string = 'left';
  labelOffset: number = 80;
  fill: string = 'none';
  stroke: string = '#CCC';
  tickStroke: string = '#CCC';
  strokeWidth: number = 1;

  @ViewChild(YAxisTicksComponent) ticksComponent: YAxisTicksComponent;

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    this.offset = this.yAxisOffset;
    if (this.yOrient === 'right') {
      this.transform = `translate(${this.offset + this.dims.width} , 0)`;
    } else {
      this.transform = `translate(${this.offset} , 0)`;
    }

    if (this.yAxisTickCount !== undefined) {
      this.tickArguments = [this.yAxisTickCount];
    }

    // if (this.showAxisLines) {
    const axis = d3.axisLeft(this.yScale);
    axis.tickFormat('');
    d3.select('.fake').call(axis);
    // }
  }

  emitTicksWidth({ width }): void {
    if (width !== this.labelOffset) {
      this.labelOffset = width;
      setTimeout(() => {
        this.dimensionsChanged.emit({width});
      }, 0);
    }
  }

}
