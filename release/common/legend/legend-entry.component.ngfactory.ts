/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from '../../../../build/common/legend/legend-entry.component';
import * as import1 from '@angular/core/src/change_detection/change_detection_util';
import * as import2 from '@angular/core/src/linker/view';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/render/api';
import * as import5 from '@angular/core/src/metadata/view';
import * as import6 from '@angular/core/src/linker/view_type';
import * as import7 from '@angular/core/src/change_detection/constants';
import * as import8 from '@angular/core/src/linker/component_factory';
import * as import9 from '@angular/core/src/security';
export class Wrapper_LegendEntryComponent {
  /*private*/ _eventHandler:Function;
  context:import0.LegendEntryComponent;
  /*private*/ _changed:boolean;
  /*private*/ _expr_0:any;
  /*private*/ _expr_1:any;
  /*private*/ _expr_2:any;
  /*private*/ _expr_3:any;
  subscription0:any;
  subscription1:any;
  subscription2:any;
  subscription3:any;
  constructor() {
    this._changed = false;
    this.context = new import0.LegendEntryComponent();
    this._expr_0 = import1.UNINITIALIZED;
    this._expr_1 = import1.UNINITIALIZED;
    this._expr_2 = import1.UNINITIALIZED;
    this._expr_3 = import1.UNINITIALIZED;
  }
  ngOnDetach(view:import2.AppView<any>,componentView:import2.AppView<any>,el:any):void {
  }
  ngOnDestroy():void {
    (this.subscription0 && this.subscription0.unsubscribe());
    (this.subscription1 && this.subscription1.unsubscribe());
    (this.subscription2 && this.subscription2.unsubscribe());
    (this.subscription3 && this.subscription3.unsubscribe());
  }
  check_color(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_0,currValue))) {
      this._changed = true;
      this.context.color = currValue;
      this._expr_0 = currValue;
    }
  }
  check_label(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_1,currValue))) {
      this._changed = true;
      this.context.label = currValue;
      this._expr_1 = currValue;
    }
  }
  check_formattedLabel(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_2,currValue))) {
      this._changed = true;
      this.context.formattedLabel = currValue;
      this._expr_2 = currValue;
    }
  }
  check_isActive(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_3,currValue))) {
      this._changed = true;
      this.context.isActive = currValue;
      this._expr_3 = currValue;
    }
  }
  ngDoCheck(view:import2.AppView<any>,el:any,throwOnChange:boolean):boolean {
    var changed:any = this._changed;
    this._changed = false;
    return changed;
  }
  checkHost(view:import2.AppView<any>,componentView:import2.AppView<any>,el:any,throwOnChange:boolean):void {
  }
  handleEvent(eventName:string,$event:any):boolean {
    var result:boolean = true;
    if ((eventName == 'mouseenter')) {
      const pd_sub_0:any = ((<any>this.context.onMouseEnter()) !== false);
      result = (pd_sub_0 && result);
    }
    if ((eventName == 'mouseleave')) {
      const pd_sub_1:any = ((<any>this.context.onMouseLeave()) !== false);
      result = (pd_sub_1 && result);
    }
    return result;
  }
  subscribe(view:import2.AppView<any>,_eventHandler:any,emit0:boolean,emit1:boolean,emit2:boolean,emit3:boolean):void {
    this._eventHandler = _eventHandler;
    if (emit0) { (this.subscription0 = this.context.select.subscribe(_eventHandler.bind(view,'select'))); }
    if (emit1) { (this.subscription1 = this.context.activate.subscribe(_eventHandler.bind(view,'activate'))); }
    if (emit2) { (this.subscription2 = this.context.deactivate.subscribe(_eventHandler.bind(view,'deactivate'))); }
    if (emit3) { (this.subscription3 = this.context.toggle.subscribe(_eventHandler.bind(view,'toggle'))); }
  }
}
var renderType_LegendEntryComponent_Host:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,([] as any[]),{});
class View_LegendEntryComponent_Host0 extends import2.AppView<any> {
  _el_0:any;
  compView_0:import2.AppView<import0.LegendEntryComponent>;
  _LegendEntryComponent_0_3:Wrapper_LegendEntryComponent;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_LegendEntryComponent_Host0,renderType_LegendEntryComponent_Host,import6.ViewType.HOST,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer,'ngx-charts-legend-entry',import3.EMPTY_INLINE_ARRAY,rootSelector,(null as any));
    this.compView_0 = new View_LegendEntryComponent0(this.viewUtils,this,0,this._el_0);
    this._LegendEntryComponent_0_3 = new Wrapper_LegendEntryComponent();
    this.compView_0.create(this._LegendEntryComponent_0_3.context);
    var disposable_0:Function = import3.subscribeToRenderElement(this,this._el_0,new import3.InlineArray4(4,'mouseenter',(null as any),'mouseleave',(null as any)),this.eventHandler(this.handleEvent_0));
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),[disposable_0]);
    return new import8.ComponentRef_<any>(0,this,this._el_0,this._LegendEntryComponent_0_3.context);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import0.LegendEntryComponent) && (0 === requestNodeIndex))) { return this._LegendEntryComponent_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    if (this._LegendEntryComponent_0_3.ngDoCheck(this,this._el_0,throwOnChange)) { this.compView_0.markAsCheckOnce(); }
    this.compView_0.internalDetectChanges(throwOnChange);
  }
  destroyInternal():void {
    this.compView_0.destroy();
    this._LegendEntryComponent_0_3.ngOnDestroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
  handleEvent_0(eventName:string,$event:any):boolean {
    this.compView_0.markPathToRootAsCheckOnce();
    var result:boolean = true;
    result = (this._LegendEntryComponent_0_3.handleEvent(eventName,$event) && result);
    return result;
  }
}
export const LegendEntryComponentNgFactory:import8.ComponentFactory<import0.LegendEntryComponent> = new import8.ComponentFactory<import0.LegendEntryComponent>('ngx-charts-legend-entry',View_LegendEntryComponent_Host0,import0.LegendEntryComponent);
const styles_LegendEntryComponent:any[] = ([] as any[]);
var renderType_LegendEntryComponent:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,styles_LegendEntryComponent,{});
export class View_LegendEntryComponent0 extends import2.AppView<import0.LegendEntryComponent> {
  _text_0:any;
  _el_1:any;
  _text_2:any;
  _el_3:any;
  _text_4:any;
  _text_5:any;
  _el_6:any;
  _text_7:any;
  _text_8:any;
  _text_9:any;
  /*private*/ _expr_10:any;
  /*private*/ _expr_11:any;
  /*private*/ _expr_12:any;
  /*private*/ _expr_13:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_LegendEntryComponent0,renderType_LegendEntryComponent,import6.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckOnce);
    this._expr_10 = import1.UNINITIALIZED;
    this._expr_11 = import1.UNINITIALIZED;
    this._expr_12 = import1.UNINITIALIZED;
    this._expr_13 = import1.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._text_0 = this.renderer.createText(parentRenderNode,'\n    ',(null as any));
    this._el_1 = import3.createRenderElement(this.renderer,parentRenderNode,'span',new import3.InlineArray2(2,'tabindex','-1'),(null as any));
    this._text_2 = this.renderer.createText(this._el_1,'\n      ',(null as any));
    this._el_3 = import3.createRenderElement(this.renderer,this._el_1,'span',new import3.InlineArray2(2,'class','legend-label-color'),(null as any));
    this._text_4 = this.renderer.createText(this._el_3,'\n      ',(null as any));
    this._text_5 = this.renderer.createText(this._el_1,'\n      ',(null as any));
    this._el_6 = import3.createRenderElement(this.renderer,this._el_1,'span',new import3.InlineArray2(2,'class','legend-label-text'),(null as any));
    this._text_7 = this.renderer.createText(this._el_6,'',(null as any));
    this._text_8 = this.renderer.createText(this._el_1,'\n    ',(null as any));
    this._text_9 = this.renderer.createText(parentRenderNode,'\n  ',(null as any));
    var disposable_0:Function = import3.subscribeToRenderElement(this,this._el_1,new import3.InlineArray2(2,'click',(null as any)),this.eventHandler(this.handleEvent_1));
    var disposable_1:Function = import3.subscribeToRenderElement(this,this._el_3,new import3.InlineArray2(2,'click',(null as any)),this.eventHandler(this.handleEvent_3));
    this.init((null as any),((<any>this.renderer).directRenderer? (null as any): [
      this._text_0,
      this._el_1,
      this._text_2,
      this._el_3,
      this._text_4,
      this._text_5,
      this._el_6,
      this._text_7,
      this._text_8,
      this._text_9
    ]
    ),[
      disposable_0,
      disposable_1
    ]
    );
    return (null as any);
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_10:any = this.context.formattedLabel;
    if (import3.checkBinding(throwOnChange,this._expr_10,currVal_10)) {
      this.renderer.setElementProperty(this._el_1,'title',currVal_10);
      this._expr_10 = currVal_10;
    }
    const currVal_11:any = this.context.isActive;
    if (import3.checkBinding(throwOnChange,this._expr_11,currVal_11)) {
      this.renderer.setElementClass(this._el_1,'active',currVal_11);
      this._expr_11 = currVal_11;
    }
    const currVal_12:any = this.context.color;
    if (import3.checkBinding(throwOnChange,this._expr_12,currVal_12)) {
      this.renderer.setElementStyle(this._el_3,'background-color',((this.viewUtils.sanitizer.sanitize(import9.SecurityContext.STYLE,currVal_12) == null)? (null as any): this.viewUtils.sanitizer.sanitize(import9.SecurityContext.STYLE,currVal_12).toString()));
      this._expr_12 = currVal_12;
    }
    const currVal_13:any = import3.inlineInterpolate(1,'\n        ',this.context.trimmedLabel,'\n      ');
    if (import3.checkBinding(throwOnChange,this._expr_13,currVal_13)) {
      this.renderer.setText(this._text_7,currVal_13);
      this._expr_13 = currVal_13;
    }
  }
  handleEvent_1(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    if ((eventName == 'click')) {
      const pd_sub_0:any = ((<any>this.context.select.emit(this.context.formattedLabel)) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
  handleEvent_3(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    if ((eventName == 'click')) {
      const pd_sub_0:any = ((<any>this.context.toggle.emit(this.context.formattedLabel)) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
}