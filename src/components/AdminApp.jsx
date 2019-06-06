import React, { useState, useEffect } from "react"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import { useCollection } from "react-firebase-hooks/firestore"
import { useFirebase } from "../providers/firebase"

export default () => {
  const TabContainer = props => (
    <Typography component="div" style={{ padding: 8, height: 2 }}>
      {props.children}
    </Typography>
  )

  const LinkTab = props => (
    <Tab component="a" onClick={event => event.preventDefault()} {...props} />
  )

  const [isSignedIn, setSignedIn] = useState(null)

  const firebase = useFirebase()

  const firestore = firebase.firestore()

  const auth = firebase.auth()

  const query = firestore.collection("machines")

  const [value, loading, error] = useCollection(query)

  const renderUnauthorized = () => (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
  )

  const uiConfig = {
    signInFlow: "popup",

    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],

    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  }

  const renderEditor = () => <></>

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Kioskify
          </Typography>
        </Toolbar>
      </AppBar>
      {isSignedIn && renderEditor()}
      {isSignedIn !== null && !isSignedIn && renderUnauthorized()}
    </>
  )
}
