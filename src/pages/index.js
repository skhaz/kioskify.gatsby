import React from "react"
import { Helmet } from "react-helmet"
import App from "~/components/App"

export default () => (
  <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Kioskify</title>
      <link rel="canonical" href="https://kioskify.app/" />
    </Helmet>
    <App />
  </>
)
