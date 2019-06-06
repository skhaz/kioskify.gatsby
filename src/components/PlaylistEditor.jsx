import React from "react"
import { useCollection } from "react-firebase-hooks/firestore"
import { useFirebase } from "../providers/firebase"

export default () => {
  const firebase = useFirebase()

  const firestore = firebase.firestore()

  const query = firestore.collection("machines")

  const [snapshot, loading, error] = useCollection(query)

  return (
    <>
      {loading === false &&
        snapshot.docs.map((doc, index) => (
          <h1 key={`key-${index}`}>{doc.data().fingerprint}</h1>
        ))}
    </>
  )
}
