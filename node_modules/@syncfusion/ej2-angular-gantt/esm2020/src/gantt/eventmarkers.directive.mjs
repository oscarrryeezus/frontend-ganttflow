import { Directive, ContentChildren } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['cssClass', 'day', 'label'];
let outputs = [];
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
export class EventMarkerDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
EventMarkerDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: EventMarkerDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
EventMarkerDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: EventMarkerDirective, selector: "ejs-gantt>e-event-markers>e-event-marker", inputs: { cssClass: "cssClass", day: "day", label: "label" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: EventMarkerDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-gantt>e-event-markers>e-event-marker',
                    inputs: input,
                    outputs: outputs,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * EventMarker Array Directive
 * @private
 */
export class EventMarkersDirective extends ArrayBase {
    constructor() {
        super('eventmarkers');
    }
}
EventMarkersDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: EventMarkersDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
EventMarkersDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: EventMarkersDirective, selector: "ejs-gantt>e-event-markers", queries: [{ propertyName: "children", predicate: EventMarkerDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: EventMarkersDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-gantt>e-event-markers',
                    queries: {
                        children: new ContentChildren(EventMarkerDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRtYXJrZXJzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9nYW50dC9ldmVudG1hcmtlcnMuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQW9CLGVBQWUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7QUFJaEYsSUFBSSxLQUFLLEdBQWEsQ0FBQyxVQUFVLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ25ELElBQUksT0FBTyxHQUFhLEVBQUUsQ0FBQztBQUMzQjs7Ozs7Ozs7OztHQVVHO0FBU0gsTUFBTSxPQUFPLG9CQUFxQixTQUFRLFdBQWlDO0lBcUJ2RSxZQUFvQixnQkFBaUM7UUFDakQsS0FBSyxFQUFFLENBQUM7UUFEUSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBRWpELFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO0lBQ25DLENBQUM7O2lIQTFCUSxvQkFBb0I7cUdBQXBCLG9CQUFvQjsyRkFBcEIsb0JBQW9CO2tCQVJoQyxTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSwwQ0FBMEM7b0JBQ3BELE1BQU0sRUFBRSxLQUFLO29CQUNiLE9BQU8sRUFBRSxPQUFPO29CQUNoQixPQUFPLEVBQUUsRUFFUjtpQkFDSjs7QUE4QkQ7OztHQUdHO0FBT0gsTUFBTSxPQUFPLHFCQUFzQixTQUFRLFNBQWdDO0lBQ3ZFO1FBQ0ksS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzFCLENBQUM7O2tIQUhRLHFCQUFxQjtzR0FBckIscUJBQXFCLDBGQUhJLG9CQUFvQjsyRkFHN0MscUJBQXFCO2tCQU5qQyxTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSwyQkFBMkI7b0JBQ3JDLE9BQU8sRUFBRTt3QkFDTCxRQUFRLEVBQUUsSUFBSSxlQUFlLENBQUMsb0JBQW9CLENBQUM7cUJBQ3REO2lCQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBWaWV3Q29udGFpbmVyUmVmLCBDb250ZW50Q2hpbGRyZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbXBsZXhCYXNlLCBBcnJheUJhc2UsIHNldFZhbHVlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5cblxuXG5sZXQgaW5wdXQ6IHN0cmluZ1tdID0gWydjc3NDbGFzcycsICdkYXknLCAnbGFiZWwnXTtcbmxldCBvdXRwdXRzOiBzdHJpbmdbXSA9IFtdO1xuLyoqXG4gKiBgZS1ldmVudC1tYXJrZXJzYCBkaXJlY3RpdmUgcmVwcmVzZW50IGEgZXZlbnQgbWFya2VyIGNvbGxlY3Rpb24gaW4gR2FudHQuIFxuICogSXQgbXVzdCBiZSBjb250YWluZWQgaW4gYSBHYW50dCBjb21wb25lbnQoYGVqcy1nYW50dGApLiBcbiAqIGBgYGh0bWxcbiAqIDxlanMtZ2FudHQgW2RhdGFTb3VyY2VdPSdkYXRhJyBhbGxvd1NlbGVjdGlvbj0ndHJ1ZScgYWxsb3dTb3J0aW5nPSd0cnVlJz4gXG4gKiAgIDxlLWV2ZW50LW1hcmtlcnM+XG4gKiAgICAgPGUtZXZlbnQtbWFya2VyIGRheT0nMDIvMTAvMjAxOCcgbGFiZWw9J1Byb2plY3QgU3RhcnRzJz48L2UtZXZlbnQtbWFya2VyPlxuICogICA8L2UtZXZlbnQtbWFya2Vycz5cbiAqIDwvZWpzLWdhbnR0PlxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnZWpzLWdhbnR0PmUtZXZlbnQtbWFya2Vycz5lLWV2ZW50LW1hcmtlcicsXG4gICAgaW5wdXRzOiBpbnB1dCxcbiAgICBvdXRwdXRzOiBvdXRwdXRzLCAgICBcbiAgICBxdWVyaWVzOiB7XG5cbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIEV2ZW50TWFya2VyRGlyZWN0aXZlIGV4dGVuZHMgQ29tcGxleEJhc2U8RXZlbnRNYXJrZXJEaXJlY3RpdmU+IHtcbiAgICBwdWJsaWMgZGlyZWN0aXZlUHJvcExpc3Q6IGFueTtcblx0XG5cblxuICAgIC8qKiBcbiAgICAgKiBEZWZpbmUgY3VzdG9tIGNzcyBjbGFzcyBmb3IgZXZlbnQgbWFya2VyIHRvIGN1c3RvbWl6ZSBsaW5lIGFuZCBsYWJlbC5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgcHVibGljIGNzc0NsYXNzOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIERlZmluZXMgZGF5IG9mIGV2ZW50IG1hcmtlci5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgcHVibGljIGRheTogYW55O1xuICAgIC8qKiBcbiAgICAgKiBEZWZpbmVzIGxhYmVsIG9mIGV2ZW50IG1hcmtlci5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgcHVibGljIGxhYmVsOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZpZXdDb250YWluZXJSZWY6Vmlld0NvbnRhaW5lclJlZikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBzZXRWYWx1ZSgnY3VycmVudEluc3RhbmNlJywgdGhpcywgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50cyhvdXRwdXRzKTtcbiAgICAgICAgdGhpcy5kaXJlY3RpdmVQcm9wTGlzdCA9IGlucHV0O1xuICAgIH1cbn1cblxuLyoqXG4gKiBFdmVudE1hcmtlciBBcnJheSBEaXJlY3RpdmVcbiAqIEBwcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnZWpzLWdhbnR0PmUtZXZlbnQtbWFya2VycycsXG4gICAgcXVlcmllczoge1xuICAgICAgICBjaGlsZHJlbjogbmV3IENvbnRlbnRDaGlsZHJlbihFdmVudE1hcmtlckRpcmVjdGl2ZSlcbiAgICB9LFxufSlcbmV4cG9ydCBjbGFzcyBFdmVudE1hcmtlcnNEaXJlY3RpdmUgZXh0ZW5kcyBBcnJheUJhc2U8RXZlbnRNYXJrZXJzRGlyZWN0aXZlPiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCdldmVudG1hcmtlcnMnKTtcbiAgICB9XG59Il19