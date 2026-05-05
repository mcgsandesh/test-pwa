// १. Firebase SDK च्या लायब्ररीज इम्पोर्ट करा
importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging-compat.js');

// २. तुमचा Firebase Config इथे टाका
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
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
