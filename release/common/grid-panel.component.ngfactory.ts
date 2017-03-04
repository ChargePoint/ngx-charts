/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from '../../../build/common/grid-panel.component';
import * as import1 from '@angular/core/src/change_detection/change_detection_util';
import * as import2 from '@angular/core/src/linker/view';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/render/api';
import * as import5 from '@angular/core/src/metadata/view';
import * as import6 from '@angular/core/src/linker/view_type';
import * as import7 from '@angular/core/src/change_detection/constants';
import * as import8 from '@angular/core/src/linker/component_factory';
export class Wrapper_GridPanelComponent {
  /*private*/ _eventHandler:Function;
  context:import0.GridPanelComponent;
  /*private*/ _changed:boolean;
  /*private*/ _expr_0:any;
  /*private*/ _expr_1:any;
  /*private*/ _expr_2:any;
  /*private*/ _expr_3:any;
  /*private*/ _expr_4:any;
  constructor() {
    this._changed = false;
    this.context = new import0.GridPanelComponent();
    this._expr_0 = import1.UNINITIALIZED;
    this._expr_1 = import1.UNINITIALIZED;
    this._expr_2 = import1.UNINITIALIZED;
    this._expr_3 = import1.UNINITIALIZED;
    this._expr_4 = import1.UNINITIALIZED;
  }
  ngOnDetach(view:import2.AppView<any>,componentView:import2.AppView<any>,el:any):void {
  }
  ngOnDestroy():void {
  }
  check_path(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_0,currValue))) {
      this._changed = true;
      this.context.path = currValue;
      this._expr_0 = currValue;
    }
  }
  check_width(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_1,currValue))) {
      this._changed = true;
      this.context.width = currValue;
      this._expr_1 = currValue;
    }
  }
  check_height(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_2,currValue))) {
      this._changed = true;
      this.context.height = currValue;
      this._expr_2 = currValue;
    }
  }
  check_x(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_3,currValue))) {
      this._changed = true;
      this.context.x = currValue;
      this._expr_3 = currValue;
    }
  }
  check_y(currValue:any,throwOnChange:boolean,forceUpdate:boolean):void {
    if ((forceUpdate || import3.checkBinding(throwOnChange,this._expr_4,currValue))) {
      this._changed = true;
      this.context.y = currValue;
      this._expr_4 = currValue;
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
    return result;
  }
  subscribe(view:import2.AppView<any>,_eventHandler:any):void {
    this._eventHandler = _eventHandler;
  }
}
var renderType_GridPanelComponent_Host:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,([] as any[]),{});
class View_GridPanelComponent_Host0 extends import2.AppView<any> {
  _el_0:any;
  compView_0:import2.AppView<import0.GridPanelComponent>;
  _GridPanelComponent_0_3:Wrapper_GridPanelComponent;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_GridPanelComponent_Host0,renderType_GridPanelComponent_Host,import6.ViewType.HOST,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer,'g',new import3.InlineArray2(2,'ngx-charts-grid-panel',''),rootSelector,(null as any));
    this.compView_0 = new View_GridPanelComponent0(this.viewUtils,this,0,this._el_0);
    this._GridPanelComponent_0_3 = new Wrapper_GridPanelComponent();
    this.compView_0.create(this._GridPanelComponent_0_3.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return new import8.ComponentRef_<any>(0,this,this._el_0,this._GridPanelComponent_0_3.context);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import0.GridPanelComponent) && (0 === requestNodeIndex))) { return this._GridPanelComponent_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    if (this._GridPanelComponent_0_3.ngDoCheck(this,this._el_0,throwOnChange)) { this.compView_0.markAsCheckOnce(); }
    this.compView_0.internalDetectChanges(throwOnChange);
  }
  destroyInternal():void {
    this.compView_0.destroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
export const GridPanelComponentNgFactory:import8.ComponentFactory<import0.GridPanelComponent> = new import8.ComponentFactory<import0.GridPanelComponent>('g[ngx-charts-grid-panel]',View_GridPanelComponent_Host0,import0.GridPanelComponent);
const styles_GridPanelComponent:any[] = ([] as any[]);
var renderType_GridPanelComponent:import4.RenderComponentType = import3.createRenderComponentType('',0,import5.ViewEncapsulation.None,styles_GridPanelComponent,{});
export class View_GridPanelComponent0 extends import2.AppView<import0.GridPanelComponent> {
  _text_0:any;
  _el_1:any;
  _text_2:any;
  /*private*/ _expr_3:any;
  /*private*/ _expr_4:any;
  /*private*/ _expr_5:any;
  /*private*/ _expr_6:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import2.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_GridPanelComponent0,renderType_GridPanelComponent,import6.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import7.ChangeDetectorStatus.CheckOnce);
    this._expr_3 = import1.UNINITIALIZED;
    this._expr_4 = import1.UNINITIALIZED;
    this._expr_5 = import1.UNINITIALIZED;
    this._expr_6 = import1.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import8.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._text_0 = this.renderer.createText(parentRenderNode,'\n    ',(null as any));
    this._el_1 = import3.createRenderElement(this.renderer,parentRenderNode,':svg:rect',new import3.InlineArray4(4,'class','gridpanel','stroke','none'),(null as any));
    this._text_2 = this.renderer.createText(parentRenderNode,'\n  ',(null as any));
    this.init((null as any),((<any>this.renderer).directRenderer? (null as any): [
      this._text_0,
      this._el_1,
      this._text_2
    ]
    ),(null as any));
    return (null as any);
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_3:any = this.context.height;
    if (import3.checkBinding(throwOnChange,this._expr_3,currVal_3)) {
      this.renderer.setElementAttribute(this._el_1,'height',((currVal_3 == null)? (null as any): currVal_3.toString()));
      this._expr_3 = currVal_3;
    }
    const currVal_4:any = this.context.width;
    if (import3.checkBinding(throwOnChange,this._expr_4,currVal_4)) {
      this.renderer.setElementAttribute(this._el_1,'width',((currVal_4 == null)? (null as any): currVal_4.toString()));
      this._expr_4 = currVal_4;
    }
    const currVal_5:any = this.context.x;
    if (import3.checkBinding(throwOnChange,this._expr_5,currVal_5)) {
      this.renderer.setElementAttribute(this._el_1,'x',((currVal_5 == null)? (null as any): currVal_5.toString()));
      this._expr_5 = currVal_5;
    }
    const currVal_6:any = this.context.y;
    if (import3.checkBinding(throwOnChange,this._expr_6,currVal_6)) {
      this.renderer.setElementAttribute(this._el_1,'y',((currVal_6 == null)? (null as any): currVal_6.toString()));
      this._expr_6 = currVal_6;
    }
  }
}