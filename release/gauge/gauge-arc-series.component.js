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
import { formatLabel } from '../common/label.helper';
var GaugeArcSeriesComponent = /** @class */ (function () {
    function GaugeArcSeriesComponent() {
    }
    GaugeArcSeriesComponent.prototype.ngOnChanges = function () {
        this.update();
    };
    GaugeArcSeriesComponent.prototype.update = function () {
        this.arcs = this.getArcs();
    };
    GaugeArcSeriesComponent.prototype.getArcs = function () {
        var arcs = [];
        var startAngle = this.startAngle * Math.PI / 180;
        var bigSegment;
        for (var i = 0; i < this.bigSegments.length; i++) {
            bigSegment = this.bigSegments[i];
            var data = bigSegment.data, endAngle = bigSegment.endAngle;
            arcs.push({
                startAngle: startAngle,
                endAngle: endAngle,
                data: data
            });
            startAngle = endAngle;
        }
        return arcs;
    };
    GaugeArcSeriesComponent.prototype.color = function (arc) {
        return this.colors.getColor(this.label(arc));
    };
    GaugeArcSeriesComponent.prototype.label = function (arc) {
        return formatLabel(arc.data.name);
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], GaugeArcSeriesComponent.prototype, "bigSegments", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], GaugeArcSeriesComponent.prototype, "colors", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], GaugeArcSeriesComponent.prototype, "startAngle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], GaugeArcSeriesComponent.prototype, "angleSpan", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], GaugeArcSeriesComponent.prototype, "innerRadius", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], GaugeArcSeriesComponent.prototype, "outerRadius", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], GaugeArcSeriesComponent.prototype, "cornerRadius", void 0);
    GaugeArcSeriesComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-gauge-arc-series]',
            template: "\n  <svg:g *ngFor=\"let arc of arcs\">\n    <svg:g ngx-charts-pie-arc\n        [startAngle]=\"arc.startAngle\"\n        [endAngle]=\"arc.endAngle\"\n        [innerRadius]=\"innerRadius\"\n        [outerRadius]=\"outerRadius\"\n        [cornerRadius]=\"cornerRadius\"\n        [fill]=\"color(arc)\"\n        [data]=\"arc.data\"\n        [animate]=\"true\">\n    </svg:g>\n  </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], GaugeArcSeriesComponent);
    return GaugeArcSeriesComponent;
}());
export { GaugeArcSeriesComponent };
//# sourceMappingURL=gauge-arc-series.component.js.map