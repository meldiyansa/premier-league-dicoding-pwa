importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/serviceWorker.js', revision: '1' },
    { url: '/pages/favorit.html', revision: '1' },
    { url: '/pages/home.html', revision: '1' },
    { url: '/pages/pertandingan.html', revision: '1' },
    { url: '/pages/teamliga.html', revision: '1' },
    { url: '/pages/team.html', revision: '1' },
    { url: '/pages/about.html', revision: '1' },
    { url: '/css/background.png', revision: '1' },
    { url: '/css/materialize.css', revision: '1' },
    { url: '/css/style.css', revision: '1' },
    { url: '/asset/icon/android-icon-36x36.png', revision: '1' },
    { url: '/asset/icon/android-icon-48x48.png', revision: '1' },
    { url: '/asset/icon/android-icon-72x72.png', revision: '1' },
    { url: '/asset/icon/android-icon-96x96.png', revision: '1' },
    { url: '/asset/icon/android-icon-144x144.png', revision: '1' },
    { url: '/asset/icon/android-icon-192x192.png', revision: '1' },
    { url: '/asset/icon/apple-icon-57x57.png', revision: '1' },
    { url: '/asset/icon/apple-icon-60x60.png', revision: '1' },
    { url: '/asset/icon/apple-icon-72x72.png', revision: '1' },
    { url: '/asset/icon/apple-icon-76x76.png', revision: '1' },
    { url: '/asset/icon/apple-icon-114x114.png', revision: '1' },
    { url: '/asset/icon/apple-icon-120x120.png', revision: '1' },
    { url: '/asset/icon/apple-icon-144x144.png', revision: '1' },
    { url: '/asset/icon/apple-icon-152x152.png', revision: '1' },
    { url: '/asset/icon/apple-icon-180x180.png', revision: '1' },
    { url: '/asset/icon/apple-icon-precomposed.png', revision: '1' },
    { url: '/asset/icon/apple-icon.png', revision: '1' },
    { url: '/asset/icon/favicon-16x16.png', revision: '1' },
    { url: '/asset/icon/favicon-32x32.png', revision: '1' },
    { url: '/asset/icon/favicon-96x96.png', revision: '1' },
    { url: '/asset/icon/ms-icon-70x70.png', revision: '1' },
    { url: '/asset/icon/ms-icon-144x144.png', revision: '1' },
    { url: '/asset/icon/ms-icon-150x150.png', revision: '1' },
    { url: '/asset/icon/ms-icon-310x310.png', revision: '1' },
    { url: '/asset/icon/vokasiicon.png', revision: '1' },
    { url: '/asset/icon/vokasitext.png', revision: '1' },
    { url: '/asset/icon/arrow.png', revision: '1' },
    { url: '/asset/img/foto.jpg', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/database.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/sw-register.js', revision: '1' },
    { url: '/js/materialize.js', revision: '1' },
    { url: '/js/function.js', revision: '1' },
]);


workbox.routing.registerRoute(
    new RegExp('/pages/'),
      workbox.strategies.staleWhileRevalidate({
          cacheName: 'pages'
      })
);

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
        }),
      ],
    }),
  );




self.addEventListener('push', event => {
    console.log(event);
    let body;
    if (event.data) {
        body = event.data.text()
    }else{
        body = "push message no payload"
    }

    let opt ={
        body,
        icon : './asset/icon/vokasiicon.png',
        vibrate : [100,50,100],
        data : {
            dateOfArrival : Date.now(),
            primaryKey : 1
        }
    }

    event.waitUntil(
        self.registration.showNotification('Push notification',opt)
    )
})