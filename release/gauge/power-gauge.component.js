var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Component, Input, ViewChild, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { scaleLinear } from 'd3-scale';
import { BaseChartComponent } from '../common/base-chart.component';
import { ColorHelper } from '../common/color.helper';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { sortLinear } from '../utils/sort';
export var PowerGaugeComponent = (function (_super) {
    __extends(PowerGaugeComponent, _super);
    function PowerGaugeComponent() {
        _super.apply(this, arguments);
        this.min = 0;
        this.max = 100;
        this.showAxis = true;
        this.activeEntries = [];
        this.resizeScale = 1;
        this.textTransform = 'scale(1, 1)';
        this.cornerRadius = 0;
        this.startAngle = -90;
        this.pointerAngle = 0;
        this.endAngle = 90;
        this.angleSpan = 180;
    }
    PowerGaugeComponent.prototype.ngAfterViewInit = function () {
        _super.prototype.ngAfterViewInit.call(this);
        // setTimeout(() => this.scaleText());
    };
    PowerGaugeComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.zone.run(function () {
            if (!_this.margin) {
                _this.margin = [30, 75, 30, 45];
            }
            _this.dims = calculateViewDimensions({
                width: _this.width,
                height: _this.height,
                margins: _this.margin
            });
            _this.domain = _this.getDomain();
            _this.setColors();
            _this.valueDomain = _this.getValueDomain();
            _this.valueScale = _this.getValueScale();
            _this.displayValue = _this.getDisplayValue();
            _this.outerRadius = Math.min(_this.dims.width, _this.dims.height) * .7;
            var radiusPerArc = 100;
            var arcWidth = radiusPerArc * 0.4;
            _this.innerRadius = _this.outerRadius - arcWidth;
            _this.textRadius = _this.outerRadius - radiusPerArc;
            _this.arcSet = _this.getArcSet();
            _this.axisValues = _this.getAxisValues();
            var xOffset = _this.margin[3] + (_this.dims.width / 2) - 15;
            var yOffset = _this.dims.height - (_this.margin[0] / 2);
            _this.transform = "translate(" + xOffset + ", " + yOffset + ")";
            // setTimeout(() => this.scaleText(), 50);
        });
    };
    PowerGaugeComponent.prototype.getArcSet = function () {
        var backgroundArc = {
            startAngle: this.startAngle * Math.PI / 180,
            endAngle: this.endAngle * Math.PI / 180,
            data: {
                value: this.max,
                name: 'background-arc'
            }
        };
        var i = 0;
        var angle;
        var valueArcs = [];
        this.results = sortLinear(this.results, 'value');
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var d = _a[_i];
            angle = Math.min(this.valueScale(d.value) + this.startAngle, this.angleSpan);
            if (this.pointerValue === d.value) {
                this.pointerAngle = angle;
            }
            var valueArc = {
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
            backgroundArc: backgroundArc,
            valueArcs: valueArcs
        };
    };
    PowerGaugeComponent.prototype.getAxisValues = function () {
        var i = 0;
        var angle;
        var axisValues = [];
        this.axisPoints = sortLinear(this.axisPoints, 'value');
        for (var _i = 0, _a = this.axisPoints; _i < _a.length; _i++) {
            var d = _a[_i];
            angle = Math.min(this.valueScale(d.value) + this.startAngle, this.angleSpan);
            if (this.pointerValue === d.value) {
                this.pointerAngle = angle;
            }
            var valueArc = {
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
    };
    PowerGaugeComponent.prototype.getTextAnchor = function (angle) {
        angle = (this.startAngle + angle) % 360;
        var textAnchor = 'middle';
        if (angle > 45 && angle <= 135) {
            textAnchor = 'start';
        }
        else if (angle > 225 && angle <= 315) {
            textAnchor = 'end';
        }
        return textAnchor;
    };
    PowerGaugeComponent.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    PowerGaugeComponent.prototype.getValueDomain = function () {
        var values = this.results.map(function (d) { return d.value; });
        var dataMin = Math.min.apply(Math, values);
        var dataMax = Math.max.apply(Math, values);
        if (this.min !== undefined) {
            this.min = Math.min(this.min, dataMin);
        }
        else {
            this.min = dataMin;
        }
        if (this.max !== undefined) {
            this.max = Math.max(this.max, dataMax);
        }
        else {
            this.max = dataMax;
        }
        return [this.min, this.max];
    };
    PowerGaugeComponent.prototype.getValueScale = function () {
        return scaleLinear()
            .range([0, this.angleSpan])
            .nice()
            .domain(this.valueDomain);
    };
    // scaleText(repeat: boolean = true): void {
    //   this.zone.run(() => {
    //     const { width } = this.textEl.nativeElement.getBoundingClientRect();
    //     const oldScale = this.resizeScale;
    //
    //     if (width === 0) {
    //       this.resizeScale = 1;
    //     } else {
    //       const availableSpace = this.textRadius;
    //       this.resizeScale = Math.floor((availableSpace / (width / this.resizeScale)) * 100) / 100;
    //     }
    //
    //     if (this.resizeScale !== oldScale) {
    //       this.textTransform = `scale(${this.resizeScale}, ${this.resizeScale})`;
    //       this.cd.markForCheck();
    //       if (repeat) {
    //         setTimeout(() => this.scaleText(false), 50);
    //       }
    //     }
    //   });
    // }
    PowerGaugeComponent.prototype.setColors = function () {
        this.colors = new ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    PowerGaugeComponent.prototype.getDisplayValue = function () {
        if (this.axisTickFormatting) {
            return this.axisTickFormatting(this.pointerValue);
        }
        return this.pointerValue.toString();
    };
    PowerGaugeComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-charts-power-gauge',
                    template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\">\n      <svg:g [attr.transform]=\"transform\" class=\"gauge chart\">\n        <svg:g ngx-charts-pie-arc\n            class=\"background-arc\"\n            [startAngle]=\"arcSet.backgroundArc.startAngle\"\n            [endAngle]=\"arcSet.backgroundArc.endAngle\"\n            [innerRadius]=\"innerRadius\"\n            [outerRadius]=\"outerRadius\"\n            [cornerRadius]=\"cornerRadius\"\n            [data]=\"arcSet.backgroundArc.data\"\n            [animate]=\"false\"\n            [pointerEvents]=\"false\">\n        </svg:g>\n\n        <svg:g ngx-charts-gauge-arc-series\n          [bigSegments]=\"arcSet.valueArcs\"\n          [startAngle]=\"startAngle\"\n          [angleSpan]=\"angleSpan\"\n          [cornerRadius]=\"cornerRadius\"\n          [innerRadius]=\"innerRadius\"\n          [outerRadius]=\"outerRadius\"\n          [colors]=\"colors\">\n        </svg:g>\n\n        <svg:g ngx-charts-power-gauge-axis\n          [bigSegments]=\"axisValues\"\n          [startAngle]=\"startAngle\"\n          [pointerAngle]=\"pointerAngle\"\n          [angleSpan]=\"angleSpan\"\n          [cornerRadius]=\"cornerRadius\"\n          [innerRadius]=\"innerRadius\"\n          [outerRadius]=\"outerRadius\"\n          [tickFormatting]=\"axisTickFormatting\"\n          [dims]=\"dims\">\n        </svg:g>\n\n        <svg:text #textEl\n            [style.textAnchor]=\"'middle'\"\n            [attr.transform]=\"textTransform\"\n            alignment-baseline=\"central\">\n          <tspan x=\"0\" dy=\"1.5em\">{{displayValue}}</tspan>\n        </svg:text>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
                    styleUrls: [
                        '../common/base-chart.component.css',
                        './gauge.component.css',
                        './power-gauge.component.css'
                    ],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    PowerGaugeComponent.ctorParameters = function () { return []; };
    PowerGaugeComponent.propDecorators = {
        'min': [{ type: Input },],
        'max': [{ type: Input },],
        'units': [{ type: Input },],
        'results': [{ type: Input },],
        'axisPoints': [{ type: Input },],
        'pointerValue': [{ type: Input },],
        'showAxis': [{ type: Input },],
        'activeEntries': [{ type: Input },],
        'axisTickFormatting': [{ type: Input },],
        'margin': [{ type: Input },],
        'textEl': [{ type: ViewChild, args: ['textEl',] },],
    };
    return PowerGaugeComponent;
}(BaseChartComponent));
//# sourceMappingURL=power-gauge.component.js.map