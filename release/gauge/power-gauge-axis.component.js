import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { select } from 'd3-selection';
import { line, curveMonotoneX } from 'd3-shape';
import { easeElastic } from 'd3-ease';
var PowerGaugeAxisComponent = (function () {
    function PowerGaugeAxisComponent() {
        this.pointerWidth = 16;
        this.pointerTailLength = 8;
        this.rotate = '';
    }
    PowerGaugeAxisComponent.prototype.ngOnChanges = function () {
        this.update();
    };
    PowerGaugeAxisComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            setInterval(function () {
                var pointerAngle = _this.pointerAngle;
                var moveTick = Math.random() * 2;
                _this.updatePointer(pointerAngle + moveTick, 0, 750);
            }, 500);
        }, 1500);
    };
    PowerGaugeAxisComponent.prototype.update = function () {
        this.rotationAngle = this.startAngle;
        this.rotate = "rotate(" + this.rotationAngle + ")";
        this.ticks = this.getTicks();
        if (this.pointerAngle) {
            this.updatePointer(this.pointerAngle, 750, 750);
        }
    };
    PowerGaugeAxisComponent.prototype.updatePointer = function (pointerAngle, delay, duration) {
        var pointer = select('.pointer');
        var pointerRotate = "rotate(" + pointerAngle + ")";
        var ease = easeElastic.period(0.8);
        pointer
            .transition().delay(delay).duration(duration)
            .ease(ease)
            .attr('transform', pointerRotate);
    };
    PowerGaugeAxisComponent.prototype.getTicks = function () {
        var bigTickSegment = this.angleSpan / this.bigSegments.length;
        var tickLength = this.outerRadius - this.innerRadius;
        var ticks = [];
        var startDistance = this.innerRadius;
        var textDist = this.outerRadius + 20;
        var startAngle = this.startAngle * Math.PI / 180;
        var bigSegment;
        for (var i = 0; i < this.bigSegments.length; i++) {
            bigSegment = this.bigSegments[i];
            var data = bigSegment.data, endAngle = bigSegment.endAngle, textAnchor = bigSegment.textAnchor;
            var text = data.value;
            if (this.tickFormatting) {
                text = this.tickFormatting(text);
            }
            ticks.push({
                line: this.getTickPath(startDistance, tickLength, endAngle),
                textAnchor: bigSegment.textAnchor,
                text: text,
                textTransform: "\n          translate(" + textDist * Math.cos(endAngle) + ", " + textDist * Math.sin(endAngle) + ") rotate(" + -this.rotationAngle + ")\n        "
            });
            startAngle = endAngle;
        }
        return ticks;
    };
    PowerGaugeAxisComponent.prototype.getTickPath = function (startDistance, tickLength, angle) {
        var y1 = startDistance * Math.sin(angle);
        var y2 = (startDistance + tickLength) * Math.sin(angle);
        var x1 = startDistance * Math.cos(angle);
        var x2 = (startDistance + tickLength) * Math.cos(angle);
        var points = [{ x: x1, y: y1 }, { x: x2, y: y2 }];
        var lineObj = line().x(function (d) { return d.x; }).y(function (d) { return d.y; });
        return lineObj(points);
    };
    PowerGaugeAxisComponent.prototype.getPointerPath = function () {
        var rw = this.dims.width / 2;
        var rh = this.dims.height / 2;
        var r = rw < rh ? rw : rh;
        var pointerHeadLength = Math.round(r * 0.9);
        var pointerLine = [{ x: this.pointerWidth / 2, y: 0 },
            { x: 0, y: -pointerHeadLength },
            { x: -(this.pointerWidth / 2), y: 0 },
            { x: 0, y: this.pointerTailLength },
            { x: this.pointerWidth / 2, y: 0 }];
        var lineGenerator = line().x(function (d) { return d.x; }).y(function (d) { return d.y; }).curve(curveMonotoneX);
        return lineGenerator(pointerLine);
    };
    return PowerGaugeAxisComponent;
}());
export { PowerGaugeAxisComponent };
PowerGaugeAxisComponent.decorators = [
    { type: Component, args: [{
                selector: 'g[ngx-charts-power-gauge-axis]',
                template: "\n  <svg:g [attr.transform]=\"rotate\">\n    <svg:g *ngFor=\"let tick of ticks\"\n        class=\"gauge-tick gauge-tick-large\">\n        <svg:path [attr.d]=\"tick.line\" />\n    </svg:g>\n    <svg:g *ngFor=\"let tick of ticks\"\n        class=\"gauge-tick gauge-tick-large\">\n        <svg:text\n            [style.textAnchor]=\"tick.textAnchor\"\n            [attr.transform]=\"tick.textTransform\"\n            alignment-baseline=\"central\">\n            {{tick.text}}\n        </svg:text>\n    </svg:g>\n  </svg:g>\n  <svg:g [attr.transform]=\"'rotate(0)'\" class=\"pointer\">\n    <svg:g>\n      <svg:path\n        [attr.d]=\"getPointerPath()\"\n      />\n    </svg:g>\n  </svg:g>\n  ",
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
PowerGaugeAxisComponent.ctorParameters = function () { return []; };
PowerGaugeAxisComponent.propDecorators = {
    'bigSegments': [{ type: Input },],
    'startAngle': [{ type: Input },],
    'pointerAngle': [{ type: Input },],
    'angleSpan': [{ type: Input },],
    'outerRadius': [{ type: Input },],
    'innerRadius': [{ type: Input },],
    'cornerRadius': [{ type: Input },],
    'tickFormatting': [{ type: Input },],
    'dims': [{ type: Input },],
    'pointerWidth': [{ type: Input },],
    'pointerTailLength': [{ type: Input },],
};
//# sourceMappingURL=power-gauge-axis.component.js.map