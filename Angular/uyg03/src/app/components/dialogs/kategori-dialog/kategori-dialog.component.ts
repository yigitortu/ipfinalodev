import { Kategori } from './../../../models/Kategori';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-kategori-dialog',
  templateUrl: './kategori-dialog.component.html',
  styleUrls: ['./kategori-dialog.component.css']
})
export class KategoriDialogComponent implements OnInit {
  dialogBaslik: string;
  islem: string;
  frm: FormGroup;
  yeniKayit: Kategori;

  constructor(

    public matDialog: MatDialog,
    public frmBuild: FormBuilder,
    public dialogRef: MatDialogRef<KategoriDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.islem = data.islem;
    this.yeniKayit = data.kayit;
    if (this.islem == 'ekle'){
      this.dialogBaslik = "Kategori ekle";
    }
    if (this.islem == 'duzenle'){
      this.dialogBaslik = "Kategori düzenle";
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit(
    
  ) {
  }

  FormOlustur(){
    return this.frmBuild.group({
      katId:[this.yeniKayit.katId],
      katAdi:[this.yeniKayit.katAdi],
    })
    
  }


}
