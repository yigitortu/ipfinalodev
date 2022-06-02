import { Sonuc } from './../models/Sonuc';
import { Kategori } from './../models/Kategori';
import { Urun } from './../models/Urun';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = 'http://localhost:55457/api/'
  constructor(public http: HttpClient) {}

  UrunListe() {
    return this.http.get<Urun[]>(this.apiUrl+'urunlistele');
  }
  UrunById(urunId: string) {
    return this.http.get<Urun[]>(this.apiUrl+'urunbyid/' + urunId);
  }
  UrunEkle(urun: Urun) {
    return this.http.post(this.apiUrl+'urunekle', urun);
  }
  UrunDuzenle(urun: Urun) {
    return this.http.put(this.apiUrl+'urunduzenle', urun);
  }
  UrunSil(urunId: number) {
    return this.http.delete(this.apiUrl+'urunsil/' + urunId);
  }

  KategoriListe() {
    return this.http.get<Kategori[]>(this.apiUrl+'kategoriliste');
  }
  KategoriById(katId: number) {
    return this.http.get<Kategori[]>(this.apiUrl+'kategoribyid/' + katId);
  }
  KategoriEkle(kategori: Kategori) {
    return this.http.post(this.apiUrl+'kategoriekle', kategori);
  }
  KategoriDuzenle(kategori: Kategori) {
    return this.http.put(this.apiUrl+'kategoriduzenle', kategori);
  }
  KategoriSil(katId: number) {
    return this.http.delete(this.apiUrl+'kategorisil/' + katId);
  }
}
