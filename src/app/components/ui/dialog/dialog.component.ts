import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { mobileHelper } from 'src/app/helpers/mobileHelper';

@Component({
    selector: 'dog-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.less']
})
export class DialogComponent implements OnInit, OnDestroy {
    @ViewChild('dialog', { static: true }) public dialog: ElementRef<HTMLDialogElement>;
    // @Input() public dialogHeader: string;

    @Output() public closed = new EventEmitter<void>();
    public isMobile = mobileHelper.isMobile;

    constructor() {}

    ngOnInit(): void {
        this.dialog.nativeElement.showModal();
    }

    public closeDialog(): void {
        this.closed.emit();
    }

    ngOnDestroy(): void {
        this.dialog.nativeElement.close();
    }
}
