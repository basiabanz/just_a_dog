import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutMeComponent } from './components/pages/about-me/about-me.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { HomeComponent } from './components/pages/home/home.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'o-mnie', component: AboutMeComponent },
    { path: 'kontakt', component: ContactComponent },
    { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
