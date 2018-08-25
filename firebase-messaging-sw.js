importScripts("https://www.gstatic.com/firebasejs/4.12.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/4.12.0/firebase-messaging.js");

/* Now initialize firebase app in the servie worker.
 *
 */
firebase.initializeApp({
    apiKey: 'AIzaSyAS_NLgtV381v_hu43FgSlguEGAwki4sDI',
    authDomain: 'zerg-chatme-d8bba.firebaseapp.com',
    databaseURL: 'https://zerg-chatme-d8bba.firebaseio.com',
    projectId: 'zerg-chatme-d8bba',
    storageBucket: 'zerg-chatme-d8bba.appspot.com',
    messagingSenderId: '447867740573'
}); //These are example configuration value

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  const notificationTitle = ﻿payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: payload.data.icon
  };
  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});