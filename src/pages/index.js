import React from "react"

import { ThemeProvider } from "@material-ui/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import { createMuiTheme } from "@material-ui/core/styles"
import { deepPurple, deepOrange } from "@material-ui/core/colors"

import { makeStyles } from "@material-ui/styles"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"


const useStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: 500,
  },
})

function App() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography component="h2" variant="h1" gutterBottom>
        h1. Heading
      </Typography>
      <Typography variant="h2" gutterBottom>
        h2. Heading
      </Typography>
      <Typography variant="h3" gutterBottom>
        h3. Heading
      </Typography>
      <Typography variant="h4" gutterBottom>
        h4. Heading
      </Typography>
      <Typography variant="h5" gutterBottom>
        h5. Heading
      </Typography>
      <Typography variant="h6" gutterBottom>
        h6. Heading
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Quos blanditiis tenetur
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Quos blanditiis tenetur
      </Typography>

      <Button variant="contained" color="primary">
        I'm a Button!
      </Button>
    </div>
  )
}

export default () => {
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
      <App />
    </ThemeProvider>
  )
}