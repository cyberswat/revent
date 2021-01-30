import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCGQLR6bHm_pqF7VO7e1lbEp3kHOndSz8I',
  authDomain: 'reventscourse-80d46.firebaseapp.com',
  projectId: 'reventscourse-80d46',
  storageBucket: 'reventscourse-80d46.appspot.com',
  messagingSenderId: '377322959826',
  appId: '1:377322959826:web:25acc90b311b19e4168e0b',
}

firebase.initializeApp(firebaseConfig)
firebase.firestore()

export default firebase
