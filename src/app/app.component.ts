import { Component } from '@angular/core';

import { ePage } from './helpers/pageLibrary';

@Component({
    selector: 'dog-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    public title = 'justADog';
    public selectedPage: { backgroundUrl: string; url: string; key: ePage };
    public ePage = ePage;

    constructor() {}

    public setActivePage(event: { backgroundUrl: string; url: string; key: ePage }): void {
        this.selectedPage = event;
    }
}
