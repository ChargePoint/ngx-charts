var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ElementRef, ViewChild, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { BaseChartComponent } from '../common/base-chart.component';
import { formatLabel } from '../common/label.helper';
import { ColorHelper } from '../common/color.helper';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { sortLinear } from '../utils/sort';
import { scaleLinear } from 'd3-scale';
var PowerGaugeComponent = /** @class */ (function (_super) {
    __extends(PowerGaugeComponent, _super);
    function PowerGaugeComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.min = 0;
        _this.max = 100;
        _this.showAxis = true;
        _this.resizeScale = 1;
        _this.textTransform = 'scale(1, 1)';
        _this.cornerRadius = 0;
        _this.startAngle = -90;
        _this.pointerAngle = 0;
        _this.endAngle = 90;
        _this.angleSpan = 180;
        return _this;
    }
    PowerGaugeComponent.prototype.tooltipText = function (arc) {
        var label = formatLabel(arc.data.name);
        var val;
        if (this.axisTickFormatting) {
            val = this.axisTickFormatting(arc.data.value);
        }
        else {
            val = formatLabel(arc.data.value);
        }
        return "\n      <span class=\"tooltip-label\">" + label + "</span>\n      <span class=\"tooltip-val\">" + val + "</span>\n    ";
    };
    PowerGaugeComponent.prototype.ngAfterViewInit = function () {
        _super.prototype.ngAfterViewInit.call(this);
        // setTimeout(() => this.scaleText());
    };
    PowerGaugeComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.zone.run(function () {
            if (!_this.margin) {
                _this.margin = [30, 60, 30, 60];
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
            var arcWidth = radiusPerArc * 0.38;
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
                name: 'Total'
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
    PowerGaugeComponent.prototype.setColors = function () {
        this.colors = new ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    PowerGaugeComponent.prototype.getDisplayValue = function () {
        if (this.valueFormatting) {
            return this.valueFormatting(this.pointerValue);
        }
        return this.pointerValue.toString();
    };
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], PowerGaugeComponent.prototype, "min", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], PowerGaugeComponent.prototype, "max", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], PowerGaugeComponent.prototype, "units", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], PowerGaugeComponent.prototype, "results", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], PowerGaugeComponent.prototype, "axisPoints", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], PowerGaugeComponent.prototype, "pointerValue", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PowerGaugeComponent.prototype, "showAxis", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PowerGaugeComponent.prototype, "axisTickFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PowerGaugeComponent.prototype, "valueFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], PowerGaugeComponent.prototype, "margin", void 0);
    __decorate([
        ViewChild('textEl'),
        __metadata("design:type", ElementRef)
    ], PowerGaugeComponent.prototype, "textEl", void 0);
    PowerGaugeComponent = __decorate([
        Component({
            selector: 'ngx-charts-power-gauge',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\">\n      <svg:g [attr.transform]=\"transform\" class=\"gauge chart\">\n        <svg:g ngx-charts-pie-arc\n            class=\"background-arc\"\n            [startAngle]=\"arcSet.backgroundArc.startAngle\"\n            [endAngle]=\"arcSet.backgroundArc.endAngle\"\n            [innerRadius]=\"innerRadius\"\n            [outerRadius]=\"outerRadius\"\n            [cornerRadius]=\"cornerRadius\"\n            [data]=\"arcSet.backgroundArc.data\"\n            [animate]=\"true\"\n            [class.active]=\"true\"\n            [pointerEvents]=\"true\"\n            ngx-tooltip\n            [tooltipDisabled]=\"false\"\n            [tooltipPlacement]=\"'top'\"\n            [tooltipType]=\"'tooltip'\"\n            [tooltipTitle]=\"tooltipText(arcSet.backgroundArc)\">\n        </svg:g>\n\n        <svg:g ngx-charts-gauge-arc-series\n          [bigSegments]=\"arcSet.valueArcs\"\n          [startAngle]=\"startAngle\"\n          [angleSpan]=\"angleSpan\"\n          [cornerRadius]=\"cornerRadius\"\n          [innerRadius]=\"innerRadius\"\n          [outerRadius]=\"outerRadius\"\n          [colors]=\"colors\">\n        </svg:g>\n\n        <svg:g ngx-charts-power-gauge-axis\n          [bigSegments]=\"axisValues\"\n          [startAngle]=\"startAngle\"\n          [pointerAngle]=\"pointerAngle\"\n          [angleSpan]=\"angleSpan\"\n          [cornerRadius]=\"cornerRadius\"\n          [innerRadius]=\"innerRadius\"\n          [outerRadius]=\"outerRadius\"\n          [tickFormatting]=\"axisTickFormatting\"\n          [dims]=\"dims\">\n        </svg:g>\n\n        <svg:text #textEl\n            [style.textAnchor]=\"'middle'\"\n            [attr.transform]=\"textTransform\"\n            alignment-baseline=\"central\">\n          <tspan x=\"0\" dy=\"1.5em\">{{displayValue}}\n            <tspan class=\"units\" *ngIf=\"units\">{{units}}</tspan>\n          </tspan>\n        </svg:text>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            styleUrls: [
                '../common/base-chart.component.css',
                './gauge.component.css',
                './power-gauge.component.css'
            ],
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
        })
    ], PowerGaugeComponent);
    return PowerGaugeComponent;
}(BaseChartComponent));
export { PowerGaugeComponent };
//# sourceMappingURL=power-gauge.component.js.map