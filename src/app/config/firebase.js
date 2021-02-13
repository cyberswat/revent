import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: 'reventscourse-80d46.firebaseapp.com',
  projectId: 'reventscourse-80d46',
  storageBucket: 'reventscourse-80d46.appspot.com',
  messagingSenderId: '377322959826',
  appId: '1:377322959826:web:25acc90b311b19e4168e0b',
  databaseURL: 'https://reventscourse-80d46-default-rtdb.firebaseio.com',
}

firebase.initializeApp(firebaseConfig)
firebase.firestore()

export default firebase
