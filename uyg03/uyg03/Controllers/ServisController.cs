using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using uyg03.Models;
using uyg03.ViewModel;

namespace uyg03.Controllers
{
    public class ServisController : ApiController
    {

        DB01EntitiesSON db = new DB01EntitiesSON();
        SonucModel sonuc = new SonucModel();

        #region  <----Kategori---->

        // Kategori Listeleme
    
        [HttpGet]
        [Route("api/kategoriliste")]

        public List<KategoriModel> KategoriListe()
        {
            List<KategoriModel> liste = db.Kategori.Select(x => new KategoriModel()
            {
                katId=x.katId,
                katAdi=x.katAdi,
                katUrunSayisi=x.Urun.Count()

            }).ToList();

            return liste;
        }

        // ID ye göre kategori listeleme

        [HttpGet]
        [Route("api/kategoribyid/{katId}")]

        public KategoriModel KategoriById(int katId)
        {
            KategoriModel kayit = db.Kategori.Where(s => s.katId == katId).Select(x => new KategoriModel()
            {
                katId=x.katId,
                katAdi=x.katAdi,
                katUrunSayisi=x.Urun.Count()


            }).FirstOrDefault();

            return kayit;

        }

        [HttpPost]
        [Route("api/kategoriekle")]

        public SonucModel KategoriEkle(KategoriModel model)
        {
            if (db.Kategori.Count(s => s.katAdi == model.katAdi) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Zaten böyle bir kategori sistemde kayıtlı.";
                return sonuc;
            }

            Kategori yeni = new Kategori();
            
            yeni.katAdi = model.katAdi;

            db.Kategori.Add(yeni);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Kategori eklendi.";

            return sonuc;
        }

        // Kategori Düzenle

        [HttpPut]
        [Route("api/kategoriduzenle")]
        public SonucModel KategoriDuzenle(KategoriModel model)
        {
            Kategori kayit = db.Kategori.Where(s => s.katId == model.katId).FirstOrDefault();

            if (kayit==null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı.";
                return sonuc;
            }

            kayit.katAdi = model.katAdi;
            kayit.katId = model.katId;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Kategori düzenlendi";

            return sonuc;
        }

        // Kategori SİL
        [HttpDelete]
        [Route("api/kategorisil/{katId}")]
        public SonucModel KategoriSil(int katId)
        {
            Kategori kayit = db.Kategori.Where(s => s.katId == katId).FirstOrDefault();

            if (kayit==null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt bulunamadı.!";
                return sonuc;
            }

            if (db.Urun.Count(s=> s.urunKatId==katId) > 0 )
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üzerinde ürün kayıtlı olan kategori silinemez!!!";
                return sonuc;
            }

            db.Kategori.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Kategori başarıyla silindi.";

            return sonuc;
        }

        #endregion


        #region <---Urun--->

        // Ürün LİSTELEME
        [HttpGet]
        [Route("api/urunlistele")]
        public List<UrunModel> UrunListe()
        {
            List<UrunModel> liste = db.Urun.Select(x => new UrunModel()
            {
                urunId = x.urunId,
                urunAdi = x.urunAdi,
                urunKatId = x.urunKatId,
                urunKatAdi = x.Kategori.katAdi,
                urunFiyat = x.urunFiyat
               

            }).ToList();
            return liste;
        }
        // Kategoriye göre ürün listeleme
        [HttpGet]
        [Route("api/urunlistelebykatid/{katId}")]

        public List<UrunModel> UrunListeByKatId(int katId)
        {
            List<UrunModel> liste = db.Urun.Where(s => s.urunKatId == katId).Select(x => new UrunModel()
            {
                urunId = x.urunId,
                urunAdi = x.urunAdi,
                urunKatId = x.urunKatId,
                urunKatAdi = x.Kategori.katAdi,
                urunFiyat = x.urunFiyat
                

            }).ToList();

            return liste;
        }
        // ID ye göre ürün listeleme
        [HttpGet]
        [Route("api/urunbyid/{urunId}")]
        public UrunModel UrunById(int urunId)
        {
            UrunModel kayit = db.Urun.Where(s => s.urunId == urunId).Select(x => new UrunModel()
            {
                urunId = x.urunId,
                urunAdi = x.urunAdi,
                urunKatId = x.urunKatId,
                urunKatAdi = x.Kategori.katAdi,
                urunFiyat = x.urunFiyat

            }).FirstOrDefault();

            return kayit;
        }
        // --------Ürün EKLEME (Foreign key içinde ürün ekleme YANİ (her kategoride aynı üründen olabilir))----------

        [HttpPost]
        [Route("api/urunekle")]
    
        public SonucModel UrunEkle(UrunModel model)
        {
            if (db.Urun.Count(s => s.urunAdi == model.urunAdi && s.urunKatId == model.urunKatId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen ürün ilgili kategoride kayıtlıdır.";
                return sonuc;
            }
            Urun yeni = new Urun();
            yeni.urunAdi = model.urunAdi;
            yeni.urunFiyat = model.urunFiyat;
            yeni.urunKatId = model.urunKatId;
            


            db.Urun.Add(yeni);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Ürün eklendi";
            return sonuc;
        }

        // Ürün DÜZENLEME
        [HttpPut]
        [Route("api/urunduzenle")]

        public SonucModel UrunDuzenle (UrunModel model)
        {
            Urun kayit = db.Urun.Where(s => s.urunId == model.urunId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Ürün bulunamadı.";
                return sonuc;
            }

            kayit.urunAdi = model.urunAdi;
            kayit.urunFiyat = model.urunFiyat;
            kayit.urunKatId = model.urunKatId;
            

            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Ürün düzenlendi";


            return sonuc;
        }
        // ürün SİLME

        [HttpDelete]
        [Route("api/urunsil/{urunId}")]

        public SonucModel UrunSil(int urunId)
        {

            Urun kayit = db.Urun.Where(s => s.urunId == urunId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "ÜRÜN BULUNAMADI!!!";
                return sonuc;
            }

            

            db.Urun.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Ürün silindi.";

            return sonuc;
        }

       

        #endregion

        
    }
}
