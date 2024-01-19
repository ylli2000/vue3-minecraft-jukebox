import firebase from 'firebase/app' //for firebase version @8
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// Your web app's Firebase configuration
//https://console.firebase.google.com/u/0/project/music-app-e50df/overview
const firebaseConfig = {
  apiKey: 'AIzaSyDpIKeyLkO0ubFNMNxfvFWKi2aUu3chUX8',
  authDomain: 'music-app-e50df.firebaseapp.com',
  projectId: 'music-app-e50df',
  storageBucket: 'music-app-e50df.appspot.com',
  messagingSenderId: '209167467383',
  appId: '1:209167467383:web:91265efe73454c80ef1772'
}

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig)
export const auth = app.auth()
export const db = app.firestore()
export const storage = app.storage()
export const authProvider = (initVueFn) => auth.onAuthStateChanged(() => initVueFn())
