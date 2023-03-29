module.exports = {
  siteMetadata: {
    title: 'Work BC Career Transition Tool',
    description: 'Auto-completed indexed searchable and viewable, the Work BC Career Transition Tool is yours for the perusing.',
    author: 'jinil.sung@cgi.com',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-plugin-sass',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'WorkBCCareerTransitionTool',
        short_name: 'WorkBCCTT',
        start_url: './',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: './src/images/workbc-icon.png', // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-typescript`,
    `gatsby-plugin-antd`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
  // proxy: {
  //   prefix: "/api",
  //   url: "http://localhost:5000",
  // },
  pathPrefix: '/careertransitiontool',
};
