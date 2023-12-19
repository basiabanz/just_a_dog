import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    HostListener,
    Input,
    TemplateRef,
    ViewChild
} from '@angular/core';

@Component({
    selector: 'dog-image-carousel',
    templateUrl: './image-carousel.component.html',
    styleUrls: ['./image-carousel.component.less']
})
export class ImageCarouselComponent implements AfterViewInit {
    @Input() public itemsShowNo = 3;
    @Input() public values: any[];
    @ViewChild('itemsContainer') public itemsContainer: ElementRef;
    @ContentChild('template', { static: false }) public templateRef: TemplateRef<any>;

    public dynamicFlexStyle: string;
    public cardWidth: number;
    private _carouselChildren: any; //TODO type

    private _firstId: number;
    private _lastId: number;
    public selectedItem: any;

    constructor(private _cdr: ChangeDetectorRef) {}

    @HostListener('window:resize', ['$event'])
    public onResize(): void {
        if (window.innerWidth <= 1224 && this.itemsShowNo !== 2) {
            this.dynamicFlexStyle = `calc(50% - 8px);`;
            this._cdr.detectChanges();
            console.log('wee');
        } else if (window.innerWidth <= 760 && this.itemsShowNo !== 1) {
            this.dynamicFlexStyle = '100%';
            this._cdr.detectChanges();
            console.log('wee 2');
        }
    }

    ngAfterViewInit(): void {
        this.dynamicFlexStyle = `calc((100% / ${this.itemsShowNo}) - ${(this.itemsShowNo - 1) * 8}px)`;
        this.onResize();

        this._carouselChildren = [...this.itemsContainer.nativeElement.children];

        this._firstId = Number(this._carouselChildren[0].firstChild.getAttribute('id'));
        this._lastId = Number(this._carouselChildren[this.itemsShowNo - 1].firstChild.getAttribute('id'));
        setTimeout(() => {
            this.cardWidth = (this.itemsContainer.nativeElement as HTMLElement).children.item(0)?.scrollWidth as number;
        });
    }

    public prev(): void {
        this._firstId = this._firstId === 0 ? this.values.length - 1 : this._firstId - 1;
        this._lastId = this._lastId === 0 ? this.values.length - 1 : this._lastId - 1;

        if (this.itemsContainer.nativeElement.scrollLeft === 0) {
            this.itemsContainer.nativeElement.insertAdjacentHTML('afterbegin', this._carouselChildren[this._firstId].outerHTML);
        }

        this.itemsContainer.nativeElement.scrollLeft += -this.cardWidth;
    }

    public next(): void {
        this._firstId = this._firstId === this.values.length - 1 ? 0 : this._firstId + 1;
        this._lastId = this._lastId === this.values.length - 1 ? 0 : this._lastId + 1;
        if (
            Math.ceil(this.itemsContainer.nativeElement.scrollLeft) ===
            this.itemsContainer.nativeElement.scrollWidth - this.itemsContainer.nativeElement.offsetWidth
        ) {
            this.itemsContainer.nativeElement.insertAdjacentHTML('beforeend', this._carouselChildren[this._lastId].outerHTML);
        }
        this.itemsContainer.nativeElement.scrollLeft += this.cardWidth;
    }

    public selectCertificate(item: any): void {
        console.log(item);
        this.selectedItem = item;
    }

    public closeDialog(): void {
        this.selectedItem = null;
    }
}
