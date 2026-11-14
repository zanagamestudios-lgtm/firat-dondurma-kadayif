(function () {
  "use strict";
  var V = window.FIRAT;
  var ANAHTAR = "firat-sepet-v1";
  var sepet = {};
  try { sepet = JSON.parse(localStorage.getItem(ANAHTAR) || "{}") || {}; } catch (e) { sepet = {}; }

  var urunler = {};
  V.kategoriler.forEach(function (k) { k.urunler.forEach(function (u) { urunler[u.id] = u; }); });
  // Menüde artık olmayan ürünleri sepetten at
  Object.keys(sepet).forEach(function (id) { if (!urunler[id] || !(sepet[id] > 0)) delete sepet[id]; });

  var $ = function (s) { return document.querySelector(s); };
  var tl = function (n) { return n.toLocaleString("tr-TR") + " ₺"; };
  var kacis = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };

  function adetHtml(id, kucuk) {
    var n = sepet[id] || 0;
    var ad = kacis(urunler[id].ad);
    return '<div class="adet" data-id="' + id + '" data-adet="' + n + '">' +
      '<button type="button" class="eksi" data-is="-1" aria-label="' + ad + ' azalt">−</button>' +
      '<output aria-live="polite">' + n + '</output>' +
      '<button type="button" class="arti" data-is="1" aria-label="' + ad + ' ekle">+</button></div>';
  }

  var KULAH = '<svg viewBox="0 0 48 48" width="40" height="40" aria-hidden="true"><path d="M14 20a10 10 0 0 1 20 0c2 0 3 1.500 3 3s-1 3-3 3H14c-2 0-3-1.500-3-3s1-3 3-3z" fill="#FFF6E6" stroke="currentColor" stroke-width="2"/><path d="M15 26l9 18 9-18" fill="#E9A23B" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="20" cy="15" r="1.600" fill="#7C9A2E"/><circle cx="27" cy="13" r="1.600" fill="#7C9A2E"/><circle cx="29" cy="19" r="1.600" fill="#7C9A2E"/></svg>';
  var BARDAK = '<svg viewBox="0 0 48 48" width="36" height="36" aria-hidden="true"><path d="M14 10h20l-3 30H17z" fill="#FFF6E6" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M15.500 22h17" stroke="currentColor" stroke-width="2"/><path d="M27 10l4-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  var TORBA = '<svg viewBox="0 0 48 48" width="36" height="36" aria-hidden="true"><path d="M18 12h12l-2 5c6 3 9 9 9 15 0 6-5 10-13 10S11 38 11 32c0-6 3-12 9-15z" fill="#F4B94A" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>';

  function gorselHtml(u, katId) {
    if (u.gorsel) return '<img class="gorsel" src="' + u.gorsel + '" alt="" loading="lazy">';
    var ikon = katId === "dondurma" ? KULAH : katId === "icecek" ? BARDAK : TORBA;
    return '<div class="gorsel bos">' + ikon + '</div>';
  }

  function menuCiz() {
    var sekme = "", html = "";
    V.kategoriler.forEach(function (k, i) {
      sekme += '<a href="#k-' + k.id + '"' + (i === 0 ? ' class="secili"' : "") + '>' + kacis(k.baslik) + '</a>';
      html += '<section class="kategori" id="k-' + k.id + '"><h3>' + kacis(k.baslik) + '</h3>' +
        (k.aciklama ? "<p>" + kacis(k.aciklama) + "</p>" : "") +
        (k.afis ? '<img class="afis" src="' + k.afis + '" alt="Sıcak kadayıfın üstünde bir top dondurma" loading="lazy">' : "") + '<ul class="urunler">';
      k.urunler.forEach(function (u) {
        var bilgi = '<div><h4>' + kacis(u.ad) + '</h4>' + (u.not ? '<p class="not">' + kacis(u.not) + '</p>' : "") +
          '<p class="fiyat">' + tl(u.fiyat) + '</p></div>';
        if (u.one) {
          html += '<li class="urun one">' + gorselHtml(u, k.id) + '<div class="one-alt"><div><span class="rozet">En çok istenen</span>' +
            bilgi.slice(5, -6) + '</div>' + adetHtml(u.id) + '</div></li>';
        } else {
          html += '<li class="urun">' + gorselHtml(u, k.id) + bilgi + adetHtml(u.id) + '</li>';
        }
      });
      html += "</ul></section>";
    });
    $("#sekmeler").innerHTML = sekme;
    $("#liste").innerHTML = html;
  }

  function toplam() {
    var adet = 0, tutar = 0;
    Object.keys(sepet).forEach(function (id) { adet += sepet[id]; tutar += sepet[id] * urunler[id].fiyat; });
    return { adet: adet, tutar: tutar };
  }

  function guncelle() {
    try { localStorage.setItem(ANAHTAR, JSON.stringify(sepet)); } catch (e) {}
    document.querySelectorAll("#liste .adet").forEach(function (el) {
      var n = sepet[el.dataset.id] || 0;
      el.dataset.adet = n; el.querySelector("output").textContent = n;
    });
    var t = toplam();
    $("#sepetCubuk").hidden = t.adet === 0;
    $("#sepetAdet").textContent = t.adet;
    $("#sepetTutar").textContent = tl(t.tutar);
    $("#panelToplam").textContent = tl(t.tutar);
    var li = "";
    Object.keys(sepet).forEach(function (id) {
      li += '<li><span class="ad">' + kacis(urunler[id].ad) + '</span>' + adetHtml(id) +
        '<span class="tutar">' + tl(sepet[id] * urunler[id].fiyat) + '</span></li>';
    });
    $("#sepetListe").innerHTML = li || '<li class="bos-sepet" style="display:block">Sepetiniz boş. Menüden ürün ekleyin.</li>';
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest(".adet button");
    if (!b) return;
    var id = b.parentElement.dataset.id;
    var n = Math.max(0, Math.min(99, (sepet[id] || 0) + Number(b.dataset.is)));
    if (n) sepet[id] = n; else delete sepet[id];
    guncelle();
  });

  var panel = $("#panel");
  $("#sepetAc").addEventListener("click", function () { $("#hata").hidden = true; panel.showModal(); });
  panel.addEventListener("click", function (e) { if (e.target === panel) panel.close(); });

  var form = $("#siparisForm");
  function teslimatAyar() {
    var adrese = form.teslimat.value === "Adrese teslim";
    $("#adresAlan").hidden = !adrese;
  }
  form.addEventListener("change", teslimatAyar);
  // Müşteri bilgilerini hatırla (yalnızca bu cihazda)
  try {
    var kayit = JSON.parse(localStorage.getItem("firat-musteri-v1") || "{}");
    ["ad", "tel", "adres"].forEach(function (a) { if (kayit[a]) form[a].value = kayit[a]; });
  } catch (e) {}

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var t = toplam(), hata = $("#hata");
    var ad = form.ad.value.trim(), tel = form.tel.value.trim(), adres = form.adres.value.trim(), not = form.not.value.trim();
    var teslimat = form.teslimat.value, mesaj = "";
    if (!t.adet) mesaj = "Sepetiniz boş. Önce menüden ürün ekleyin.";
    else if (!ad) mesaj = "Lütfen adınızı yazın.";
    else if (tel.replace(/\D/g, "").length < 10) mesaj = "Lütfen size ulaşabileceğimiz telefon numarasını yazın.";
    else if (teslimat === "Adrese teslim" && adres.length < 8) mesaj = "Lütfen teslimat adresini yazın.";
    if (mesaj) { hata.textContent = mesaj; hata.hidden = false; hata.scrollIntoView({ block: "center" }); return; }
    hata.hidden = true;
    try { localStorage.setItem("firat-musteri-v1", JSON.stringify({ ad: ad, tel: tel, adres: adres })); } catch (e2) {}

    var s = ["*Yeni Sipariş — " + V.ad + "*", ""];
    Object.keys(sepet).forEach(function (id) {
      s.push("• " + sepet[id] + " x " + urunler[id].ad + " — " + tl(sepet[id] * urunler[id].fiyat));
    });
    s.push("", "*Toplam: " + tl(t.tutar) + "*", "", "Teslimat: " + teslimat, "Ad: " + ad, "Telefon: " + tel);
    if (teslimat === "Adrese teslim") s.push("Adres: " + adres);
    if (not) s.push("Not: " + not);
    window.open("https://wa.me/" + V.whatsapp + "?text=" + encodeURIComponent(s.join("\n")), "_blank", "noopener");
  });

  // Seçili sekme
  function sekmeIzle() {
    var linkler = document.querySelectorAll("#sekmeler a");
    if (!("IntersectionObserver" in window)) return;
    var g = new IntersectionObserver(function (kayitlar) {
      kayitlar.forEach(function (k) {
        if (!k.isIntersecting) return;
        linkler.forEach(function (a) { a.classList.toggle("secili", a.getAttribute("href") === "#" + k.target.id); });
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    document.querySelectorAll(".kategori").forEach(function (el) { g.observe(el); });
  }

  menuCiz(); teslimatAyar(); guncelle(); sekmeIzle();
})();
