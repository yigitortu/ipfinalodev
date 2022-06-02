using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace uyg03.ViewModel
{
    public class UrunModel
    {
        public int urunId { get; set; }

        public string urunAdi { get; set; }

        public int urunKatId { get; set; }

        public string urunKatAdi { get; set; }

        public decimal urunFiyat { get; set; }

        

        public KategoriModel katBilgi { get; set; }

        public UrunModel urunBilgi { get; set; }

    }
}