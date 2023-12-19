import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'dog-about-me',
    templateUrl: './about-me.component.html',
    styleUrls: ['./about-me.component.less']
})
export class AboutMeComponent implements OnInit {
    public certificates = [
        { id: 0, name: 'C1', image: 'certificate' },
        { id: 1, name: 'C2', image: 'certificate2' },
        { id: 2, name: 'C3', image: 'certificate3' },
        { id: 3, name: 'C4', image: 'certificate4' },
        { id: 4, name: 'C5', image: 'certificate5' }
    ];
    ngOnInit(): void {
        window.scrollTo({ top: 0 });
    }
}
