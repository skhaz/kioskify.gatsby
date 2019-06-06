import React, { useState, useEffect } from "react"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
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

  const [index, setIndex] = useState(2)

  const [isSignedIn, setSignedIn] = useState(null)

  const firebase = useFirebase()

  const firebaseAuth = firebase.auth()

  const uiConfig = {
    signInFlow: "popup",

    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],

    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  }

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(user =>
      setSignedIn(!!user)
    )

    return () => {
      unsubscribe()
    }
  }, [])

  const renderUnauthorized = () => (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth} />
  )

  const renderEditor = () => (
    <>
      <AppBar position="static" color="default">
        <Tabs
          variant="fullWidth"
          indicatorColor="primary"
          value={index}
          onChange={(_, newValue) => setIndex(newValue)}
        >
          <LinkTab label="analytics" href="#" />
          <LinkTab label="machines" href="#" />
          <LinkTab label="playlist" href="#" />
        </Tabs>
      </AppBar>
      {index === 1 && (
        <TabContainer>
          <MachineManager />
        </TabContainer>
      )}
      {index === 2 && (
        <TabContainer>
          <PlaylistEditor />
        </TabContainer>
      )}
    </>
  )

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
