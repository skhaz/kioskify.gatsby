import { createContext, useContext } from "react"

const firebaseSettings = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.GATSBY_FIREBASE_APP_ID,
}

let firebaseInstance

const initFirebase = firebase => {
  if (firebaseInstance) {
    return firebaseInstance
  }

  firebase.initializeApp(firebaseSettings)
  firebaseInstance = firebase
  return firebase
}

const FirebaseContext = createContext(null)

const useFirebase = () => {
  return useContext(FirebaseContext)
}

export { FirebaseContext, initFirebase, useFirebase }
