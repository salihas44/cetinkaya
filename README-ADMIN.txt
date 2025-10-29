# Yönetilebilir Site Kurulumu (Netlify + GitHub + Decap CMS)

1) Bu klasörü GitHub repo olarak yükleyin (branch: main).
2) Netlify'de bu repo'yu deploy edin.
3) Netlify Identity'yi açın, Git Gateway'i enable edin. (Signups: Invite Only)
4) /admin/config.yml dosyası hazır. /admin adresinden giriş yapın.
5) index.html içindeki window.APP_CONFIG.baseDataUrl değerini kendi raw GitHub yolunuza çevirin:
   Ör: https://raw.githubusercontent.com/<USER>/<REPO>/main/moto-cetinkaya/content
6) Panelden site ayarları ve ürünleri düzenleyin. Kaydeder kaydetmez sitede görünür (deploy beklemez).

Notlar:
- Ürün görselleri için mevcut assets/img/... yollarını kullanabilir veya /assets/uploads altına yeni dosya yükleyebilirsiniz.
- Güvenlik için Netlify Identity davet usulü olsun, /admin arama motorlarına kapatılabilir.
