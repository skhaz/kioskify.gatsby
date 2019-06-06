import React, { useEffect, useState } from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider } from "@material-ui/styles"
import { createMuiTheme } from "@material-ui/core/styles"
import { deepPurple, deepOrange } from "@material-ui/core/colors"
import { getFirebase, FirebaseContext } from "../providers/firebase"
import { App, Header } from "../components"

export default () => {
  const [firebase, setFirebase] = useState()

  useEffect(() => {
    const lazyApp = import("firebase/app")
    const lazyFirestore = import("firebase/firestore")
    const lazyAuth = import("firebase/auth")

    Promise.all([lazyApp, lazyFirestore, lazyAuth]).then(([firebase]) => {
      setFirebase(getFirebase(firebase))
    })
  }, [])

  const theme = createMuiTheme({
    palette: {
      primary: deepPurple,
      secondary: deepOrange,
    },
    typography: {
      useNextVariants: true,
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      {firebase && (
        <FirebaseContext.Provider value={firebase}>
          <App />
        </FirebaseContext.Provider>
      )}
    </ThemeProvider>
  )
}
