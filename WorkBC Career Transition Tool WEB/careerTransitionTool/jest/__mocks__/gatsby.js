const React = require('react');

const gatsby = jest.requireActual('gatsby');

module.exports = {
  ...gatsby,
  graphql: jest.fn(),
  Link: jest.fn().mockImplementation(({ to, ...rest }) => React.createElement('a', {
    ...rest,
    href: to,
  })),
  StaticQuery: jest.fn(),
  useStaticQuery: jest.fn().mockImplementation(() => ({
    site: {
      siteMetadata: {
        author: 'Jinil Sung',
        description: 'Work BC Career Transition Tool',
        title: 'Work BC Career Transition Tool',
      },
    },
    placeholderImage: {
      childImageSharp: {
        fluid: {
          base64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAACtElEQVQ4y5VUW08TURDml/lm4qOJL2o0POEDiRoNRhMTMIZQxQCGi0ZLMVJsDWAKjaU3oS2B3oHeuNjS2gK1LZBuS7l0291+7p52oaVLhUnO7szZ7HdmvvnmNOEKViqVyOItu3eEVDSD4wMaUV8KxQJD9psa/VwNIsQsU37HArsYaZuFRbGKzO4R9raz4oDVP5dK7KlPYpbln8Tf3crCPh3Ep4d69NybhknuPwOsy6ZqjzemyNTEgfkYum+r0H1nCiuGCIKuv/CbYw0ABdBcHHvhOKyqIEKuBOhUmEPPQ/NxBZ03J/DimhzqfldNdU3nOTv7mkNM1gLtwAL00hUoJR443j4DQoMIr9KY7rMRDiOeJIo0g/xxoT7Dk0MaC+McyRQXJBxYe3cXZmUQ69YtmJQh6N/IsakehUO7A0WHGeNdi/BbYoRPAaMGkD9pSbeJiHcf8MkQn+yA6Zsfv754oRtehVuphVXGNYA7xKLwcysAw7AHiXBapGS2DEolD/H5sRFL8ilIW75idngBsjYTVL1OGPvVoJZ1WDLGuYNDRIv0SbGeQ6ERbAXUrQ1B+twFZ+d96F53I2DLYH7Mie/NzZA+msHoSwuo1KGo1ES7zBtNAwXLE8y86sNkjx/jEhuCvdfhlqtA7bMVkbPndCvSZZIpUx6jg7AP6yYfhlqNMIx4kbQbuN18DUXVgHWTcn68wt40pE/nyJhNSBah6HRVZVYPduHoCVyq3zsw0KIh/s7GPgYf/EQufSyaWUNAwTRDbixzoyVkxQv8tz1ejtkrAmZSR0S0/CTwlohQaL+hRPIPdcrh5QAr5aYTOXTd+gHjiKcsJc0mEXGjci/mkCnLYqzdgg+tOuL75qLwzkZrsrt0yUJTNmw7mJRYUcgXyb5wK1+U3X8B1xa3YZR5uPuQFb3JxewfiyzStbxt9OkAAAAASUVORK5CYII=',
          aspectRatio: 1,
          src: '/static/4bac4749576fb0702e9d314dde711ff8/630fb/gatsby-astronaut.png',
          srcSet: `/static/4bac4749576fb0702e9d314dde711ff8/5db04/gatsby-astronaut.png 75w,
            /static/4bac4749576fb0702e9d314dde711ff8/6d161/gatsby-astronaut.png 150w,
            /static/4bac4749576fb0702e9d314dde711ff8/630fb/gatsby-astronaut.png 300w,
            /static/4bac4749576fb0702e9d314dde711ff8/62b1f/gatsby-astronaut.png 450w,
            /static/4bac4749576fb0702e9d314dde711ff8/2a4de/gatsby-astronaut.png 600w,
            /static/4bac4749576fb0702e9d314dde711ff8/ee604/gatsby-astronaut.png 800w`,
          sizes: '(max-width: 300px) 100vw, 300px',
        },
      },
    },
  })),
};
