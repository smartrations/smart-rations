# Smart Rations

Projenin arka ucu için NodeJS üzerinde BCrypt, Dotenv, Express, JOI, JWT, Mongoose, PSO kütüphaneleri kullanılmıştır. Ön uç için React tabanlı olan NextJS web geliştirme çerçevesi kullanılmıştır.
 
Programlama Dili
Programlama dili olarak Javascript kullanılmıştır.
 
 ##
 
## Kütüphaneler / Teknolojiler

#### NodeJS
Javascript ile sunucu tarafında çalışabilen uygulamaları geliştirmek için kullandığımız bir geliştirme ortamıdır. React gibi kütüphaneler de NodeJS tabanlıdır.
#### React
Kullanıcı arayüzü oluşturmak için kullanılan bir Javascript kütüphanesidir.
#### NextJS 
React tabanlı web geliştirme çerçevesidir. Sunucu tarafında da kod çalıştırabilmemizi sağlar. Hibrit SSG ve SSR, API rotaları, route pre-fetching gibi özelliklere sahiptir.
#### MongoDB 
Açık kaynaklı bir NoSQL veri tabanı uygulamasıdır.
#### BCrypt
Kullanıcıların şifrelerini güvende tutmak için şifreleri, şifreli bir şekilde veri tabanına kaydetmemize yardımcı oluyor.
#### Dotenv 
Veri tabanı giriş bilgilerini, şifrelemeler için gizli anahtarları tutmamıza yardımcı oluyor.
#### Express
Web uygulama sunucu çatısıdır. Uygulamanın arka ucunu oluşturmak için kullanıyoruz.
#### JOI 
Bir şema doğrulayıcısıdır. Kullanıcının girdiği bilgilerin sistemde olması gerektiği şekilde tutulmasını sağlıyor.
#### JWT 
Kullanıcının doğrulanması ve servislerin güvenliği için kullanılmaktadır.
#### Mongoose 
MongoDB sunucusuna bağlantı oluşturmak için kullanılan bir ODM kütüphanesidir.
#### PSO
Parçacık sürü optimizasyonu metodu için oluşturulmuş bir kütüphanedir. Kendi amacımıza uygun olarak bu kütüphaneyi düzenledik.

##

## Kurulum

API kurulumu için sistemde NodeJS’in yüklü olması gerekmektedir. NodeJS kurulumdan sonra projenin bulunduğu konumda komut istemcisini açıp “npm i” komutu çalıştırılmalıdır. Bu komut projede kullanılan kütüphaneleri otomatik olarak yüklememizi sağlamaktadır.
.env dosyasında bulunan DB_CONNECT kısmına veri tabanımıza ait bağlantı dizisini (connection string), ACCESS_TOKEN_SECRET kısmına token oluştururken kullanmak için bir gizli anahtarı, REFRESH_TOKEN_SECRET kısmına token yenileme işlemlerinde kullanmak üzere ACCESS_TOKEN_SECRET’tan farklı bir gizli anahtarı girmemiz gerekmektedir.
Bu adımlar sonrasında “node .” yazarak uygulamanın arka ucunu başlatabilirsiniz.
 
Ön uç için ise aynı şekilde NodeJS’in kurulu olması gerekmektedir. Kurulum sonrasında “npm i” yazarak projede kullanılan kütüphanelerin yüklenmesi gerekmektedir. Geliştirici modunda başlatmak için “npm run dev”, projeyi başlatmak için “npm run build” ve sonrasında “npm run start” yazılması gerekmektedir. Eğer NodeJS üzerinde değil de farklı bir web sunucusu üzerinde çalıştırmak isterseniz “npm run export” ile HTML, CSS, Javascript dosyalarını oluşturup bunları web sunucunuzda kullanabilirsiniz fakat bu durumda NextJS’in sahip olduğu SSR-SSG gibi sunucu tarafında çalışan ek özellikler devre dışı kalacaktır. 
