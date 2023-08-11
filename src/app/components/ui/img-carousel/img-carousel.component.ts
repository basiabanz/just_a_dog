import { DOCUMENT } from '@angular/common';
import {
    AfterContentInit,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    NgZone,
    Output,
    Renderer2,
    SimpleChanges,
    TemplateRef,
    ViewChild
} from '@angular/core';

import { CarouselPageEvent } from './carousel.model';

@Component({
    selector: 'dog-img-carousel',
    templateUrl: './img-carousel.component.html',
    styleUrls: ['./img-carousel.component.less']
})
export class ImgCarouselComponent implements AfterContentInit {
    @Input() public get page(): number {
        return this._page;
    }
    public set page(val: number) {
        if (this.isCreated && val !== this._page) {
            if (val > this._page && val <= this.totalDots() - 1) {
                this.step(-1, val);
            } else if (val < this._page) {
                this.step(1, val);
            }
        }

        this._page = val;
    }

    @Input() public get numVisible(): number {
        return this._numVisible;
    }
    public set numVisible(val: number) {
        this._numVisible = val;
    }

    /**
     * An array of objects to display.
     * @defaultValue null
     * @group Props
     */
    @Input() public get value(): any[] {
        return this._value as any[];
    }
    public set value(val) {
        this._value = val;
    }

    /**
     * Callback to invoke after scroll.
     * @param {CarouselPageEvent} event - Custom page event.
     * @group Emits
     */
    @Output() public pageChange: EventEmitter<CarouselPageEvent> = new EventEmitter<CarouselPageEvent>();

    @ViewChild('itemsContainer') public itemsContainer: ElementRef | undefined;

    private _numVisible = 1;

    private _numScroll = 1;

    public lastId = 0;

    private _prevState: any = {
        numScroll: 0,
        numVisible: 0,
        value: []
    };

    public _page = 0;

    public _value: any[] | null | undefined;

    // public id: string | undefined;

    private _totalShiftedItems;

    public _isRemainingItemsAdded = false;

    private _remainingItems = 0;

    private _startPos: any;

    public dynamicFlexStyle: string;

    @ContentChild('template', { static: false }) public templateRef: TemplateRef<any>;

    // public allowAutoplay: boolean | undefined;

    public isCreated: boolean | undefined;

    constructor(public el: ElementRef, public zone: NgZone, public cd: ChangeDetectorRef) {
        this._totalShiftedItems = this.page * -1;
    }

    ngAfterContentInit(): void {
        this.createStyle();
    }

    ngAfterContentChecked(): void {
        let totalShiftedItems = this._totalShiftedItems;
        console.log(totalShiftedItems);
        console.log(this._prevState);
        if (
            this.value &&
            this.itemsContainer &&
            (this._prevState.numScroll !== this._numScroll ||
                this._prevState.numVisible !== this._numVisible ||
                this._prevState.value.length !== this.value.length)
        ) {
            this._remainingItems = (this.value.length - this._numVisible) % this._numScroll;

            let page = this._page;
            if (this.totalDots() !== 0 && page >= this.totalDots()) {
                page = this.totalDots() - 1;
                this._page = page;
                this.pageChange.emit({
                    page: this.page
                });
            }

            totalShiftedItems = page * this._numScroll * -1;
            // totalShiftedItems -= this._numVisible;

            if (page === this.totalDots() - 1 && this._remainingItems > 0) {
                totalShiftedItems += -1 * this._remainingItems + this._numScroll;
                this._isRemainingItemsAdded = true;
            } else {
                this._isRemainingItemsAdded = false;
            }

            if (totalShiftedItems !== this._totalShiftedItems) {
                this._totalShiftedItems = totalShiftedItems;
            }

            this._prevState.numScroll = this._numScroll;
            this._prevState.numVisible = this._numVisible;
            this._prevState.value = [...(this._value as any[])];

            if (this.totalDots() > 0 && this.itemsContainer.nativeElement) {
                console.log(totalShiftedItems, this._numVisible);
                this.itemsContainer.nativeElement.style.transform = `translate3d(${totalShiftedItems * (100 / this._numVisible)}%, 0, 0)`;
            }

            this.isCreated = true;
        }

        if (this.page === 0) {
            totalShiftedItems = -1 * this._numVisible;
        } else if (totalShiftedItems === 0) {
            totalShiftedItems = -1 * this.value.length;
            if (this._remainingItems > 0) {
                this._isRemainingItemsAdded = true;
            }
        }

        if (totalShiftedItems !== this._totalShiftedItems) {
            this._totalShiftedItems = totalShiftedItems;
        }
    }

    public createStyle(): void {
        this.dynamicFlexStyle = `1 0 ${100 / this.numVisible}%`;
    }

    public totalDots(): number {
        return this.value?.length ? Math.ceil((this.value.length - this._numVisible) / this._numScroll) + 1 : 0;
    }

    public navForward(e: MouseEvent | TouchEvent, index?: number): void {
        if (this._page < this.totalDots() - 1) {
            this.step(-1, index);
        }

        if (e && e.cancelable) {
            e.preventDefault();
        }
    }

    public navBackward(e: MouseEvent | TouchEvent, index?: number): void {
        if (this._page !== 0) {
            this.step(1, index);
        }

        if (e && e.cancelable) {
            e.preventDefault();
        }
    }

    public step(dir: number, page?: number): void {
        let totalShiftedItems = this._totalShiftedItems;

        if (page != null) {
            totalShiftedItems = this._numScroll * page * -1;

            totalShiftedItems -= this._numVisible;

            this._isRemainingItemsAdded = false;
        } else {
            totalShiftedItems += this._numScroll * dir;
            if (this._isRemainingItemsAdded) {
                totalShiftedItems += this._remainingItems - this._numScroll * dir;
                this._isRemainingItemsAdded = false;
            }

            const originalShiftedItems = totalShiftedItems + this._numVisible;
            page = Math.abs(Math.floor(originalShiftedItems / this._numScroll));
        }

        if (this.page === this.totalDots() - 1 && dir === -1) {
            totalShiftedItems = -1 * (this.value.length + this._numVisible);
            page = 0;
        } else if (this.page === 0 && dir === 1) {
            totalShiftedItems = 0;
            page = this.totalDots() - 1;
        } else if (page === this.totalDots() - 1 && this._remainingItems > 0) {
            totalShiftedItems += this._remainingItems * -1 - this._numScroll * dir;
            this._isRemainingItemsAdded = true;
        }

        if (this.itemsContainer) {
            this.itemsContainer.nativeElement.style.transform = `translate3d(${totalShiftedItems * (100 / this._numVisible)}%, 0, 0)`;
            this.itemsContainer.nativeElement.style.transition = 'transform 500ms ease 0s';
        }

        this._totalShiftedItems = totalShiftedItems;
        this._page = page;
        this.pageChange.emit({
            page: this.page
        });
    }

    public onTransitionEnd(): void {
        if (this.itemsContainer) {
            this.itemsContainer.nativeElement.style.transition = '';

            if (this.page === 0 || this.page === this.totalDots() - 1) {
                this.itemsContainer.nativeElement.style.transform = `translate3d(${
                    this._totalShiftedItems * (100 / this._numVisible)
                }%, 0, 0)`;
            }
        }
    }

    public onTouchStart(e: TouchEvent): void {
        const touchobj = e.changedTouches[0];

        this._startPos = {
            x: touchobj.pageX,
            y: touchobj.pageY
        };
    }

    public onTouchMove(e: TouchEvent | MouseEvent): void {
        if (e.cancelable) {
            e.preventDefault();
        }
    }
    public onTouchEnd(e: TouchEvent): void {
        const touchobj = e.changedTouches[0];

        this.changePageOnTouch(e, touchobj.pageX - this._startPos.x);
    }

    public changePageOnTouch(e: TouchEvent | MouseEvent, diff: number): void {
        if (Math.abs(diff) > 20) {
            if (diff < 0) {
                this.navForward(e);
            } else {
                this.navBackward(e);
            }
        }
    }

    // ngOnDestroy() {}
}
