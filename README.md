# Notlar

Telefona kurulabilen, çevrimdışı çalışan not ve hatırlatma uygulaması.

**Uygulama:** https://karadenizmehmet-debug.github.io/notlar/

## Neler yapabilir

- Not ve yapılacaklar listesi (maddeleri işaretle, tamamlananlar alta iner)
- Hatırlatma: tek seferlik ya da her gün, hafta içi, her hafta, her ay, her yıl
- Saati gelince bildirim, titreşim ve tam ekran uyarı; 10 dakika erteleme
- Google Takvim'e ya da `.ics` dosyasıyla telefon takvimine ekleme
- Sesle yazma (Türkçe)
- Renkler, etiketler, sabitleme, arşiv, 30 günlük çöp kutusu
- Arama, ızgara/liste görünümü, açık/koyu tema
- Yedek alma ve yedekten geri yükleme (JSON)

## Telefona kurma

Android'de Chrome ile adresi aç, menüden **Ana ekrana ekle**'yi seç. iPhone'da Safari'de **Paylaş → Ana Ekrana Ekle**.

## Bilmen gerekenler

- Notlar yalnızca cihazda (tarayıcı depolamasında) tutulur. Ara sıra **Ayarlar → Yedek al** ile yedek al.
- Web uygulamaları tamamen kapalıyken tam saatinde alarm çalamayabilir. Kaçırılmaması gereken hatırlatmaları hatırlatma penceresindeki **Google Takvim'e ekle** düğmesiyle takvime de ekle.

## Dosyalar

| Dosya | Görev |
| --- | --- |
| `index.html` | Uygulamanın tamamı (arayüz, stil, kod) |
| `sw.js` | Çevrimdışı çalışma ve bildirim tıklamaları |
| `manifest.webmanifest` | Ana ekrana kurulum bilgileri |
| `icons/` | Uygulama simgeleri |

---

Mehmet Karadeniz, 2026-2027
