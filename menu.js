// FIRAT DONDURMA & KADAYIF — MENÜ
// Fiyat veya ürün değiştirmek için yalnızca bu dosyayı düzenleyin.
window.FIRAT = {
  ad: "Fırat Dondurma & Kadayıf",
  telefon: "0543 624 66 40",
  whatsapp: "905436246640", // ülke koduyla, boşluksuz
  sehir: "Şanlıurfa",
  kategoriler: [
    {
      id: "kadayif", baslik: "Kadayıf", aciklama: "Bakır tepside, ocak başında, sipariş üzerine pişer.",
      urunler: [
        { id: "tepsi", ad: "1 Tepsi Kadayıf", not: "Kalabalık sofralar için", fiyat: 400, gorsel: "assets/kunefe-kare.jpg", one: true },
        { id: "yarim-tepsi", ad: "Yarım Tepsi Kadayıf", not: "2–3 kişilik", fiyat: 200, gorsel: "assets/yarim-tepsi.jpg" },
        { id: "porsiyon-kadayif", ad: "Tek Kişilik Porsiyon Kadayıf", not: "Sıcak servis", fiyat: 100, gorsel: "assets/porsiyon-kunefe.jpg" },
        { id: "tel", ad: "1 Kilo Kadayıf Teli", not: "Evde yapmak isteyenlere, günlük çekim", fiyat: 100, gorsel: "assets/kadayif-teli.jpg" },
        { id: "serbet", ad: "1 Torba Şerbet", not: "Kadayıfın hazır şerbeti", fiyat: 50 }
      ]
    },
    {
      id: "dondurma", baslik: "Dondurma", aciklama: "Kadayıfın yanına da, tek başına da.", afis: "assets/kunefe-dondurmali.jpg",
      urunler: [
        { id: "dondurma-kilo", ad: "1 Kilo Dondurma", not: "Paket", fiyat: 300, gorsel: "assets/dondurma-top.jpg" },
        { id: "dondurma-yarim", ad: "500 Gr Dondurma", not: "Paket", fiyat: 150, gorsel: "assets/dondurma-top.jpg" },
        { id: "dondurma-porsiyon", ad: "Tek Kişilik Porsiyon Dondurma", not: "", fiyat: 50, gorsel: "assets/dondurma-top.jpg" }
      ]
    },
    {
      id: "icecek", baslik: "İçecekler", aciklama: "",
      urunler: [
        { id: "cola-25", ad: "2,5 Lt Coca Cola", fiyat: 100 },
        { id: "fanta-25", ad: "2,5 Lt Fanta", fiyat: 100 },
        { id: "cola-1", ad: "1 Lt Coca Cola", fiyat: 70 },
        { id: "fanta-1", ad: "1 Lt Fanta", fiyat: 70 },
        { id: "soda", ad: "Sade Soda", fiyat: 15 },
        { id: "meyveli-soda", ad: "Meyveli Soda", fiyat: 20 },
        { id: "kutu-kola", ad: "Kutu Kola", fiyat: 50 }
      ]
    }
  ]
};
