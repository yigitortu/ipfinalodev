import { UrunlisteleComponent } from './components/urunlistele/urunlistele.component';
import { KategoriDialogComponent } from './components/dialogs/kategori-dialog/kategori-dialog.component';
import { UrunDialogComponent } from './components/dialogs/urun-dialog/urun-dialog.component';
import { KategoriComponent } from './components/kategori/kategori.component';
import { UrunComponent } from './components/urun/urun.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { MaterialModule } from './material.module';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyAlertService } from './services/myAlert.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    UrunComponent,
    KategoriComponent,
    UrunlisteleComponent,

    //Dialoglar
    AlertDialogComponent,
    ConfirmDialogComponent,
    UrunDialogComponent,
    KategoriDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  entryComponents:[
    AlertDialogComponent,
    ConfirmDialogComponent,
    UrunDialogComponent

  ],
  providers: [
    MyAlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
