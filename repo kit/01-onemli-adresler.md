# Önemli Adresler: Hareketli Manga Hikaye Sitesi

Bu dosya projenin yön rehberidir. Repo kılavuzundan (`00-repo-kilavuzu.md`) ayrıdır ve repolarla karışmaz. Kod, performans ve tasarım kararları verilmeden önce ilgili bağlantılar açılır ve kararlar günlüğe yazılır.

---

## 1. Proje özeti

- Tek bir özgün, Türkçe hikayeyi anlatan, dikey kaydırmalı hareketli bir manga sitesi.
- Okuyucu sayfayı dikey kaydırır. Paneller kaydırmaya bağlı olarak girer, çıkar, kayar, büyür, kararır ve titrer.
- Hikaye bölümlere ayrılır. Her bölüm ayrı bir sayfadır.
- Mobil öncelikli tasarlanır, masaüstünde de düzgün görünür.
- Çizimler henüz hazır değil. Geliştirme sırasında yer tutucu paneller kullanılır.
- Hikaye metni henüz yazılmadı.

**Üç ilham kaynağı ve kullanım amacı:**

| Kaynak | Ne için |
|---|---|
| Who is guilty (geliştirici rehberi) | Teknik temel: görseller, animasyon, tasarımdan koda aktarım |
| Ponpon Mania | Bölüm yapısı, etkileşimli çizgi roman hissi (yatay ilerler, biz dikey ilerleyeceğiz) |
| Webtoon (bağlantı yok) | Okuma biçimi: dikey şerit, panel boşluğu zaman aracıdır |

---

## 2. Önemli adresler

### 2.1 Teknik kaynak: Who is guilty (geliştirici bölümü)

Ana sayfa: https://whoisguilty.com/developers

> Not: Bu sayfaların çoğu şimdilik sadece başlık ve bağlantı düzeyinde incelendi. "Ne zaman oku" notları başlıklardan çıkarılmıştır. Kullanmadan önce her sayfanın içeriği doğrulanmalıdır.

| Konu | Adres | Ne zaman oku |
|---|---|---|
| Duyarlı görseller: `<picture>` | https://whoisguilty.com/developers/responsive_images/picture_tag | Format yedeği veya mobilde farklı kırpma gerektiğinde |
| Duyarlı görseller: `srcset` ve `sizes` | https://whoisguilty.com/developers/responsive_images/srcset_and_sizes | Aynı görselin farklı çözünürlükleri için |
| Görsel optimizasyonu | https://whoisguilty.com/developers/content_optimization/image_optimizations | Çizimleri dışa aktarmadan önce |
| Font optimizasyonu | https://whoisguilty.com/developers/content_optimization/optimization_font | Font seçmeden önce (Türkçe karakterlere dikkat) |
| Video içerik | https://whoisguilty.com/developers/content_optimization/Optimizing_Video_Content | Kısa animasyon döngüsü gerekirse (düşük öncelik) |
| 3D içerik | https://whoisguilty.com/developers/content_optimization/3D | 3D sahne gerekirse (düşük öncelik) |
| Animasyon temelleri | https://whoisguilty.com/developers/animations/web_animation_basics | Panel hareketlerine başlamadan önce |
| Dikkatli animasyon | https://whoisguilty.com/developers/animations/animate_with_caution | Her yeni animasyondan önce |
| Figma ile çalışma | https://whoisguilty.com/developers/working_with_design/how_to_work_with_figma | Tasarım Figma'da hazırlanırsa |
| Duyarlı ve uyarlanabilir | https://whoisguilty.com/developers/working_with_design/responsive_vs_adaptive | Ekran stratejisine karar verirken |

### 2.2 Tasarımcı bölümü

| Konu | Adres | Ne zaman oku |
|---|---|---|
| Site yapısı | https://whoisguilty.com/designers/Site_structure | Bölüm sayfaları ve gezinme planlanırken |
| Fikir oluşturma | https://whoisguilty.com/designers/Idea_formation | Hikaye ve görsel fikirleri şekillenirken |
| Tasarım düzenleri | https://whoisguilty.com/designers/Design_layouts | Panel düzeni ve hiyerarşi kararlarında |
| Düzen aktarımı | https://whoisguilty.com/designers/Transferring_layout | Tasarımın geliştirmeye teslim biçimini belirlerken |

### 2.3 Kurgu ve his referansı: Ponpon Mania

Yalnızca yapı ve teknik fikir için. Çizim, karakter ya da sahne kopyalanmaz.

| Sayfa | Adres | Ne için bakılır |
|---|---|---|
| Giriş | https://ponpon-mania.com/ | Karşılama, ton, çağrı |
| Bölüm listesi | https://ponpon-mania.com/chapters | Numaralı, adlı bölümler ve cilt yapısı |
| Bölüm 1 | https://ponpon-mania.com/chapter/1 | Açılış, panel girişleri, tempo |
| Bölüm 2 | https://ponpon-mania.com/chapter/2 | Tutarlılık ve değişim |
| Bölüm 3 | https://ponpon-mania.com/chapter/3 | Bölümler arası ritim |
| Hakkında | https://ponpon-mania.com/about | Ekibin iş bölümü |

**Dikkat:** Ponpon yatay ilerler. Bizde yatay kayma dikey kaydırmaya, yandan giriş alttan ya da yandan girişe çevrilir.

### 2.4 Tanıtım hikayesi

- https://promo.whoisguilty.com/: Bölüm menüsü, ilerleme yüzdesi, onomatope metinleri ve ses uyarısı açısından incelenir. Seçim ve dallanma kullanılmaz; ama bölüm menüsü ve ilerleme göstergesi faydalı olabilir.

---

## 3. Çalışma ilkeleri

1. **Her teknik karardan önce ilgili sayfayı oku.** Hafızadan tahmin etme.
2. **Mobil öncelikli tasarla.** Önce dar ekran, sonra geniş ekran.
3. **Hafif kal.** Sayfa başına yaklaşık 1.500 DOM düğümünün üzerine çıkma. Lazy loading kullan, gereksiz sarmalayıcı eleman ekleme.
4. **Doğru görsel etiketini seç:**
   - Tam genişlik standart panel: `<img>` + `srcset` + `sizes`
   - Mobil ve masaüstünde farklı kırpma: `<picture>` + `media`
   - Format yedeği gereken önemli panel: `<picture>` + `type`
   - Her görseli `<picture>` ile sarma; DOM şişer.
5. **Animasyon güvenli olsun.** Yalnızca `transform` ve `opacity` animasyonla. `width`, `top`, `box-shadow` gibi özellikleri animasyonla. Her yeni animasyondan önce "Dikkatli animasyon" sayfasını kontrol et.
6. **Erişilebilirlik:** Anlamlı `alt` metni, `prefers-reduced-motion` desteği, klavye gezinmesi, yeterli kontrast. Hikaye metni görsel içine gömülmesin; gerçek metin olsun.
7. **Ses isteğe bağlı.** Varsayılan kapalı, okuyucu açabilsin.
8. **Yer tutucu paneller.** Gerçek panellerle aynı en-boy oranında üretilsin ki değiştirmek kolay olsun.
9. **Karar çıkınca günlüğe yaz.** Bölüm 6'daki tabloya tarih, karar ve gerekçe ekle.

---

## 4. Site yapısı ve hareket sözlüğü

### 4.1 Site yapısı

```
/                  → Giriş: hikaye adı, tek cümle tanıtım, "Okumaya başla"
/bolumler          → Bölüm listesi (numaralı, adlı)
/bolum/1 ... /N    → Okuma sayfaları (dikey, panel panel)
/hakkinda          → Hikaye ve yapımcı hakkında
```

Bölüm sayfası bileşenleri: üstte ince ilerleme çubuğu, panel dizisi (görsel, isteğe bağlı metin ve balon, hareket tanımı), sonda "Sonraki bölüm" bağlantısı.

### 4.2 Hareket sözlüğü

Her hareket `transform` ve `opacity` ile yapılabilmeli.

| Hareket | Ne zaman |
|---|---|
| Belirme (fade-in + hafif yukarı kayma) | Standart giriş |
| Kademeli giriş (stagger) | Balonlar, yazılar, kalabalık sahneler |
| Parallax katmanlar | Derinlik, geniş manzara |
| Yakınlaşma (zoom-in) | Dramatik an, yüze yaklaşma |
| Sarsıntı (kısa shake) | Darbe, patlama, şok |
| Hız çizgileri | Koşma, saldırı |
| Onomatope belirmesi | Ses efektleri |
| Kararma / renk geçişi | Zaman, ruh hali geçişi |
| Sabit kamera (sticky) | Yükseklik, düşüş, büyük sahne |

**Kural:** Hareket hikayeye hizmet etmeli. Sakin anlar durağan kalabilir.

---

## 5. Yapılacaklar sırası

1. Hikaye taslağı: konu, karakterler, bölüm sayısı, ilk bölümün panel dökümü.
2. Bölüm 2'deki sayfaları oku ve kararları günlüğe yaz.
3. Tek bölümlük iskelet: yer tutucu paneller, `<picture>` ve `srcset` yapısı, ilerleme çubuğu.
4. Hareket sözlüğünden 3–4 hareketi uygula, telefonda akıcılığı test et.
5. Giriş sayfası ve bölüm listesi.
6. Gerçek çizimleri entegre et, görsel optimizasyonu yap.
7. Erişilebilirlik ve performans kontrolü.

---

## 6. Kararlar günlüğü

| Tarih | Karar | Gerekçe / Kaynak |
|---|---|---|
| 2026-11-04 | Akış dikey, bölümler ayrı sayfa | Webtoon okuma biçimi, Ponpon bölüm yapısı |
| 2026-11-04 | Tek özgün hikaye, Türkçe | Proje sahibinin kararı |
| 2026-11-04 | Teknik temel: Who is guilty geliştirici rehberi | Proje sahibinin kararı |
| 2026-11-04 | Palet yönü: siyah, beyaz, mat kan rengi ana renkler; mat koyu altın vurgu; gölgeler gri tonlarıyla; mat koyu yeşil ikincil; diğer renkler çok nadir. Çizim tam siyah-beyaz değil, çok az renkli | Proje sahibinin kararı. Kontrast hesabı: mat kan ve koyu yeşil koyu zeminde ~2:1 olduğu için yüzey/atmosfer rengi, küçük yazı rengi değil |
| 2026-11-04 | Çizim dili: görseller siyah-beyaz. Kırmızı, koyu altın ve koyu yeşil yalnızca görsellerin içinde vurgu olarak kullanılır. Gölgelendirme ve hareket çizgi ve gri tonlarla yapılır. Palet arayüz zemini için değil, çizimler içindir; site arayüzü nötr ve ince kalır. Hikaye tam ekran, üstte ince modern navbar | Proje sahibinin kararı. Önceki palet satırını inceler: kan, yeşil ve altın artık geniş yüzey değil, küçük vurgu |
| 2026-11-04 | Hikaye tek uzun şerit: panel panel ayrı değil. Görseller ekrana ya da sabit sayıya sığdırılmaz; genişlik tam, yükseklik her görselin kendi oranından gelir, sayfa uzunluğunu içerik belirler | Proje sahibinin kararı. Yer tutucular da parça başına kendi oranını taşır (mobil ve geniş ekran ayrı) |
| 2026-11-04 | Çizim stili: koyu mürekkep manga (geniş siyah alanlar, tarama çizgisi, nokta tonu, orta kontur) ağırlıklı, gravür / oyma baskı karakterinden bir miktar ödünç (sert tarama çizgisi). Üretim yapay zeka destekli. Görseller katmanlı teslim edilebilir (çizgi, ton, vurgu rengi ayrı) | Proje sahibinin kararı. Katman ayrımı hareketin (parallax, hız çizgisi, kararma) önkoşulu; gri tonlu çizgili görseller WebP/AVIF'te küçük kalır (mobil performans) |
| 2026-11-04 | Arayüz stili: mat, kâğıt hissi, sakin, yüksek kontrastlı (E-Ink / Kâğıt) + yalnızca giriş başlığında abartılı minimalizm | ui-ux-pro-max-skill stil kataloğundan uyan iki stil; navbar zaten bu çizgide |
| 2026-11-04 | TypeScript 6.x'e sabitlendi (`^6.0.2`), TS 7'ye geçiş ertelendi | `typescript-eslint` 8.72 TS 7'yi desteklemiyor ve çalışırken hata veriyor; ESLint zorunlu (CLAUDE.md bölüm 2.1). `typescript-eslint` TS >=7.1 desteği gelince (issue #10940) `typescript@^7` geri alınır |
| 2026-11-04 | Scroll mimarisi: Lenis'i GSAP ticker sürer; ilerleme tek kaynaktan (`src/lib/scroll/scroll-bus.ts`) okunur; dokunmatikte yerel kaydırma (`syncTouch: false`) | Mobil akıcılık ve tek kaynak kuralı (CLAUDE.md bölüm 6). Reduced-motion'da Lenis kapalı, hareketler bağlanmaz |
| 2026-11-04 | Panel-hareket sözleşmesi: `data-panel`, `data-motion`, `[data-layer]` (zoom/shake için zorunlu), `[data-item]` | Panelin kendisini ölçeklemek komşu panellere ve yatay kaydırmaya taşıyordu (Playwright ile yakalandı); GSAP kodu yalnızca `src/lib/scroll/motions.ts` içinde |
