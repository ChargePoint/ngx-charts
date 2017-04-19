import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { formatLabel } from '../common/label.helper';
var GaugeArcSeriesComponent = (function () {
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
    return GaugeArcSeriesComponent;
}());
export { GaugeArcSeriesComponent };
GaugeArcSeriesComponent.decorators = [
    { type: Component, args: [{
                selector: 'g[ngx-charts-gauge-arc-series]',
                template: "\n  <svg:g *ngFor=\"let arc of arcs\">\n    <svg:g ngx-charts-pie-arc\n        [startAngle]=\"arc.startAngle\"\n        [endAngle]=\"arc.endAngle\"\n        [innerRadius]=\"innerRadius\"\n        [outerRadius]=\"outerRadius\"\n        [cornerRadius]=\"cornerRadius\"\n        [fill]=\"color(arc)\"\n        [data]=\"arc.data\"\n        [animate]=\"true\">\n    </svg:g>\n  </svg:g>\n  ",
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
GaugeArcSeriesComponent.ctorParameters = function () { return []; };
GaugeArcSeriesComponent.propDecorators = {
    'bigSegments': [{ type: Input },],
    'colors': [{ type: Input },],
    'startAngle': [{ type: Input },],
    'angleSpan': [{ type: Input },],
    'innerRadius': [{ type: Input },],
    'outerRadius': [{ type: Input },],
    'cornerRadius': [{ type: Input },],
};
//# sourceMappingURL=gauge-arc-series.component.js.map