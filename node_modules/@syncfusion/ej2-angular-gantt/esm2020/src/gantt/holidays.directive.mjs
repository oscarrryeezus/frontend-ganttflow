import { Directive, ContentChildren } from '@angular/core';
import { ComplexBase, ArrayBase, setValue } from '@syncfusion/ej2-angular-base';
import * as i0 from "@angular/core";
let input = ['cssClass', 'from', 'label', 'to'];
let outputs = [];
/**
 * `e-holidays` directive represent a holidays collection in Gantt.
 * It must be contained in a Gantt component(`ejs-gantt`).
 * ```html
 * <ejs-gantt [dataSource]='data' allowSelection='true' allowSorting='true'>
 *   <e-holidays>
 *     <e-holiday from='02/20/2018' label='Holiday 1'></e-holiday>
 *     <e-holiday from='05/15/2018' label='Holiday 2'></e-holiday>
 *   </e-holidays>
 * </ejs-gantt>
 * ```
 */
export class HolidayDirective extends ComplexBase {
    constructor(viewContainerRef) {
        super();
        this.viewContainerRef = viewContainerRef;
        setValue('currentInstance', this, this.viewContainerRef);
        this.registerEvents(outputs);
        this.directivePropList = input;
    }
}
HolidayDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: HolidayDirective, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
HolidayDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: HolidayDirective, selector: "ejs-gantt>e-holidays>e-holidays", inputs: { cssClass: "cssClass", from: "from", label: "label", to: "to" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: HolidayDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-gantt>e-holidays>e-holidays',
                    inputs: input,
                    outputs: outputs,
                    queries: {}
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * Holiday Array Directive
 * @private
 */
export class HolidaysDirective extends ArrayBase {
    constructor() {
        super('holidays');
    }
}
HolidaysDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: HolidaysDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
HolidaysDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.3", type: HolidaysDirective, selector: "ejs-gantt>e-holidays", queries: [{ propertyName: "children", predicate: HolidayDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: HolidaysDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ejs-gantt>e-holidays',
                    queries: {
                        children: new ContentChildren(HolidayDirective)
                    },
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9saWRheXMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2dhbnR0L2hvbGlkYXlzLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFvQixlQUFlLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7O0FBSWhGLElBQUksS0FBSyxHQUFhLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDMUQsSUFBSSxPQUFPLEdBQWEsRUFBRSxDQUFDO0FBQzNCOzs7Ozs7Ozs7OztHQVdHO0FBU0gsTUFBTSxPQUFPLGdCQUFpQixTQUFRLFdBQTZCO0lBMEIvRCxZQUFvQixnQkFBaUM7UUFDakQsS0FBSyxFQUFFLENBQUM7UUFEUSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBRWpELFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO0lBQ25DLENBQUM7OzZHQS9CUSxnQkFBZ0I7aUdBQWhCLGdCQUFnQjsyRkFBaEIsZ0JBQWdCO2tCQVI1QixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxpQ0FBaUM7b0JBQzNDLE1BQU0sRUFBRSxLQUFLO29CQUNiLE9BQU8sRUFBRSxPQUFPO29CQUNoQixPQUFPLEVBQUUsRUFFUjtpQkFDSjs7QUFtQ0Q7OztHQUdHO0FBT0gsTUFBTSxPQUFPLGlCQUFrQixTQUFRLFNBQTRCO0lBQy9EO1FBQ0ksS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3RCLENBQUM7OzhHQUhRLGlCQUFpQjtrR0FBakIsaUJBQWlCLHFGQUhRLGdCQUFnQjsyRkFHekMsaUJBQWlCO2tCQU43QixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxzQkFBc0I7b0JBQ2hDLE9BQU8sRUFBRTt3QkFDTCxRQUFRLEVBQUUsSUFBSSxlQUFlLENBQUMsZ0JBQWdCLENBQUM7cUJBQ2xEO2lCQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBWaWV3Q29udGFpbmVyUmVmLCBDb250ZW50Q2hpbGRyZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbXBsZXhCYXNlLCBBcnJheUJhc2UsIHNldFZhbHVlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5cblxuXG5sZXQgaW5wdXQ6IHN0cmluZ1tdID0gWydjc3NDbGFzcycsICdmcm9tJywgJ2xhYmVsJywgJ3RvJ107XG5sZXQgb3V0cHV0czogc3RyaW5nW10gPSBbXTtcbi8qKlxuICogYGUtaG9saWRheXNgIGRpcmVjdGl2ZSByZXByZXNlbnQgYSBob2xpZGF5cyBjb2xsZWN0aW9uIGluIEdhbnR0LiBcbiAqIEl0IG11c3QgYmUgY29udGFpbmVkIGluIGEgR2FudHQgY29tcG9uZW50KGBlanMtZ2FudHRgKS4gXG4gKiBgYGBodG1sXG4gKiA8ZWpzLWdhbnR0IFtkYXRhU291cmNlXT0nZGF0YScgYWxsb3dTZWxlY3Rpb249J3RydWUnIGFsbG93U29ydGluZz0ndHJ1ZSc+IFxuICogICA8ZS1ob2xpZGF5cz5cbiAqICAgICA8ZS1ob2xpZGF5IGZyb209JzAyLzIwLzIwMTgnIGxhYmVsPSdIb2xpZGF5IDEnPjwvZS1ob2xpZGF5PlxuICogICAgIDxlLWhvbGlkYXkgZnJvbT0nMDUvMTUvMjAxOCcgbGFiZWw9J0hvbGlkYXkgMic+PC9lLWhvbGlkYXk+XG4gKiAgIDwvZS1ob2xpZGF5cz5cbiAqIDwvZWpzLWdhbnR0PlxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnZWpzLWdhbnR0PmUtaG9saWRheXM+ZS1ob2xpZGF5cycsXG4gICAgaW5wdXRzOiBpbnB1dCxcbiAgICBvdXRwdXRzOiBvdXRwdXRzLCAgICBcbiAgICBxdWVyaWVzOiB7XG5cbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIEhvbGlkYXlEaXJlY3RpdmUgZXh0ZW5kcyBDb21wbGV4QmFzZTxIb2xpZGF5RGlyZWN0aXZlPiB7XG4gICAgcHVibGljIGRpcmVjdGl2ZVByb3BMaXN0OiBhbnk7XG5cdFxuXG5cbiAgICAvKiogXG4gICAgICogRGVmaW5lcyBjdXN0b20gY3NzIGNsYXNzIG9mIGhvbGlkYXkgdG8gY3VzdG9taXplIGJhY2tncm91bmQgYW5kIGxhYmVsLlxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBwdWJsaWMgY3NzQ2xhc3M6IGFueTtcbiAgICAvKiogXG4gICAgICogRGVmaW5lcyBzdGFydCBkYXRlIG9mIGhvbGlkYXkuXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIHB1YmxpYyBmcm9tOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIERlZmluZXMgbGFiZWwgb2YgaG9saWRheS5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgcHVibGljIGxhYmVsOiBhbnk7XG4gICAgLyoqIFxuICAgICAqIERlZmluZXMgZW5kIGRhdGUgb2YgaG9saWRheS5cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgcHVibGljIHRvOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZpZXdDb250YWluZXJSZWY6Vmlld0NvbnRhaW5lclJlZikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBzZXRWYWx1ZSgnY3VycmVudEluc3RhbmNlJywgdGhpcywgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50cyhvdXRwdXRzKTtcbiAgICAgICAgdGhpcy5kaXJlY3RpdmVQcm9wTGlzdCA9IGlucHV0O1xuICAgIH1cbn1cblxuLyoqXG4gKiBIb2xpZGF5IEFycmF5IERpcmVjdGl2ZVxuICogQHByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdlanMtZ2FudHQ+ZS1ob2xpZGF5cycsXG4gICAgcXVlcmllczoge1xuICAgICAgICBjaGlsZHJlbjogbmV3IENvbnRlbnRDaGlsZHJlbihIb2xpZGF5RGlyZWN0aXZlKVxuICAgIH0sXG59KVxuZXhwb3J0IGNsYXNzIEhvbGlkYXlzRGlyZWN0aXZlIGV4dGVuZHMgQXJyYXlCYXNlPEhvbGlkYXlzRGlyZWN0aXZlPiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCdob2xpZGF5cycpO1xuICAgIH1cbn0iXX0=