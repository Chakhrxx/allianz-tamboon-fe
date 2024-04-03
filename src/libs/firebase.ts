import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyASWNg0zDDbFhDjybz8UlN8kjKjWaMbg3U',
  authDomain: 'allianz-olympic-24.firebaseapp.com',
  projectId: 'allianz-olympic-24',
  storageBucket: 'allianz-olympic-24.appspot.com',
  messagingSenderId: '477980535394',
  appId: '1:477980535394:web:6de88777c8f11c9839bf3b',
  measurementId: 'G-CWJLGRS76C'
}

export const firebaseApp = initializeApp(firebaseConfig)
export const db = getFirestore(firebaseApp)
