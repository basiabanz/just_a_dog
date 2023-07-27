import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutMeComponent } from './components/pages/about-me/about-me.component';
import { HomeComponent } from './components/pages/home/home.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'aboutMe', component: AboutMeComponent },
    { path: '**', redirectTo: '/home', pathMatch: 'full' },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
