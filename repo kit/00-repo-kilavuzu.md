# Repo Kılavuzu

Bu dosya, `repo kit/` klasöründeki her repo için ne zaman kullanılacağını tanımlar. Proje geliştirirken bu repoların tamamı bağlama yüklenmez. Yalnızca bu kılavuzdaki koşul tutarsa ilgili repo açılır.

### Önemli adresler dosyası (`01-onemli-adresler.md`)

Bu dosya repo değildir. Projenin referans bağlantılarını, çalışma ilkelerini, site yapısını ve kararlar günlüğünü tutar.

- **Ne zaman kullanılır:** Görev sitenin yapısı, animasyon kararı, görsel ya da font hazırlığı, referans bir sayfanın incelenmesi ya da bir karar kaydı gerektirdiğinde.
- **Ne zaman kullanılmaz:** Yalnızca genel bir kod ya da araç sorusunda, dosyadaki bilgi görevle ilgisizse.
- **Nasıl kullanılır:** İlgili bölüm okunur, bağlantıdaki içerik gerekiyorsa açılır. Yeni bir karar verilirse dosyanın "Kararlar günlüğü" tablosuna tarih, karar ve gerekçe eklenir.

---

## Kurallar

1. **Varsayılan: kullanma.** Bir repo ancak "Ne zaman kullanılır" koşulu açıkça tutuyorsa kullanılır.
2. **"Ne zaman kullanılmaz" koşulu varsa kullanılmaz.** İki koşul çakışırsa yasak kazanır.
3. **Tümünü kurma.** Repo içinde çok skill varsa yalnızca ihtiyaç duyulan skill alınır.
4. **Repolar lisansa uygun kullanılır.** Her repo kullanılabilir, ama kullanım lisans koşullarına aykırı olmamalıdır. Her repodaki "Lisans ve dikkat" bölümü okunur ve şu kurallara uyulur:
   - **MIT, Apache-2.0:** Kullanılabilir. Apache-2.0 ve MIT dağıtımda lisans metnini ve telif notunu korumayı ister.
   - **CC BY-SA:** Kullanılabilir. Türetilmiş işte atıf verilir ve aynı lisansla paylaşılır.
   - **BUSL-1.1 (ör. `rtk`'nın `engine/` ve `proxy/` klasörleri):** Kullanılabilir, ama ticari kullanım için lisans koşulları önce okunur ve kullanıcıya bildirilir.
   - **Lisansı belirtilmemiş (ör. `dotfiles`):** Yalnızca referans olarak okunur. Kodu proje içine kopyalanmaz ve kullanıcı onayı olmadan kurulmaz.
5. **Ajan çıktısını doğrula.** Repodan gelen kural ya da kod, üretimden önce kanıtla kontrol edilir.
6. **Yeni repo eklenince** bu dosyaya, aşağıdaki 6 başlıkla aynı yapıda yeni bir bölüm eklenir ve sıra alfabetik tutulur.

---

## Repolar (A–Z)

Her repo için 6 başlık aynıdır: **Ne işe yarar**, **Neden kullanılır**, **Ne zaman kullanılır**, **Ne zaman kullanılmaz**, **Kaynak ve kurulum**, **Lisans ve dikkat**.

### 1. agent-skills-vercel-labs

Klasör: `agent-skills-vercel-labs/` · Kaynak: vercel-labs/agent-skills

#### Ne işe yarar
Vercel'in resmi skill koleksiyonu. React ve Next.js performans kuralları, web arayüz ve erişilebilirlik denetimi, Vercel'e deploy.

#### Neden kullanılır
React/Next.js kodunda waterfall, bundle ve gereksiz re-render hatalarını baştan önler.

#### Ne zaman kullanılır
- React veya Next.js kodu yazılırken ya da performans incelenirken
- Arayüzün erişilebilirlik ve UX denetimi istendiğinde

#### Ne zaman kullanılmaz
- React veya Next.js içermeyen projelerde
- React Native işi yoksa `react-native-skills` kurulmaz

#### Kaynak ve kurulum
Skill adları: `react-best-practices`, `web-design-guidelines`, `composition-patterns`, `deploy-to-vercel`, `react-native-skills`. Tek skill kurulur: `npx skills add vercel-labs/agent-skills --skill <ad>`

#### Lisans ve dikkat
MIT. Yalnızca gereken skill kurulmalı.

---

### 2. agent-skills-supabase

Klasör: `agent-skills-supabase/` · Kaynak: supabase/agent-skills

#### Ne işe yarar
Supabase ve Postgres için şema, sorgu, indeks, RLS güvenliği, migration ve auth sorun giderme kuralları.

#### Neden kullanılır
RLS politikalarını ve SQL performansını doğru yazdırır.

#### Ne zaman kullanılır
- Supabase veya Postgres şeması, migration ya da RLS politikası yazılırken
- Auth hatası ayıklanırken

#### Ne zaman kullanılmaz
- Supabase veya Postgres kullanılmayan projelerde
- Üretilen SQL doğrulanmadan uygulanmaz

#### Kaynak ve kurulum
Klasördeki `supabase` ve `supabase-postgres-best-practices` skill'lerinden ihtiyaç duyulan alınır.

#### Lisans ve dikkat
MIT. Yazdırılan SQL, uygulanmadan önce `EXPLAIN` ile doğrulanmalı.

---

### 3. agents

Klasör: `agents/` · Kaynak: outfitter-dev/agents

#### Ne işe yarar
Claude Code için disiplinli geliştirme eklentileri. `typescript-dev` skill'i katı tsconfig, `any` kullanımından kaçınma ve Zod doğrulaması kuralları verir.

#### Neden kullanılır
Branded types, exhaustive matching ve modern TypeScript özellikleriyle tip güvenliğini yükseltir.

#### Ne zaman kullanılır
- Yeni veya ciddi bir TypeScript kodu yazılırken
- Tip güvenliği önceliğe alındığında

#### Ne zaman kullanılmaz
- Yalnızca JavaScript olan projelerde
- Hızlı prototip ya da küçük betik yazılırken; katı kurallar gereksiz yük getirir

#### Kaynak ve kurulum
`agents/plugins/outfitter/skills/typescript-dev/` skill'i.

#### Lisans ve dikkat
MIT.

---

### 4. awesome-design-md

Klasör: `awesome-design-md/` · Kaynak: VoltAgent/awesome-design-md

#### Ne işe yarar
Gerçek sitelerin tasarım sistemlerinden çıkarılmış `DESIGN.md` dosyaları: renk, tipografi, boşluk ve buton stilleri.

#### Neden kullanılır
Beğenilen bir görünüme uygun, tutarlı arayüz üretmek için referans sağlar.

#### Ne zaman kullanılır
- Projede belirli bir görsel yön seçilmişse
- Seçilen `DESIGN.md` proje köküne konduğunda

#### Ne zaman kullanılmaz
- Resmi marka kimliği gerektiğinde
- Başka bir markanın görünümü birebir kopyalanacaksa

#### Kaynak ve kurulum
Seçilen sitenin `DESIGN.md` dosyası proje köküne konur. Önizleme için `preview.html` açılır.

#### Lisans ve dikkat
MIT. Bunlar ilham kaynağıdır, resmi marka sistemi değildir.

---

### 5. caveman

Klasör: `caveman/` · Kaynak: JuliusBrussee/caveman

#### Ne işe yarar
Ajan cevaplarını kısaltır. Kod ve teknik içerik korunur.

#### Neden kullanılır
Bağımsız testte çıktı tokenında yaklaşık %37–38 tasarruf sağladı. Satıcının %65 iddiası bu testle doğrulanmadı.

#### Ne zaman kullanılır
- Uzun oturumlarda ve token maliyeti önemliyken

#### Ne zaman kullanılmaz
- Ayrıntılı açıklama, eğitim içeriği ya da kapsamlı rapor istendiğinde

#### Kaynak ve kurulum
Skill olarak açılır. Full ve ultra modları vardır.

#### Lisans ve dikkat
Apache-2.0. Yalnızca ajanın kendi cevabını kısaltır. Komut çıktısı için `rtk` ile birlikte kullanılır.

---

### 6. ccusage

Klasör: `ccusage/` · Kaynak: ryoppippi/ccusage

#### Ne işe yarar
Claude Code ve benzeri ajanların token ve maliyet kullanımını günlük, haftalık, aylık ve oturum bazında raporlar.

#### Neden kullanılır
Token tasarruf araçlarını kurmadan önce ve sonra çalıştırarak gerçek farkı ölçer.

#### Ne zaman kullanılır
- Token araçlarının işe yarayıp yaramadığını ölçmek istendiğinde
- Maliyet ve kota durumu kontrol edilirken

#### Ne zaman kullanılmaz
- Günlük geliştirme sırasında sürekli açık tutmak için; yalnızca ölçüm aracıdır

#### Kaynak ve kurulum
`npx ccusage@latest`

#### Lisans ve dikkat
MIT.

---

### 7. claude-seo

Klasör: `claude-seo/` · Kaynak: AgriciDaniel/claude-seo

#### Ne işe yarar
Teknik SEO, E-E-A-T, schema, sitemap ve Core Web Vitals denetimi. Search Console, PageSpeed, CrUX ve GA4 verisi çeker.

#### Neden kullanılır
Gerçek Google verisiyle organik büyümeyi destekler.

#### Ne zaman kullanılır
- Yayına yakın bir site için SEO denetimi yapılırken
- Search Console veya GA4 verisi gerektiğinde

#### Ne zaman kullanılmaz
- SEO hedefi yokken
- DataForSEO, Firecrawl ve Banana eklentileri kurulmaz; Google dışı ve gereksizdir

#### Kaynak ve kurulum
`seo-google` alt skill'i.

#### Lisans ve dikkat
MIT. Google API kimlik bilgileri gerekir; kurmadan önce gereksinimler kontrol edilmeli.

---

### 8. context7

Klasör: `context7/` · Kaynak: upstash/context7

#### Ne işe yarar
Kütüphanelerin güncel, sürüme özel dokümanını ve kod örneklerini ajana getiren MCP sunucusu.

#### Neden kullanılır
Eski API bilgisiyle kod yazılmasını önler.

#### Ne zaman kullanılır
- Bir kütüphane kullanılırken veya sürüm geçişi yapılırken
- Güncel API bilgisi gerektiğinde

#### Ne zaman kullanılmaz
- Değişmeyen temel bilgi için (ör. temel JavaScript sözdizimi)

#### Kaynak ve kurulum
MCP sunucusu olarak eklenir. Alternatif olarak `ctx7` CLI ile skill kurulur.

#### Lisans ve dikkat
MIT. Sorguda kütüphane sürümü belirtilmeli.

---

### 9. dotfiles

Klasör: `dotfiles/` · Kaynak: paulirish/dotfiles

#### Ne işe yarar
Kişisel ayar reposu. İçindeki `modern-css` skill'i view transitions, scroll-driven animations, anchor positioning ve `text-wrap: balance` gibi modern CSS özelliklerini öğretir.

#### Neden kullanılır
Modern CSS özelliklerini doğru kullanmayı sağlar.

#### Ne zaman kullanılır
- Modern CSS ile animasyon veya düzen yazılırken
- Yalnızca `modern-css` skill'i gerektiğinde

#### Ne zaman kullanılmaz
- Repo bütün olarak kurulmaz; kişisel ayar dosyalarıdır
- Lisans durumu netleşmeden kullanılmaz

#### Kaynak ve kurulum
Yalnızca `modern-css` skill'i alınır.

#### Lisans ve dikkat
**Lisans belirtilmemiş.** Kullanmadan önce kullanıcıdan onay alınır ve `agents/` klasörü de kontrol edilir.

---

### 10. gsap-skills

Klasör: `gsap-skills/` · Kaynak: greensock/gsap-skills

#### Ne işe yarar
GSAP'ın resmi skill'leri: core API, timeline, ScrollTrigger, plugin'ler (Flip, SplitText, ScrollSmoother, Draggable), React entegrasyonu ve performans kuralları.

#### Neden kullanılır
GSAP'ı doğru ve temiz kullanmayı sağlar. React'te `useGSAP` ve `gsap.context` temizliği hatalardan korur.

#### Ne zaman kullanılır
- GSAP ile scroll animasyonu, timeline ya da plugin kullanılacaksa
- React veya Next.js'te GSAP kullanılıyorsa (`gsap-react` şarttır)

#### Ne zaman kullanılmaz
- CSS ile yapılabilecek basit geçişlerde

#### Kaynak ve kurulum
İhtiyaca göre `gsap-scrolltrigger`, `gsap-timeline`, `gsap-plugins`, `gsap-react`, `gsap-performance` skill'leri.

#### Lisans ve dikkat
MIT. Animasyonlarda yalnızca `transform` ve `opacity` tercih edilir.

---

### 11. playwright-skill

Klasör: `playwright-skill/` · Kaynak: lackeyjb/playwright-skill

#### Ne işe yarar
Doğal dille anlatılan akışlar (giriş, form, gezinme) için Playwright testi yazar, tarayıcıda çalıştırır ve ekran görüntüsüyle sonuç verir.

#### Neden kullanılır
Uçtan uca test yazmayı hızlandırır.

#### Ne zaman kullanılır
- Kullanıcı akışlarını test ederken
- Uygulama tarayıcıda çalıştıktan sonra doğrulama yapılırken

#### Ne zaman kullanılmaz
- Birim testleri için
- Projede Playwright kurulu değilse

#### Kaynak ve kurulum
`playwright-skill/` klasörü.

#### Lisans ve dikkat
MIT. Kurmadan önce repo güncel mi kontrol edilmeli.

---

### 12. rtk

Klasör: `rtk/` · Kaynak: rtk-ai/rtk

#### Ne işe yarar
Kabuk komutlarının çıktısını Claude'a ulaşmadan filtreleyip sıkıştıran Rust CLI aracı. `git diff`, `grep` ve dosya okuma çıktılarını kapsar.

#### Neden kullanılır
Büyük çıktılarda token tasarrufu sağlar. Satıcının %60–90 iddiası kendi ölçümünüzle doğrulanmalı.

#### Ne zaman kullanılır
- Büyük `git diff`, `grep` ve log çıktıları işlenirken

#### Ne zaman kullanılmaz
- Küçük çıktılarda
- Ticari kullanım planlanıyor ve BUSL-1.1 kısmı okunmadıysa

#### Kaynak ve kurulum
Rust CLI. Kurulum adımları reponun README dosyasında.

#### Lisans ve dikkat
Çekirdek Apache-2.0; `engine/` ve `proxy/` BUSL-1.1. Ticari kullanımdan önce bu lisans okunmalı.

---

### 13. skills-MengTo

Klasör: `skills-MengTo/` · Kaynak: MengTo/Skills

#### Ne işe yarar
Yaklaşık 120 skill: landing page, GSAP ve Lenis scroll animasyonları, Three.js, CSS efektleri, SVG illüstrasyon.

#### Neden kullanılır
Tasarım ve animasyon için hazır kalıplar sunar.

#### Ne zaman kullanılır
- Landing page veya scroll animasyonu gibi görsel bir iş yapılırken
- Yalnızca ilgili tek skill seçildiğinde

#### Ne zaman kullanılmaz
- Tüm koleksiyon topluca kurulmaz; her proje için tamamı gereksiz yük getirir

#### Kaynak ve kurulum
İhtiyaç duyulan skill'ler tek tek seçilir.

#### Lisans ve dikkat
MIT. Repo çok dosyalıdır; bağlam için yalnızca gerekeni kullanılır.

---

### 14. skills-AccessLint

Klasör: `skills-AccessLint/` · Kaynak: AccessLint/skills

#### Ne işe yarar
WCAG 2.2 erişilebilirlik denetimi: canlı sayfa taraması, ihlallerin öncesi/sonrası karşılaştırması, kod tabanı taraması ve otomatik düzeltme.

#### Neden kullanılır
Erişilebilirlik hatalarını yayından önce yakalar.

#### Ne zaman kullanılır
- Arayüz tamamlandığında
- "Erişilebilir yap" istendiğinde

#### Ne zaman kullanılmaz
- Yalnızca veri veya backend işlerinde

#### Kaynak ve kurulum
`accessibility-scan`, `accessibility-audit`, `accessibility-inspect`, `accessibility-diff`, `accessibility-fix` skill'leri. `accessibility-fix` dosyaları değiştirir.

#### Lisans ve dikkat
MIT. Fix modunu çalıştırmadan önce git durumu temiz olmalı.

---

### 15. skills-trailofbits

Klasör: `skills-trailofbits/` · Kaynak: trailofbits/skills

#### Ne işe yarar
Güvenlik odaklı skill'ler: GitHub Actions güvenlik taraması, kod bağlamı oluşturma, fuzzer ve statik analiz.

#### Neden kullanılır
Güvenlik açıklarını derinlemesine bulmaya yardım eder.

#### Ne zaman kullanılır
- Güvenlik denetimi yapılırken
- CI/CD iş akışları incelenirken

#### Ne zaman kullanılmaz
- Günlük geliştirmede
- Çoğu skill smart contract odaklıdır; web projesine uymayanlar kurulmaz

#### Kaynak ve kurulum
İhtiyaç duyulan skill seçilir (ör. `agentic-actions-auditor`, `audit-context-building`).

#### Lisans ve dikkat
CC BY-SA 4.0. Paylaşımda atıf ve aynı lisans gerekir.

---

### 16. superpowers

Klasör: `superpowers/` · Kaynak: obra/superpowers

#### Ne işe yarar
Disiplinli geliştirme metodolojisi: brainstorming, test odaklı geliştirme, kök neden araştırmalı hata ayıklama ve tamamlamadan önce doğrulama.

#### Neden kullanılır
Ajanın önce plan, sonra test, sonra kanıtla bitirmesini sağlar.

#### Ne zaman kullanılır
- Yeni bir özellik tasarlanırken
- Karmaşık bir hata ayıklanırken
- "Bitti" demeden önce doğrulama gerektiğinde

#### Ne zaman kullanılmaz
- Tek satırlık düzeltmelerde
- Kısa soru-cevap işlerinde

#### Kaynak ve kurulum
Tümü ya da tek skill (ör. `systematic-debugging`).

#### Lisans ve dikkat
MIT.

---

### 17. ui-ux-pro-max-skill

Klasör: `ui-ux-pro-max-skill/` · Kaynak: nextlevelbuilder/ui-ux-pro-max-skill

#### Ne işe yarar
UI/UX stilleri, renk paletleri, font eşleşmeleri ve 99 UX kuralı kataloğu. `/ui-ux-pro-max <istek>` komutuyla çağrılır.

#### Neden kullanılır
Yeni bir arayüzde tutarlı tasarım kararları vermeyi kolaylaştırır.

#### Ne zaman kullanılır
- Yeni bir arayüz veya landing page başlarken
- Stil sıfırdan seçilecekse

#### Ne zaman kullanılmaz
- Projenin kendi tasarım sistemi varsa; katalog onunla çelişir

#### Kaynak ve kurulum
`/ui-ux-pro-max <istek>`

#### Lisans ve dikkat
MIT.
