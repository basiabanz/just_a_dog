import { Component, Directive, Input, TemplateRef } from '@angular/core';

@Component({
    selector: 'p-header',
    template: '<ng-content></ng-content>'
})
export class HeaderComponent {}

@Component({
    selector: 'p-footer',
    template: '<ng-content></ng-content>'
})
export class FooterComponent {}

@Directive({
    selector: '[pTemplate]',
    host: {}
})
export class PrimeTemplateDirective {
    @Input() type: string | undefined;

    @Input('pTemplate') name: string | undefined;

    constructor(public template: TemplateRef<any>) {}

    getType(): string {
        return this.name!;
    }
}
