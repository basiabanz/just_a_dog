import {
    Component,
    ContentChild,
    ElementRef,
    Input,
    TemplateRef,
    ViewChild,
} from '@angular/core';

@Component({
    selector: 'dog-image-carousel',
    templateUrl: './image-carousel.component.html',
    styleUrls: ['./image-carousel.component.less'],
})
export class ImageCarouselComponent {
    @Input() public itemsShowNo = 3;
    @Input() public values: any[];
    @ViewChild('itemsContainer') public itemsContainer: ElementRef;
    @ContentChild('template', { static: false })
    public templateRef: TemplateRef<any>;

    public dynamicFlexStyle: string;
    public firstCardWidth: any;
    public carouselChildrens: any;
    public startX: any;
    public startScrollLeft: any;
    public isDragging = false;

    ngAfterViewInit(): void {
        this.dynamicFlexStyle = `calc((100% / ${this.itemsShowNo}) - 12px)`;

        this.firstCardWidth = (
            this.itemsContainer.nativeElement as HTMLElement
        ).children.item(0)?.scrollWidth;
        this.carouselChildrens = [
            ...this.itemsContainer.nativeElement.children,
        ];
        this.itemsContainer.nativeElement.addEventListener(
            'mousedown',
            this.dragStart
        );
        this.itemsContainer.nativeElement.addEventListener(
            'mousemove',
            this.dragging
        );
        document.addEventListener('mouseup', this.dragStop);
        console.log(this.firstCardWidth);
        console.log(this.carouselChildrens);

        // Insert copies of the last few cards to beginning of carousel for infinite scrolling
        this.carouselChildrens
            .slice(-this.itemsShowNo)
            .reverse()
            .forEach((card: { outerHTML: any }) => {
                this.itemsContainer.nativeElement.insertAdjacentHTML(
                    'afterbegin',
                    card.outerHTML
                );
            });

        // Insert copies of the first few cards to end of carousel for infinite scrolling
        this.carouselChildrens
            .slice(0, this.itemsShowNo)
            .forEach((card: any) => {
                this.itemsContainer.nativeElement.insertAdjacentHTML(
                    'beforeend',
                    card.outerHTML
                );
            });

        // Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
        this.itemsContainer.nativeElement.classList.add('no-transition');
        this.itemsContainer.nativeElement.scrollLeft =
            this.itemsContainer.nativeElement.offsetWidth;
        this.itemsContainer.nativeElement.classList.remove('no-transition');
    }

    public prev(): void {
        this.itemsContainer.nativeElement.scrollLeft += -this.firstCardWidth;
        if (this.itemsContainer.nativeElement.scrollLeft === 0) {
            this.itemsContainer.nativeElement.classList.add('no-transition');
            this.itemsContainer.nativeElement.scrollLeft =
                this.itemsContainer.nativeElement.scrollWidth -
                2 * this.itemsContainer.nativeElement.offsetWidth;
            this.itemsContainer.nativeElement.classList.remove('no-transition');
        }
    }

    public next(): void {
        this.itemsContainer.nativeElement.scrollLeft += this.firstCardWidth;
        if (
            Math.ceil(this.itemsContainer.nativeElement.scrollLeft) ===
            this.itemsContainer.nativeElement.scrollWidth -
                this.itemsContainer.nativeElement.offsetWidth
        ) {
            console.log('wee');
            this.carouselChildrens
                .slice(0, this.itemsShowNo)
                .forEach((card: any) => {
                    this.itemsContainer.nativeElement.insertAdjacentHTML(
                        'beforeend',
                        card.outerHTML
                    );
                });
            this.next();
            // this.itemsContainer.nativeElement.classList.add('no-transition');
            // this.itemsContainer.nativeElement.scrollLeft =
            //     this.itemsContainer.nativeElement.offsetWidth;
            // this.itemsContainer.nativeElement.classList.remove('no-transition');
        }
    }

    public dragStart(e: any) {
        this.isDragging = true;
        if (this.itemsContainer) {
            this.itemsContainer.nativeElement.classList.add('dragging');
            // Records the initial cursor and scroll position of the carousel
            this.startX = e.pageX;
            this.startScrollLeft = this.itemsContainer.nativeElement.scrollLeft;
        }
    }

    public dragging(e: any) {
        if (!this.isDragging) return; // if isDragging is false return from here
        // Updates the scroll position of the carousel based on the cursor movement
        if (this.itemsContainer) {
            this.itemsContainer.nativeElement.scrollLeft =
                this.startScrollLeft - (e.pageX - this.startX);
        }
    }

    public dragStop() {
        this.isDragging = false;
        if (this.itemsContainer) {
            this.itemsContainer.nativeElement.classList.remove('dragging');
        }
    }
}
