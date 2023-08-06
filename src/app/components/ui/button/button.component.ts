import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'dog-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.less'],
})
export class ButtonComponent implements OnChanges {
    @Input() public btnTxt: string;
    @Input() public isActive: boolean;
    @Input() public type: 'primary' | 'secondary' = 'primary';

    ngOnChanges(changes: SimpleChanges): void {
        // if (changes['type']) {
        //     this.type = changes['type'].currentValue;
        //     console.log(this.type);
        // }
    }
}
