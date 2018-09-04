import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { MenuComponent } from '../menu/menu.component';
import { ContactComponent } from '../contact/contact.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'contact', component: ContactComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' }
];
