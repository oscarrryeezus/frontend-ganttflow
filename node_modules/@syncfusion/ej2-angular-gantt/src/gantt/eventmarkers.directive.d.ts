import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
/**
 * `e-event-markers` directive represent a event marker collection in Gantt.
 * It must be contained in a Gantt component(`ejs-gantt`).
 * ```html
 * <ejs-gantt [dataSource]='data' allowSelection='true' allowSorting='true'>
 *   <e-event-markers>
 *     <e-event-marker day='02/10/2018' label='Project Starts'></e-event-marker>
 *   </e-event-markers>
 * </ejs-gantt>
 * ```
 */
export declare class EventMarkerDirective extends ComplexBase<EventMarkerDirective> {
    private viewContainerRef;
    directivePropList: any;
    /**
     * Define custom css class for event marker to customize line and label.
     * @default null
     */
    cssClass: any;
    /**
     * Defines day of event marker.
     * @default null
     */
    day: any;
    /**
     * Defines label of event marker.
     * @default null
     */
    label: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<EventMarkerDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<EventMarkerDirective, "ejs-gantt>e-event-markers>e-event-marker", never, { "cssClass": "cssClass"; "day": "day"; "label": "label"; }, {}, never>;
}
/**
 * EventMarker Array Directive
 * @private
 */
export declare class EventMarkersDirective extends ArrayBase<EventMarkersDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<EventMarkersDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<EventMarkersDirective, "ejs-gantt>e-event-markers", never, {}, {}, ["children"]>;
}
