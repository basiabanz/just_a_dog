import { Component, OnDestroy, OnInit } from '@angular/core';

import { ePage } from './helpers/pageLibrary';

@Component({
    selector: 'dog-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy {
    public title = 'justADog';
    public selectedPage: { backgroundUrl: string; url: string; key: ePage };
    public ePage = ePage;

    constructor() {}

    ngOnInit(): void {
        document.body.classList.add('home');
    }

    ngOnDestroy(): void {
        document.body.classList.remove('home');
    }

    public setActivePage(event: { backgroundUrl: string; url: string; key: ePage }): void {
        this.selectedPage = event;
    }
}
