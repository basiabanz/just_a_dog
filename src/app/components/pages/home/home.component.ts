import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface IHomePageContent {
    photo: string;
    backgroundColor: string;
    color: string;
    title: string;
    text: string;
    btnText: string;
    btnType: 'primary' | 'secondary';
    btnFunc: () => void;
}
@Component({
    selector: 'dog-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
    public homePageContent: IHomePageContent[] = this.getPageContents();
    constructor(private _router: Router) {}

    ngOnInit(): void {
        window.scrollTo({ top: 0 });
    }

    private openFacebook(): void {
        window.open('https://www.facebook.com/profile.php?id=100091854533629');
    }

    private openInstagram(): void {
        window.open('https://www.instagram.com/psia_wataha/');
    }

    private getPageContents(): IHomePageContent[] {
        return [
            {
                photo: 'assets/images/temp/home-1.jpg',
                backgroundColor: '#1f363d',
                color: '#ADBEB6',
                title: 'Domowy hotelik',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolorin reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident',
                btnText: 'Poznaj mnie',
                btnType: 'primary',
                btnFunc: () => this._router.navigate(['/o-mnie']),
            },
            {
                photo: 'assets/images/temp/home-2.jpg',
                backgroundColor: '#156669',
                color: '#f5f5f4',
                title: 'Konsultacje behawioralne',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolorin reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident',
                btnText: 'Spotkajmy się na Facebooku',
                btnType: 'secondary',
                btnFunc: () => this.openFacebook(),
            },
            {
                photo: 'assets/images/temp/home-3.jpg',
                backgroundColor: '#1f363d',
                color: '#ADBEB6',
                title: 'Szkolenie psów',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolorin reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident',
                btnText: 'Spotkajmy się na Instagramie',
                btnType: 'primary',
                btnFunc: () => this.openInstagram(),
            },
        ];
    }
}
