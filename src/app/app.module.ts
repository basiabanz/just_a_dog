import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ButtonComponent } from './components/ui/button/button.component';
import { NgxMasonryModule } from 'ngx-masonry';
import { AboutMeComponent } from './components/pages/about-me/about-me.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { HomeContentComponent } from './components/top-content/home-content/home-content.component';
import { MainMenuComponent } from './components/elements/main-menu/main-menu.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ButtonComponent,
        AboutMeComponent,
        ContactComponent,
        HomeContentComponent,
        MainMenuComponent,
    ],
    imports: [BrowserModule, AppRoutingModule, NgxMasonryModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
