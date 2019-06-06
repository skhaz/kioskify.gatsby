import React from "react"
import { makeStyles } from "@material-ui/styles"
import { useCollection } from "react-firebase-hooks/firestore"
import { useFirebase } from "../providers/firebase"

const useStyles = makeStyles({})

export default () => {
  const classes = useStyles()

  const firebase = useFirebase()

  const firestore = firebase.firestore()

  const query = firestore.collection("machines")

  const [value, loading, error] = useCollection(query)

  return <h1>app</h1>
}
