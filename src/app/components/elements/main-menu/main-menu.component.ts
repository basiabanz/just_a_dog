import {
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { PageLibrary, ePage } from 'src/app/helpers/pageLibrary';

@Component({
    selector: 'dog-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.less'],
})
export class MainMenuComponent implements OnInit {
    public isMenuBackground = false;
    public menuOpen = false;
    public pageSettings = PageLibrary.pageSettingsList;
    public ePage = ePage;

    @ViewChild('hamburger') public hamburger: ElementRef;
    @ViewChild('menu') public menu: ElementRef;

    @Output() public activePage = new EventEmitter<{
        backgroundUrl: string;
        url: string;
    }>();

    @HostListener('window:scroll', ['$event'])
    public onScroll(): void {
        if (window.scrollY > 0 && !this.isMenuBackground) {
            this.menu.nativeElement.classList.add('menu-background');
            this.isMenuBackground = !this.isMenuBackground;
        } else if (window.scrollY === 0 && this.isMenuBackground) {
            this.menu.nativeElement.classList.remove('menu-background');
            this.isMenuBackground = !this.isMenuBackground;
        }
    }

    constructor(private _router: Router) {}

    ngOnInit(): void {
        this._router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((r: any) => {
                const selectedPage =
                    PageLibrary.pageSettingsList[
                        Object.keys(PageLibrary.pageSettingsList).find(
                            (p) =>
                                PageLibrary.pageSettingsList[
                                    p as keyof typeof ePage
                                ].url === r.url
                        ) as keyof typeof ePage
                    ];
                if (this.menuOpen) {
                    this.toggleMenu();
                }
                this.activePage.emit(selectedPage);
            });
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
