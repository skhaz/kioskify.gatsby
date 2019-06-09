import React, { useEffect, useState } from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider } from "@material-ui/styles"
import { createMuiTheme } from "@material-ui/core/styles"
import { deepPurple, deepOrange } from "@material-ui/core/colors"
import { initFirebase, FirebaseContext } from "~/providers/firebase"
import Admin from "~/components/Admin"

export default () => {
  const [firebase, setFirebase] = useState()

  useEffect(() => {
    const lazyApp = import("firebase/app")
    const lazyFirestore = import("firebase/firestore")
    const lazyAuth = import("firebase/auth")

    Promise.all([lazyApp, lazyFirestore, lazyAuth]).then(([firebase]) =>
      setFirebase(initFirebase(firebase))
    )
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
      {firebase && (
        <FirebaseContext.Provider value={firebase}>
          <Admin />
        </FirebaseContext.Provider>
      )}
    </ThemeProvider>
  )
}
