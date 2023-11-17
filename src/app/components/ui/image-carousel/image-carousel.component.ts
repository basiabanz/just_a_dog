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

    ngAfterViewInit(): void {
        this.dynamicFlexStyle = `calc((100% / ${this.itemsShowNo}) - 12px)`;

        this.cardWidth = (this.itemsContainer.nativeElement as HTMLElement).children.item(0)?.scrollWidth as number;
        this._carouselChildren = [...this.itemsContainer.nativeElement.children];

        this._firstId = Number(this._carouselChildren[0].getAttribute('id'));
    }

    public prev(): void {
        this._firstId = this._firstId === 0 ? this.values.length - 1 : this._firstId - 1;

        if (this.itemsContainer.nativeElement.scrollLeft === 0) {
            this.itemsContainer.nativeElement.insertAdjacentHTML('afterbegin', this._carouselChildren[this._firstId].outerHTML);
        }
        this.itemsContainer.nativeElement.scrollLeft += -this.cardWidth;
    }

    public next(): void {
        this._firstId = this._firstId === this.values.length - 1 ? 0 : this._firstId + 1;

        if (
            Math.ceil(this.itemsContainer.nativeElement.scrollLeft) ===
            this.itemsContainer.nativeElement.scrollWidth - this.itemsContainer.nativeElement.offsetWidth
        ) {
            const shouldBeNext = this._firstId + this.itemsShowNo - 1;
            const nextId = shouldBeNext > this.values.length - 1 ? shouldBeNext - this.itemsShowNo - 2 : shouldBeNext;
            this.itemsContainer.nativeElement.insertAdjacentHTML('beforeend', this._carouselChildren[nextId].outerHTML);
        }
        this.itemsContainer.nativeElement.scrollLeft += this.cardWidth;
    }
}
