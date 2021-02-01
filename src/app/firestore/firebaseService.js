import firebase from '../config/firebase'

export function signInWithEmail(creds) {
  console.log(creds)
  return firebase.auth().signInWithEmailAndPassword(creds.email, creds.password)
}
