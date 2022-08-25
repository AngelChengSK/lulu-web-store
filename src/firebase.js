import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAHA8A2qBvaJpKfrS1EWfBFz9F540xdnd8',
  authDomain: 'lulueshop-77fe6.firebaseapp.com',
  projectId: 'lulueshop-77fe6',
  storageBucket: 'lulueshop-77fe6.appspot.com',
  messagingSenderId: '670701851699',
  appId: '1:670701851699:web:558654936b8029be2cbf46'
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
