import { Component, Input } from '@angular/core';

@Component({
    selector: 'dog-menu-button',
    templateUrl: './menu-button.component.html',
    styleUrls: ['./menu-button.component.less']
})
export class MenuButtonComponent {
    @Input() public btnTxt: string;
    @Input() public isActive: boolean;
}
