import { AfterViewInit, Component, ContentChild, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';

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

    ngAfterViewInit(): void {
        this.dynamicFlexStyle = `calc((100% / ${this.itemsShowNo}) - 16px)`;

        this.cardWidth = (this.itemsContainer.nativeElement as HTMLElement).children.item(0)?.scrollWidth as number;
        this._carouselChildren = [...this.itemsContainer.nativeElement.children];

        this._firstId = Number(this._carouselChildren[0].firstChild.getAttribute('id'));
        this._lastId = Number(this._carouselChildren[this.itemsShowNo - 1].firstChild.getAttribute('id'));
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

        // console.log(this._lastId);
        // if (this._lastId === 4 || this._start) {
        //     this.itemsContainer.nativeElement.insertAdjacentHTML(
        //         'beforeend',
        //         this._carouselChildren[this._lastId === this.values.length - 1 ? 0 : this._lastId + 1].outerHTML
        //     );
        //     this._start = true;
        //     console.log(this.itemsContainer.nativeElement);
        // }
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
