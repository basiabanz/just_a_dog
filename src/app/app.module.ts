import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxMasonryModule } from 'ngx-masonry';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './components/elements/main-menu/main-menu.component';
import { AboutMeComponent } from './components/pages/about-me/about-me.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ButtonComponent } from './components/ui/button/button.component';
import { MenuButtonComponent } from './components/ui/menu-button/menu-button.component';
import { ImgCarouselComponent } from './components/ui/img-carousel/img-carousel.component';
import { ImageCarouselComponent } from './components/ui/image-carousel/image-carousel.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        MenuButtonComponent,
        ButtonComponent,
        AboutMeComponent,
        ContactComponent,
        MainMenuComponent,
        ImgCarouselComponent,
        ImageCarouselComponent
    ],
    imports: [BrowserModule, AppRoutingModule, NgxMasonryModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
