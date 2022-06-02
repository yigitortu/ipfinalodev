import { Urun } from './../../../models/Urun';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-urun-dialog',
  templateUrl: './urun-dialog.component.html',
  styleUrls: ['./urun-dialog.component.css']
})
export class UrunDialogComponent implements OnInit {
  dialogBaslik: string;
  islem: string;
  frm: FormGroup;
  yeniKayit: Urun;

  constructor(

    public matDialog: MatDialog,
    public frmBuild: FormBuilder,
    public dialogRef: MatDialogRef<UrunDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.islem = data.islem;
    this.yeniKayit = data.kayit;
    if (this.islem == 'ekle'){
      this.dialogBaslik = "Ürün ekle";
    }
    if (this.islem == 'duzenle'){
      this.dialogBaslik = "Ürün düzenle";
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
  }

  FormOlustur(){
    return this.frmBuild.group({
      urunAdi:[this.yeniKayit.urunAdi],
      urunKatId:[this.yeniKayit.urunKatId],
      
      
      urunFiyat:[this.yeniKayit.urunFiyat],
    })
    
  }
}
