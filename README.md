# Uygulamaya Hosgeldiniz !

Merhaba! Bu private repository Kartaca mülakati icin hazirlanan case study'yi sizlere sunuyorum. Web sayfasi React ve Redux teknolojileri kullanilarak yazildi. kodu tarafiniza cekebilir ve `npm install` ile modulleri indirebilir ve `npm start` komutu ile calistirabilirsiniz.

## Docker Image'ina Ulasma ve Calistirma Rehberi

Uygulama dockerize edildi ve ulasiminiza acik olmasi adina Docker Hub'da public bir repoda tutuluyor. Tarafinizda calistirmaniz icin izlenmesi gereken adimlar su sekilde:

1. Docker indirilmeli, `docker version` komutu ile versiyonunuzu kontrol edebilirsiniz.
2. Docker Hub'da hesap acilmali ve `docker login` komutu ile giris yapilmali.
3. `docker pull nkurubas/kartaca-nk:latest` komutu ile image'i tarafiniza cekmelisiniz.
4. `docker run -dp 8000:3000 --name kartacapp nkurubas/kartaca-nk` komutu ile image'i calistirip http://localhost:8000 den uygulamaya erisilir.
5. `docker exec -it kartacapp /bin/sh` komutu ile container terminaline baglanabilirsiniz.
6. Container'i durdurmak icin `docker stop kartacapp` ve baslatmak icin `docker start kartacapp` komutlari, silmek icin ise durdurduktan sonra `docker rm kartacapp` komutu kullanilir.


## Uygulama Özellikleri

- Uygulama ana sayfasinda yer alan harita kullanici tarafindan yakinlastirilabilir ve uzaklastirilabilir.
- Redux kullanmis olmak amaciyla ana sayfada haritanin altinda tiklanan ulkelerin bir listesi kullanici ile paylasiliyor.
- Tiklanan ulkenin detaylari yeni sekmede, ulkeye ozel bir url ile aciliyor. Bu sayfaya ulkeye tiklamadan, yalnzica url ile de erisim saglanabilir.
- Ülkedeki vakalara dair detaylar API'dan cekilip kullanici ile paylasilir. Ulkenin bolge/sehir/eyalet verisi varsa kullanici bu bolgeleri menuden secebilir, ve o bolgenin vaka sayilari da formatli bir sekilde goruntulenebilir.
- Uygulama dili belirtilmedigi icin kullandigim klavyede Turkce harfler bulunmamasi sebebiyle Ingilizce olarak tasarlandi.
- Ulke detayi sayfasinda internet baglanti sorunu veya sorgulanan ulkeye dair bilgi olmamasi durumunda kullanici hataya dair bilgilendiriliyor.

## Yapilacaklar

- Kullandigimiz API'da bazi ulkelerin verileri bulunmuyor (Orn. Greenland) ve "recovered" yani iyilesen vaka sayilari butun ulkelerde 0 olarak gozukuyor. Zaman kisitlamasi dolayisiyla yeni bir API arastirmadim fakat gelecekte uygulama gelistirilmek istenirse farkli bir API'a gecilebilir.
- Testleri Jest'in calismasinda sorun ciktigi icin calistiramadim ve düzeltmeye vaktim olmadi. Zaman olursa daha cok test eklenebilir ve var olanlar test edilebilir.
