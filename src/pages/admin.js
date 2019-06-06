import React, { useEffect, useContext, useState } from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider } from "@material-ui/styles"
import { createMuiTheme } from "@material-ui/core/styles"
import { deepPurple, deepOrange } from "@material-ui/core/colors"
import { makeStyles } from "@material-ui/styles"

import { useCollection } from "react-firebase-hooks/firestore"

import {
  getFirebase,
  useFirebase,
  FirebaseContext,
} from "../providers/firebase"

const useStyles = makeStyles({
  button: {},
})

function App() {
  const classes = useStyles()

  const firebase = useFirebase()

  const [value, loading, error] = useCollection(
    firebase.firestore().collection("machines")
  )

  return (
    <>
      {value &&
        value.docs.map((doc, i) => (
          <h5 key={`d-${i}`}>{doc.data().manufacture}</h5>
        ))}
    </>
  )
}

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
        <FirebaseContext.Provider value={firebase}>
          <App />
        </FirebaseContext.Provider>
    </ThemeProvider>
  )
}

/*


const App = withFirebase((f) => <h2>{JSON.stringify(f)}</h2>)

export default () => {

  useEffect(() => {
    const lazyApp = import("firebase/app")
    const lazyFirestore = import("firebase/firestore")
    const lazyAuth = import("firebase/auth")

    Promise.all([lazyApp, lazyFirestore, lazyAuth]).then(([firebase]) => {
      const firestore = getFirebase(firebase).firestore()
      console.log(firestore)
      setFirebase(firestore)
    })
  }, [])

  const FirebaseContext = React.createContext(null)

  return (
      
    
  )
}
*/
