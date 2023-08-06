import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'dog-about-me',
    templateUrl: './about-me.component.html',
    styleUrls: ['./about-me.component.less'],
})
export class AboutMeComponent implements OnInit {
    ngOnInit(): void {
        console.log('wesz');
        // document.body.scrollTop = 0;
        // console.log(document.body.scrollTop);
    }
}
