import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
/**
 * `e-day-working-time-collection` directive represent a working time ranges in a day.
 * It must be contained in a Gantt component(`ejs-gantt`).
 * ```html
 * <ejs-gantt [dataSource]='data' allowSelection='true' allowSorting='true'>
 *   <e-day-working-time-collection>
 *     <e-day-working-time from='8' to='12'></e-day-working-time>
 *     <e-day-working-time from='13' to='17'></e-day-working-time>
 *   </e-day-working-time-collection>
 * </ejs-gantt>
 * ```
 */
export declare class DayWorkingTimeDirective extends ComplexBase<DayWorkingTimeDirective> {
    private viewContainerRef;
    directivePropList: any;
    /**
     * Defines start time of working time range.
     * @default null
     */
    from: any;
    /**
     * Defines end time of working time range.
     * @default null
     */
    to: any;
    constructor(viewContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<DayWorkingTimeDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DayWorkingTimeDirective, "ejs-gantt>e-day-working-time-collection>e-day-working-time", never, { "from": "from"; "to": "to"; }, {}, never>;
}
/**
 * DayWorkingTime Array Directive
 * @private
 */
export declare class DayWorkingTimeCollectionDirective extends ArrayBase<DayWorkingTimeCollectionDirective> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<DayWorkingTimeCollectionDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DayWorkingTimeCollectionDirective, "ejs-gantt>e-day-working-time-collection", never, {}, {}, ["children"]>;
}
