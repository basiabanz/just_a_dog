import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
import {
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';

@Component({
    selector: 'dog-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit, OnDestroy {
    public title = 'justADog';

    @ViewChild('hamburger') public hamburger: ElementRef;

    public menuOpen = false;

    constructor() {}

    ngOnInit(): void {
        document.body.classList.add('home');
    }

    ngOnDestroy(): void {
        document.body.classList.remove('home');
    }

    public openFacebook(): void {
        window.open('https://www.facebook.com/profile.php?id=100091854533629');
        if (this.menuOpen) {
            this.toggleMenu();
        }
    }

    public openInstagram(): void {
        window.open('https://www.instagram.com/psia_wataha/');
        if (this.menuOpen) {
            this.toggleMenu();
        }
    }

    public toggleMenu(): void {
        (this.hamburger.nativeElement as HTMLElement).classList.toggle(
            'active'
        );
        this.menuOpen = !this.menuOpen;
    }
}
