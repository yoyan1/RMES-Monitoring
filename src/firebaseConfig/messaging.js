import {ref} from 'vue'
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { firebaseApp } from './config';
// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const messaging = getMessaging();
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // ...
});

let token = ref("")

getToken(messaging, { vapidKey: 'BN4V7zwRuWm1i3dcEcR4ecPA0MuzdpjJbcCyS9NukAJgBipbWP01lQkYsCeQXVlI2pCZQHo5deq66AfeCbCJtF4' }).then((currentToken) => {
  if (currentToken) {
    // Send the token to your server and update the UI if necessary
    token.value = currentToken
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});

export {token}