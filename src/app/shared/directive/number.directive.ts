import { Directive, ElementRef, HostListener } from '@angular/core';
   /**
   * Directive in order to escape various use cases where a user can enter value different then a number
   *
   * Example value of this is 'e'
   */
@Directive({
    selector: 'input[type="number"]'
})
export class NumberOnlyDirective {
   /**
   * Accept only numbers regex
   */
    private regex: RegExp = new RegExp(/^([0-9]*)/g);

     /**
     * Allow key codes for special events. Reflect :
     *
     * Backspace, tab, end, home
     */
    private specialKeys: Array<string> = [ 'Backspace', 'Tab', 'End', 'Home' ];

    constructor(private el: ElementRef) {}

    /**
     * On each keydown if the new key-value is valid add it to the previous value
     */
    @HostListener('keydown', [ '$event' ])
    onKeyDown(event: KeyboardEvent) {
        if (this.specialKeys.indexOf(event.key) !== -1) {
            return;
        }
        let current: string = this.el.nativeElement.value;
        let next: string = current.concat(event.key);
        if (next && !String(next).match(this.regex)) {
            event.preventDefault();
        }
    }
}
