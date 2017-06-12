import { Component, Input, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { easeElastic } from 'd3-ease';
import { select } from 'd3-selection';
import { curveMonotoneX, line } from 'd3-shape';
var PowerGaugeAxisComponent = (function () {
    function PowerGaugeAxisComponent(zone) {
        this.zone = zone;
        this.pointerWidth = 13;
        this.pointerTailLength = 8;
        this.rotate = '';
    }
    PowerGaugeAxisComponent.prototype.ngOnChanges = function () {
        this.update();
    };
    // ngOnDestroy() {
    //   this.stopAnimation();
    // }
    PowerGaugeAxisComponent.prototype.startAnimation = function (pointerAngle) {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.animator = setInterval(function () {
                var moveTick = Math.random() * 2;
                _this.updatePointer(pointerAngle + moveTick, 0, 750, 1);
            }, 300);
        });
    };
    PowerGaugeAxisComponent.prototype.stopAnimation = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            clearInterval(_this.animator);
        });
    };
    PowerGaugeAxisComponent.prototype.update = function () {
        this.rotationAngle = this.startAngle;
        this.rotate = "rotate(" + this.rotationAngle + ")";
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
    };
    PowerGaugeAxisComponent.prototype.updatePointer = function (pointerAngle, delay, duration, easeValue) {
        var pointer = select('.pointer');
        var pointerRotate = "rotate(" + pointerAngle + ")";
        var ease = easeElastic.period(easeValue);
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
                label: data.name,
                labelTransform: "\n          translate(" + (textDist * Math.cos(endAngle) + 20) + ",\n          " + (textDist * Math.sin(endAngle) - 10) + ") rotate(" + -this.rotationAngle + ")\n        ",
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
        var lineGenerator = line().x(function (d) { return d.x; }).y(function (d) { return d.y; });
        return lineGenerator(points);
    };
    PowerGaugeAxisComponent.prototype.getPointerPath = function () {
        var rw = this.dims.width / 2;
        var rh = this.dims.height / 2;
        var r = rw < rh ? rw : rh;
        var pointerHeadLength = r + this.pointerWidth;
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
                template: "\n  <svg:g [attr.transform]=\"rotate\">\n    <svg:g *ngFor=\"let tick of ticks\"\n        class=\"gauge-tick gauge-tick-large\">\n        <svg:path [attr.d]=\"tick.line\" />\n    </svg:g>\n    <svg:g *ngFor=\"let tick of ticks\"\n        class=\"gauge-tick gauge-tick-large\">\n        <svg:text *ngIf=\"tick.label\"\n            [style.textAnchor]=\"tick.textAnchor\"\n            [attr.transform]=\"tick.labelTransform\"\n            alignment-baseline=\"central\">\n            {{tick.label}}\n        </svg:text>\n        <svg:text\n            [style.textAnchor]=\"tick.textAnchor\"\n            [attr.transform]=\"tick.textTransform\"\n            alignment-baseline=\"central\">\n            {{tick.text}}\n        </svg:text>\n    </svg:g>\n  </svg:g>\n  <svg:g [attr.transform]=\"'rotate(0)'\" class=\"pointer\">\n    <svg:g>\n      <svg:path\n        [attr.d]=\"getPointerPath()\"\n      />\n    </svg:g>\n  </svg:g>\n  ",
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
PowerGaugeAxisComponent.ctorParameters = function () { return [
    { type: NgZone, },
]; };
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