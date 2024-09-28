
```markdown
# Discord CAPTCHA Botu

Bu proje node.js diliyle yazılmış, Discord sunucularında kullanıcıların doğrulamasını sağlamak için bir CAPTCHA botudur. Bot, yeni bir üye katıldığında bir CAPTCHA sorusu oluşturur ve bu CAPTCHA nın çözülmesi gerekmektedir.
Captcha toplama işlemleriden ibarettir.

## Özellikler

- Yeni üyeler için otomatik CAPTCHA oluşturma.
- Doğrulanmamış kullanıcılar için rol atama.
- Ayarlanabilir CAPTCHA kanalı, doğrulama rolü ve log kanalı.
- Log kanalında olayların kaydı.

## Gereksinimler

- Node.js (v16.x veya üstü)
- Discord.js (v14.x veya üstü)
- Canvas (2.x veya üstü)
- random-int (1.x veya üstü)

## Kurulum

1. Klonlamak için:
   ```bash
   git clone https://github.com/l1ve709XXD/x
   cd bot-repo
   ```

2. Gerekli kütüphaneleri, bağımlılıkları yükleyin:
   ```bash
   npm install discord.js canvas random-int
   ```


3. Bot tokeninizi `client.login()` kısmında güncelleyin:
   ```javascript
   client.login('tokeni_buraya_yapıştır');
   ```

4. `config` nesnesindeki kanal ve rol  ayarlarını yapılandırın:
   ```javascript
   const config = {
       captchaChannelId: 'CAPTCHA_KANAL_ID',
       verifiedRoleId: 'VERF_ROL_ID',  verf_rol_id  üye rolü sayılır üye rolünün id sini atayabiirsin
       logChannelId: 'LOG_KANALI_ID'
   };
   ```

## Kullanım

- Bot, sunucuya yeni bir üye katıldığında otomatik olarak çalışır.
- Yönetici kullanıcılar, botu yapılandırmak için şu komutu kullanabilir:
  ```plaintext
  *ayar #captcha-kanalı @doğrulama-rolü #log-kanalı
  ```
- Bu komut ile CAPTCHA kanalı, doğrulama rolü ve log kanalı ayarlanır.

## İletişim

- İletişim e-posta: [businnes@l1ve709.com](mailto:businnes@l1ve709.com)
- Instagram: [l1ve709](https://www.instagram.com/l1ve709)

## Geliştirici

- Geliştirici: l1ve709-Ediz Sönmez
```

