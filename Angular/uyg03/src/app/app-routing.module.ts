import { UrunlisteleComponent } from './components/urunlistele/urunlistele.component';
import { KategoriComponent } from './components/kategori/kategori.component';
import { UrunComponent } from './components/urun/urun.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'urun',
    component: UrunComponent
  },
  {
    path:'kategori',
    component: KategoriComponent
  },
  {
    path:'urunlistelebykatid/:katId',
    component: UrunlisteleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
