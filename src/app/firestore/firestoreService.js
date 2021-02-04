import cuid from 'cuid'
import firebase from '../config/firebase'

const db = firebase.firestore()

export function dataFromSnapshot(snapshot) {
  if (!snapshot.exists) return undefined

  const data = snapshot.data()

  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (data[prop] instanceof firebase.firestore.Timestamp) {
        data[prop] = data[prop].toDate()
      }
    }
  }

  return {
    ...data,
    id: snapshot.id,
  }
}

export function listenToEventsFromFirestore() {
  return db.collection('events').orderBy('date')
}

export function listenToEventFromFirestore(eventId) {
  return db.collection('events').doc(eventId)
}

export function addEventToFirestore(event) {
  return db.collection('events').add({
    ...event,
    hostedBy: 'Diana',
    hostPhotoURL: 'https://randomuser.me/api/portraits/women/11.jpg',
    attendees: firebase.firestore.FieldValue.arrayUnion({
      id: cuid(),
      displayName: 'Diana',
      PhotoURL: 'https://randomuser.me/api/portraits/women/11.jpg',
    }),
  })
}

export function updateEventInFirestore(event) {
  return db.collection('events').doc(event.id).update(event)
}

export function deleteEventInFireStore(eventId) {
  return db.collection('events').doc(eventId).delete()
}

export function cancelEventToggle(event) {
  return db.collection('events').doc(event.id).update({
    isCancelled: !event.isCancelled,
  })
}

export function setUserProfileData(user) {
  return db.collection('users').doc(user.uid).set({
    displayName: user.displayName,
    email: user.email,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  })
}

export function getUserProfile(userId) {
  return db.collection('users').doc(userId)
}

export async function updateUserProfile(profile) {
  const user = firebase.auth().currentUser
  try {
    if (user.displayName !== profile.displayName) {
      await user.updateProfile({
        displayName: profile.displayName,
        description: profile.description,
      })
    }
    return await db.collection('users').doc(user.uid).update(profile)
  } catch (error) {
    throw error
  }
}

export async function updateUserProfilePhoto(downloadURL, filename) {
  const user = firebase.auth().currentUser
  const userDocRef = db.collection('users').doc(user.uid)
  try {
    const userDoc = await userDocRef.get()
    if (!userDoc.data().photoURL) {
      await db.collection('users').doc(user.uid).update({
        photoURL: downloadURL,
      })
      await user.updateProfile({
        photoURL: downloadURL,
      })
    }
    return await db.collection('users').doc(user.uid).collection('photos').add({
      name: filename,
      url: downloadURL,
    })
  } catch (error) {
    throw error
  }
}
