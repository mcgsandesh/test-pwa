// १. Firebase SDK च्या लायब्ररीज इम्पोर्ट करा
importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging-compat.js');

// २. तुमचा Firebase Config इथे टाका
const firebaseConfig = {
    apiKey: "AIzaSyBfDsCvNBb6SVhz0Z8P5p3s5jIGVZQYTPc",
    authDomain: "kv-digital-society.firebaseapp.com",
    projectId: "kv-digital-society",
    storageBucket: "kv-digital-society.firebasestorage.app",
    messagingSenderId: "524643551701",
    appId: "1:524643551701:web:4f32cc6dc24b9bb48c155c",
    measurementId: "G-QPNLYDJ7FZ"
};

// ३. Firebase आणि Messaging इनिशियलाइज करा
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// ४. बॅकग्राउंड नोटिफिकेशन मॅनेज करण्यासाठी (ॲप बंद असताना हे काम करेल)
messaging.onBackgroundMessage((payload) => {
  console.log('[sw.js] Background Message received: ', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'https://static.wixstatic.com/media/6e8dcf_874c769fafb94e66869070444347a01f~mv2.png',
    badge: 'https://static.wixstatic.com/media/6e8dcf_874c769fafb94e66869070444347a01f~mv2.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});


// ५. नोटिफिकेशनवर क्लिक केल्यावर ॲप उघडण्यासाठी
self.addEventListener('notificationclick', function(event) {
  console.log('Notification click received.');

  // १. नोटिफिकेशन बंद करा
  event.notification.close();

  // २. तुमची GitHub PWA ची लिंक (मूळ URL)
  const appUrl = 'https://mcgsandesh.github.io/test-pwa/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(windowClients) {
      // जर ॲप आधीच उघडं असेल, तर नवीन विंडो उघडण्याऐवजी त्यावरच जा (Focus)
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        if (client.url === appUrl && 'focus' in client) {
          return client.focus();
        }
      }
      // जर ॲप उघडं नसेल, तर नवीन विंडोमध्ये उघडा
      if (clients.openWindow) {
        return clients.openWindow(appUrl);
      }
    })
  );
});

// ५. तुमचे आधीचे बेसिक इव्हेंट लिसनर्स तसेच राहू द्या
self.addEventListener('install', (event) => {
    self.skipWaiting();
    console.log('SW: Installed');
});

self.addEventListener('activate', (event) => {
    console.log('SW: Activated');
});

self.addEventListener('fetch', (event) => {
    // Fetch logic रिकामे ठेवले तरी चालेल
});
