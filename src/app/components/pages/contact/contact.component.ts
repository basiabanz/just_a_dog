import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'dog-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.less'],
})
export class ContactComponent implements OnInit {
    ngOnInit(): void {
        document.body.scrollTop = 0;
    }
}
