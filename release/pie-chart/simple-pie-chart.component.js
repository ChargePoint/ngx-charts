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
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { BaseChartComponent } from '../common/base-chart.component';
var SimplePieChartComponent = /** @class */ (function (_super) {
    __extends(SimplePieChartComponent, _super);
    function SimplePieChartComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.unit = '';
        _this.margin = [0, 0, 0, 0];
        return _this;
        // onActivate(event): void {
        //   if(this.activeEntries.indexOf(event) > -1) return;
        //   this.activeEntries = [ event, ...this.activeEntries ];
        //   this.activate.emit({ value: event, entries: this.activeEntries });
        // }
        //
        // onDeactivate(event): void {
        //   const idx = this.activeEntries.indexOf(event);
        //
        //   this.activeEntries.splice(idx, 1);
        //   this.activeEntries = [...this.activeEntries];
        //
        //   this.deactivate.emit({ value: event, entries: this.activeEntries });
        // }
    }
    SimplePieChartComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.zone.run(function () {
            _this.dims = calculateViewDimensions({
                width: _this.width,
                height: _this.height,
                margins: _this.margin
            });
            _this.domain = _this.getDomain();
            _this.setColors();
            var xOffset = _this.dims.width / 2;
            var yOffset = _this.margin[0] + _this.dims.height / 2;
            _this.legendWidth = _this.width - _this.dims.width - _this.margin[1];
            _this.outerRadius = Math.min(_this.dims.width, _this.dims.height) / 2.5;
            _this.innerRadius = _this.outerRadius * 0.65;
            _this.transform = "translate(" + xOffset + " , " + yOffset + ")";
        });
    };
    SimplePieChartComponent.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    SimplePieChartComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    SimplePieChartComponent.prototype.setColors = function () {
        this.colors = new ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SimplePieChartComponent.prototype, "gradient", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SimplePieChartComponent.prototype, "totalLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], SimplePieChartComponent.prototype, "totalValue", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SimplePieChartComponent.prototype, "unit", void 0);
    SimplePieChartComponent = __decorate([
        Component({
            selector: 'ngx-charts-simple-pie-chart',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"false\">\n      <svg:g\n        [attr.transform]=\"transform\"\n        class=\"pie chart\">\n        <svg:g ngx-charts-pie-series\n          [colors]=\"colors\"\n          [series]=\"results\"\n          [innerRadius]=\"innerRadius\"\n          [outerRadius]=\"outerRadius\"\n          [gradient]=\"gradient\">\n        </svg:g>\n        <svg:text\n          class=\"label\"\n          dy=\"-0.5em\"\n          x=\"0\"\n          y=\"5\"\n          text-anchor=\"middle\">\n          {{ totalLabel }}\n        </svg:text>\n        <svg:text\n          class=\"label percent-label\"\n          dy=\"0.5em\"\n          x=\"0\"\n          y=\"5\"\n          ngx-charts-count-up\n          [countTo]=\"totalValue\"\n          [countSuffix]=\"unit\"\n          text-anchor=\"middle\">\n        </svg:text>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
        })
    ], SimplePieChartComponent);
    return SimplePieChartComponent;
}(BaseChartComponent));
export { SimplePieChartComponent };
//# sourceMappingURL=simple-pie-chart.component.js.map