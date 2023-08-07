import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'dog-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.less']
})
export class ButtonComponent {
    @Input() public type: 'primary' | 'secondary' = 'primary';
    @Output() public clicked = new EventEmitter();

    public onClick(): void {
        this.clicked.emit();
    }
}
