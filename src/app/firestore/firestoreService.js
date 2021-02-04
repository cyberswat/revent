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
  const user = firebase.auth().currentUser
  return db.collection('events').add({
    ...event,
    hostUid: user.uid,
    hostedBy: user.displayName,
    hostPhotoURL: user.photoURL || null,
    attendees: firebase.firestore.FieldValue.arrayUnion({
      id: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL || null,
    }),
    attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
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

export function getUserPhotos(userUid) {
  return db.collection('users').doc(userUid).collection('photos')
}

export async function setMainPhoto(photo) {
  const user = firebase.auth().currentUser
  const today = new Date()
  const eventDocQuery = db
    .collection('events')
    .where('attendeeIds', 'array-contains', user.uid)
    .where('date', '>=', today)
  const userFollowingRef = db
    .collection('following')
    .doc(user.uid)
    .collection('userFollowing')

  const batch = db.batch()

  batch.update(db.collection('users').doc(user.uid), {
    photoURL: photo.url,
  })

  try {
    const eventsQuerySnap = await eventDocQuery.get()
    for (let i = 0; i < eventsQuerySnap.docs.length; i++) {
      let eventDoc = eventsQuerySnap.docs[i]
      if (eventDoc.data().hostUid === user.uid) {
        batch.update(eventsQuerySnap.docs[i].ref, {
          hostPhotoURL: photo.url,
        })
      }
      batch.update(eventsQuerySnap.docs[i].ref, {
        attendees: eventDoc.data().attendees.filter((attendee) => {
          if (attendee.id === user.uid) {
            attendee.photoURL = photo.url
          }
          return attendee
        }),
      })
    }
    const userFollowingSnap = await userFollowingRef.get()
    userFollowingSnap.docs.forEach((docRef) => {
      let followingDocRef = db
        .collection('following')
        .doc(docRef.id)
        .collection('userFollowers')
        .doc(user.uid)
      batch.update(followingDocRef, {
        photoURL: photo.url,
      })
    })

    await batch.commit()

    return await user.updateProfile({
      photoURL: photo.url,
    })
  } catch (error) {
    throw error
  }
}
export function deletePhotoFromCollection(photoId) {
  const userUid = firebase.auth().currentUser.uid
  return db
    .collection('users')
    .doc(userUid)
    .collection('photos')
    .doc(photoId)
    .delete()
}

export function addUserAttendance(event) {
  const user = firebase.auth().currentUser
  return db
    .collection('events')
    .doc(event.id)
    .update({
      attendees: firebase.firestore.FieldValue.arrayUnion({
        id: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL || null,
      }),
      attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
    })
}

export async function cancelUserAttendance(event) {
  const user = firebase.auth().currentUser
  try {
    const eventDoc = await db.collection('events').doc(event.id).get()
    return db
      .collection('events')
      .doc(event.id)
      .update({
        attendeeIds: firebase.firestore.FieldValue.arrayRemove(user.uid),
        attendees: eventDoc
          .data()
          .attendees.filter((attendee) => attendee.id !== user.uid),
      })
  } catch (error) {
    throw error
  }
}
