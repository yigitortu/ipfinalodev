import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { Sonuc } from './../../models/Sonuc';
import { MyAlertService } from './../../services/myAlert.service';
import { UrunDialogComponent } from './../dialogs/urun-dialog/urun-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from './../../services/api.service';
import { Urun } from './../../models/Urun';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-urun',
  templateUrl: './urun.component.html',
  styleUrls: ['./urun.component.css'],
})
export class UrunComponent implements OnInit {
  urunler: Urun[];
  displayedColumns = [ 'urunAdi',  'urunKatId', 'urunKatAdi', 'urunFiyat','islemler'];
  dataSource: any;
  dialogRef: MatDialogRef<UrunDialogComponent>;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService
    ) {}

  ngOnInit() {
    this.UrunListele();
  }

  UrunListele() {
    this.apiServis.UrunListe().subscribe((d: Urun[]) => {
      this.urunler = d;
      this.dataSource = new MatTableDataSource(this.urunler);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
    });
  }

  Filtrele(e: any){
    var deger = e.target.value;
    this.dataSource.filter=deger.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }

  }

  Ekle(){
    var yeniKayit:Urun = new Urun();
    this.dialogRef = this.matDialog.open(UrunDialogComponent, {
      width: '400px',
      data:{
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if(d) {
        this.apiServis.UrunEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if(s.islem){
            this.UrunListele();
          }
          });
      }
      
    });
  }

  Duzenle(kayit: Urun){
    this.dialogRef = this.matDialog.open(UrunDialogComponent, {
      width: '400px',
      data:{
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d) {
      kayit.urunAdi = d.urunAdi;
      kayit.urunKatId = d.urunKatId;
      kayit.urunFiyat = d.urunFiyat;


      this.apiServis.UrunDuzenle(kayit).subscribe((s: Sonuc) => {
        this.alert.AlertUygula(s);
      });
    }
    });
  }

  Sil(kayit: Urun){
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '500px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.urunAdi + " isimli ürün silinecektir onaylıyor musunuz?";

    this.confirmDialogRef.afterClosed().subscribe(d=> {
      if(d){
        this.apiServis.UrunSil(kayit.urunId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if(s.islem) {
            this.UrunListele();
          }
        });
      }
    });
  }
}
