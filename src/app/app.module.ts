import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ButtonComponent } from './components/ui/button/button.component';
import { NgxMasonryModule } from 'ngx-masonry';
import { AboutMeComponent } from './components/pages/about-me/about-me.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ButtonComponent,
        AboutMeComponent,
    ],
    imports: [BrowserModule, AppRoutingModule, NgxMasonryModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
