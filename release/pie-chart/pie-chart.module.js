var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { AdvancedPieChartComponent } from './advanced-pie-chart.component';
import { PieLabelComponent } from './pie-label.component';
import { PieArcComponent } from './pie-arc.component';
import { PieChartComponent } from './pie-chart.component';
import { SimplePieChartComponent } from './simple-pie-chart.component';
import { PieGridComponent } from './pie-grid.component';
import { PieGridSeriesComponent } from './pie-grid-series.component';
import { PieSeriesComponent } from './pie-series.component';
<<<<<<< HEAD
export { AdvancedPieChartComponent, PieLabelComponent, PieArcComponent, PieChartComponent, SimplePieChartComponent, PieGridComponent, PieGridSeriesComponent, PieSeriesComponent };
var PieChartModule = (function () {
=======
var PieChartModule = /** @class */ (function () {
>>>>>>> tags/10.0.0
    function PieChartModule() {
    }
    PieChartModule = __decorate([
        NgModule({
            imports: [ChartCommonModule],
            declarations: [
                AdvancedPieChartComponent,
                PieLabelComponent,
                PieArcComponent,
                PieChartComponent,
                PieGridComponent,
                PieGridSeriesComponent,
                PieSeriesComponent
            ],
            exports: [
                AdvancedPieChartComponent,
                PieLabelComponent,
                PieArcComponent,
                PieChartComponent,
                PieGridComponent,
                PieGridSeriesComponent,
                PieSeriesComponent
            ]
        })
    ], PieChartModule);
    return PieChartModule;
}());
export { PieChartModule };
<<<<<<< HEAD
PieChartModule.decorators = [
    { type: NgModule, args: [{
                imports: [ChartCommonModule],
                declarations: [
                    AdvancedPieChartComponent,
                    PieLabelComponent,
                    PieArcComponent,
                    PieChartComponent,
                    SimplePieChartComponent,
                    PieGridComponent,
                    PieGridSeriesComponent,
                    PieSeriesComponent
                ],
                exports: [
                    AdvancedPieChartComponent,
                    PieLabelComponent,
                    PieArcComponent,
                    PieChartComponent,
                    SimplePieChartComponent,
                    PieGridComponent,
                    PieGridSeriesComponent,
                    PieSeriesComponent
                ]
            },] },
];
/** @nocollapse */
PieChartModule.ctorParameters = function () { return []; };
=======
>>>>>>> tags/10.0.0
//# sourceMappingURL=pie-chart.module.js.map