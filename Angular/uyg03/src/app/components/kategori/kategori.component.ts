import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { Sonuc } from './../../models/Sonuc';
import { KategoriDialogComponent } from './../dialogs/kategori-dialog/kategori-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from './../../services/api.service';
import { Kategori } from './../../models/Kategori';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MyAlertService } from 'src/app/services/myAlert.service';

@Component({
  selector: 'app-kategori',
  templateUrl: './kategori.component.html',
  styleUrls: ['./kategori.component.css']
})
export class KategoriComponent implements OnInit {
  kategoriler: Kategori[];
  dataSource: any;
  displayedColumns = [ 'katId', 'katAdi', 'detay']
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef: MatDialogRef<KategoriDialogComponent>;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) { }
  
  ngOnInit() {
    this.KategoriListele();
  }

  KategoriListele(){
    this.apiServis.KategoriListe().subscribe((d: Kategori[]) => {
      this.kategoriler = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  Ekle(){
    var yeniKayit:Kategori = new Kategori();
    this.dialogRef = this.matDialog.open(KategoriDialogComponent, {
      width: '400px',
      data:{
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    
    this.dialogRef.afterClosed().subscribe(d=> {
      console.log(d);
      if(d){
        this.apiServis.KategoriEkle(d).subscribe((s:Sonuc) => {
          this.alert.AlertUygula(s);
          if(s.islem){
            this.KategoriListele();
          }
        });
      }
    });
  }

  Filtrele(e: any){
    var deger = e.target.value;
    this.dataSource.filter=deger.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }

  }

  Duzenle(kayit: Kategori){
    var yeniKayit:Kategori = new Kategori();
    this.dialogRef = this.matDialog.open(KategoriDialogComponent, {
      width: '400px',
      data:{
        kayit: kayit,
        islem: 'duzenle'
      }

    });
    this.dialogRef.afterClosed().subscribe(d=> {
      console.log(d);
      if(d){
        d.katId = kayit.katId;
        this.apiServis.KategoriDuzenle(d).subscribe((s:Sonuc) => {
          this.alert.AlertUygula(s);
          if(s.islem){
            this.KategoriListele();
          }
        });
      }
    });
    

  }
  

  Sil(kayit: Kategori): void {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '500px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.katAdi + " isimli kategori silinecektir onaylıyor musunuz?";

    this.confirmDialogRef.afterClosed().subscribe(d => {
      if(d){
        this.apiServis.KategoriSil(kayit.katId).subscribe((s:Sonuc) => {
          this.alert.AlertUygula(s);
          if(s.islem){
            this.KategoriListele();
          }
        });
      }
    });
  }
  
}
