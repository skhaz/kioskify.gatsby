module.exports = {
  siteMetadata: {
    title: "Kioskify"
  },
  plugins: [
    {
      resolve: `gatsby-plugin-web-font-loader`,
      options: {
        google: {
          families: ["Roboto:300,400,500", "Material+Icons"],
        },
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-material-ui`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "images",
        path: `${__dirname}/src/images/`,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: "tomato",
      },
    },
    {
      resolve: `gatsby-plugin-root-import`,
      options: {
        "~": `${__dirname}/src`,
        pages: `${__dirname}/src/pages`,
      },
    },
  ],
}
