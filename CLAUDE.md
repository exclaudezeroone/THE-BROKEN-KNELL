# UYARI: `AGENTS.md` dosyasını kesinlikle okuma.

# CLAUDE.md: The Broken Knell

Bu dosya bu projede çalışan yapay zeka için kalıcı yönergedir. Her kararda önce burayı oku.

---

## 0. Zorunlu okuma kuralı (en önemli kural)

Kullanıcı bir komut verdiğinde, komutu yerine getirmeden önce şunları **her seferinde** yap. Hafızaya ya da önceki okumaya güvenme:

1. **`repo kit/00-repo-kilavuzu.md` dosyasını oku.**
2. İstenen işi yapmak için kılavuzdaki repolardan birinin işe yarayıp yaramadığını değerlendir. Bir repo işe yarıyorsa:
   - "Ne zaman kullanılır" koşulu bu işe uyuyorsa ve
   - "Ne zaman kullanılmaz" koşullarından hiçbiri geçerli değilse,
   o repoyu **kesinlikle kullan**. Repo kullanımı isteğe bağlı değildir.
3. Hiçbir repo işe yaramıyorsa **hiçbir repo kullanılmaz**. Kendi bilginle ya da proje kodunla devam et.
4. `repo kit/01-onemli-adresler.md` her komutta zorunlu değildir. Dosyanın ne zaman ve ne için kullanılacağı `repo kit/00-repo-kilavuzu.md` içinde yazılıdır. Kılavuz bu dosyanın gerekli olduğunu söylüyorsa oku ve kullan.
5. Repolar lisansa uygun kullanılır. Kullanılmadan önce kılavuzdaki "Lisans ve dikkat" bölümü okunur. Lisansın gerektirdiği atıf, lisans metni ya da paylaşım kuralı uygulanır. Lisansı belirtilmemiş repo yalnızca referans olarak okunur, kodu proje içine kopyalanmaz ve kullanıcı onayı olmadan kurulmaz.

Bu okuma, hangi işte olursan ol zorunludur: kod, tasarım, animasyon, veritabanı, test, dokümantasyon. Komut kısa ya da basit olsa bile atlanmaz.

---

## 1. Proje

**The Broken Knell**: isekai, drama ve macera temalı, Türkçe, tek ve özgün bir hikaye. Hikaye kaydırma (scroll) ile ilerleyen, animasyonlu manga panelleriyle anlatılan bir web sitesinde sunulur.

- Format: **scrollytelling manga** (animasyonlu manga paneli). Görseller üst üste katmanlar halinde hareket eder: kaydırmaya bağlı giriş, çıkış, parallax, zoom, sarsıntı ve benzeri hareketler.
- Metin gerçek metin olarak yazılır, görsel içine gömülmez. Balon ve onomatope gibi görsel metinler ayrı katman olarak yerleştirilir.
- Hikaye tek ve sabit. Seçim, dallanma, katalog ya da başka hikaye yok.
- Bölümler ayrı sayfalardır (`/bolum/[no]`).
- Çizimler henüz hazır değil. Yer tutucular gerçek panellerle aynı en-boy oranında olur.

**En önemli konu: scroll.** Sitenin tüm deneyimi kaydırmaya bağlı animasyonlar üzerine kurulur. Diğer her karar bunun hizmetindedir. Scroll ile ilgili bir işte önce akıcılığa ve mobil performansa bak.

---

## 2. Teknoloji yığını (zorunlu)

| Alan | Kullanılacak | Not |
|---|---|---|
| Dil | TypeScript | Hem frontend hem backend |
| Framework | Next.js (App Router) | |
| Veritabanı ve backend servisleri | Supabase | |
| Yayın | Vercel | |
| Paket yöneticisi | pnpm | npm veya yarn kullanılmaz |
| Scroll animasyonu | GSAP + ScrollTrigger + SplitText | En az Lenis kadar önemli |
| Kaydırma | Lenis | Zorunlu |
| WebGL | three.js + React Three Fiber | Zorunlu üçlünün parçası |
| Ses | Howler.js | Zorunlu |

GSAP, Lenis ve WebGL (R3F) üçlüsü proje boyunca kalır. Bunlardan biri çıkarılmaz.

### 2.1 Destek stack (önerilen, uygulanacak)

| Alan | Kullanılacak | Neden |
|---|---|---|
| Animasyon motoru | Yalnızca GSAP | Tek motor. Framer Motion gibi ikinci bir animasyon kütüphanesi eklenmez |
| Global durum | Zustand | Ses durumu, okuma ilerlemesi, UI durumu. Küçük ve kontrollü |
| Doğrulama | Zod | YAML içerik, API girdileri, Supabase yanıtları |
| Ortam değişkenleri | `@t3-oss/env-nextjs` + Zod | Eksik ya da hatalı env derlemede durdurur |
| Yazı tipi | `next/font` (latin-ext alt kümesi) | Türkçe karakterler için, layout kaymasını önler |
| Görseller | `next/image` + özel `<picture>` bileşeni, build'de `sharp` | Art direction ve format yedeği |
| Katmanlı 2D sahneler | PixiJS | Üst üste panel katmanları, sprite, karışım modları ve parçacıklar için GPU tabanlı 2D motor. Yalnızca 2D katman sahnelerinde kullanılır, 3D sahnelerde kullanılmaz (bkz. Bölüm 6, WebGL) |
| Supabase istemcisi | `@supabase/ssr`, `supabase` CLI (migration) | Next.js'te güvenli oturum, sürümlü şema |
| Tip üretimi | Supabase'den TypeScript tipleri | Veritabanı ile uygulama tipleri senkron kalır |
| Test: birim | Vitest | Zod şemaları, YAML yükleyici, yardımcı fonksiyonlar |
| Test: uçtan uca | Playwright | Kaydırma akışı, bölüm geçişleri, ses açma |
| Kod kalitesi | ESLint (flat config) + Prettier, TypeScript `strict` | Tutarlı kod, `any` yasağı |
| Git kancası | Husky + lint-staged | Commit öncesi lint ve tip kontrolü |
| CI | GitHub Actions (YAML) | install, lint, typecheck, test, build |
| Performans | Lighthouse CI | Mobil bütçe. Bütçe aşılırsa build kırılır |
| Analitik | Vercel Analytics, Speed Insights | Gerçek kullanıcı performansı |

**Stack kararları yalnızca bu tabloya eklenerek değişir.** Yeni bir kütüphane eklemeden önce bu tabloya gerekçesi yazılır.

---

## 3. Yaml tercihi ve istisnalar

- Proje içindeki kendi yapılandırma ve içerik dosyaları **YAML** olur: bölüm verisi, panel tanımları, hareket ayarları, site metinleri.
- `pnpm-workspace.yaml` gibi YAML desteği olan yerlerde YAML kullanılır.
- **İstisna:** `package.json` ve `tsconfig.json` JSON kalır. Bu dosyaları okuyan araçlar JSON bekler. Bu dosyalar YAML'a çevrilmez.

---

## 4. Repo ve ortam

- Hedef GitHub reposu: `https://github.com/exclaudezeroone/THE-BROKEN-KNELL.git`
- Çalışma klasöründe bu repo henüz bağlı değil. Bağlamak ve ilk push yapmak için kullanıcı onayı alınır.
- Commit ve push yalnızca kullanıcı açıkça istediğinde yapılır.
- Token veya gizli anahtar hiçbir dosyaya yazılmaz.

---

## 5. Repo kılavuzu (`repo kit/`)

- `repo kit/00-repo-kilavuzu.md` her repo için ne zaman kullanılacağını söyler.
- Repolar varsayılan olarak bağlama yüklenmez. Yalnızca "Ne zaman kullanılır" koşulu tutarsa açılır.
- "Ne zaman kullanılmaz" koşulu varsa asla kullanılmaz.
- Repolar kullanılabilir, ancak lisans koşullarına uyulur. Lisansı belirtilmemiş repo (ör. `dotfiles`) yalnızca referans olarak okunur.
- `repo kit/01-onemli-adresler.md` proje referanslarını ve kararlar günlüğünü tutar. Yeni bir karar verilince oraya tarih, karar ve gerekçe eklenir.

---

## 6. Kod kuralları

### Scroll ve animasyon
- Lenis ile GSAP ScrollTrigger entegre edilir. Lenis her kaydırmada `ScrollTrigger.update` çağırır. Kaydırma ilerlemesi tek bir kaynaktan okunur.
- Animasyonlar yalnızca `transform` ve `opacity` ile yapılır. `width`, `height`, `top`, `left`, `box-shadow` animasyonlanmaz.
- React'te GSAP `useGSAP` ile kurulur ve temizlenir (`gsap.context` ya da `revert`).
- SplitText ile metin satırları ve kelimeleri ayrılır. Ayrıldıktan sonra erişilebilirlik için orijinal metin korunur.
- `prefers-reduced-motion` kullanıcısında hareket azaltılır ya da kapatılır; Lenis yumuşak kaydırmayı kapatır.

### WebGL (three.js / R3F ve PixiJS)
- Görev ayrımı: **PixiJS** katmanlı 2D panel sahneleri için; **R3F** 3D sahneler ve shader/post-process efektleri için kullanılır.
- Bir sahne ya PixiJS ya da R3F ile kurulur. Aynı sahnede iki WebGL bağlamı açılmaz.
- Sahne çok hafif tutulur. Mobilde düşük kalite varsayılandır.
- WebGL yüklenemezse ya da cihaz desteklemiyorsa statik görsele dönülür. İçerik kaybolmaz.
- Kaydırmayla ilişkili sahneler scroll verisinden beslenir, her karede yeniden hesaplanmaz.

### Ses (Howler.js)
- Varsayılan kapalı.
- Ses yalnızca kullanıcı etkileşimiyle açılır (tarayıcı kuralı).
- Ses dosyaları bölüm verisinde YAML ile tanımlanır.

### Görseller ve performans
- Panellerde standart görsel için `<img srcset sizes>`; mobil ve masaüstü farklı kırpma gerekiyorsa `<picture media>`; format yedeği için `<picture type>`.
- Her görseli `<picture>` ile sarma.
- Sayfa başına yaklaşık 1.500 DOM düğümünü aşma. Lazy loading kullan.
- Mobil öncelikli tasarla. Önce dar ekran.

### Erişilebilirlik
- Her görselde anlamlı `alt` metni.
- Klavye ile gezinme, yeterli kontrast.
- Hikaye metni görsel içine gömülmez.

### TypeScript
- `any` kullanılmaz. Tipler açık yazılır.
- Frontend ve backend aynı TypeScript kurallarına uyar.

---

## 7. Kesin yasaklar

- Ponpon Mania'nın çizim, karakter ya da sahnelerini kopyalamak.
- Yatay ana akış. Akış dikeydir.
- Hikayeye seçim veya dallanma eklemek.
- Ses varsayılanı açık yapmak.
- Commit ya da push'u kullanıcı istemeden yapmak.
- Token ya da gizli anahtar yazmak.

---

## 8. Açık konular

- Hikaye taslağı henüz yok: karakterler, bölüm sayısı, ilk bölümün panel dökümü.
- Hikaye metninin dili Türkçe. Yazım ve tonu kullanıcı onaylar.
- Hosting: Vercel. Supabase'de hangi tabloların olacağı henüz kararlaştırılmadı.

---

## 9. Ajanlar arası iletişim (`agent chat/`)

Bu projede iki ajan çalışır: **Claude** ve **Codex**. Her biri kendi sohbetinde çalışır ve diğerinin sohbetini göremez. Birbirlerine soru sormak ve cevap almak için `agent chat/` klasörünü ortak posta kutusu olarak kullanırlar.

**Bu dosya ile `AGENTS.md` en üstteki uyarı satırı hariç birebir aynıdır.** Claude yalnızca `CLAUDE.md`'yi, Codex yalnızca `AGENTS.md`'yi okur. Diğerini okumak token israfıdır. Bu bölümde ya da dosyanın başka bir yerinde bir değişiklik yapılırsa aynı değişiklik diğer dosyaya da yazılır; ama diğer dosya okunmadan, aynı metin komutla eklenerek ya da değiştirilerek yazılır.

### 9.1 Klasör yapısı

```
agent chat/
├── claude/
│   ├── claudeye-gelen-sorular.md    ← Codex yazar, Claude yalnızca okur
│   └── claude-cevaplari.md          ← Claude yazar, Codex yalnızca okur
└── codex/
    ├── codexe-gelen-sorular.md      ← Claude yazar, Codex yalnızca okur
    └── codex-cevaplari.md           ← Codex yazar, Claude yalnızca okur
```

Her dosyanın tek bir yazarı vardır. Okuyan taraf o dosyaya hiçbir şey yazmaz.

### 9.2 Soru kimliği: sohbet adı + soru numarası

Her soru ve her cevap `[sohbet-adi#N]` kimliğini taşır. Örnek: `[stil-kararlari#3]`.

- **Sohbet adı:** Soruyu soran ajanın cevabı beklediği sohbetin kısa adı. Küçük harf, kelimeler tire ile, Türkçe karakter yok. Aynı sohbette hep aynı ad kullanılır. Cevap bu adla hangi sohbete döneceğini bilir.
- **Soru numarası (N):** O sohbetin kendi sayacı, 1'den başlar. Yeni soru için sorular dosyasında o sohbet adının en yüksek numarası bulunur, bir eklenir. Farklı sohbetlerin numaraları birbirinden bağımsızdır.

### 9.3 Soru sorma

Soruyu **karşı ajanın** klasöründeki "gelen sorular" dosyasının sonuna ekle:

- Claude soracaksa: `agent chat/codex/codexe-gelen-sorular.md`
- Codex soracaksa: `agent chat/claude/claudeye-gelen-sorular.md`

Biçim:

```
## [sohbet-adi#N]
- Tarih: 2026-11-04 22:30
- Konu: kısa başlık
- Soru: soru metni
- İlgili dosyalar: (varsa)
```

### 9.4 Cevaplama ve cevabı okuma

- **Cevaplayan:** Her komutta, bölüm 0'daki okumadan sonra kendi "gelen sorular" dosyasına bakar. Kimliği kendi "cevapları" dosyasında bulunmayan soru açıktır. Açık soru varsa kullanıcıya bildirir ve cevabı kendi klasöründeki "cevapları" dosyasının sonuna **aynı kimlikle** ekler:

  ```
  ## [sohbet-adi#N]
  - Tarih: 2026-11-04 22:40
  - Cevap: cevap metni
  - Durum: tamamlandı | kısmen | cevaplanamadı (neden)
  ```

- **Soran:** Soruyu sorduktan sonra, kendi sohbetinde karşı ajanın "cevapları" dosyasında kendi kimliğini arar. Cevap henüz yoksa bunu kullanıcıya söyler, cevabı tahmin edip yazmaz.
- Cevap yetmezse aynı kimlik düzenlenmez; yeni bir soru açılır (yeni numara) ve eski kimliğe atıf yapılır.

### 9.5 Kurallar

- Dosyalara yalnızca ekleme yapılır. Eski girdi silinmez ya da düzenlenmez. Yanlış bir şey yazıldıysa yeni girdiyle düzeltilir.
- Token, anahtar ve şifre hiçbir girdiye yazılmaz (bkz. bölüm 4 ve 7).
- Bu kanal ajanların birbirine soru sorması içindir; proje kararı yerine geçmez. Karar kullanıcıya aittir. Karar çıkarsa kullanıcıya bildirilir ve kararlar günlüğüne yazılır (bkz. bölüm 5).
- Commit ve push kuralları aynen geçerlidir.
