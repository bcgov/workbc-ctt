import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

function SEO({
  description, lang, meta, title,
}) {
  const metaDescription = description
  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      titleTemplate={title}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: 'Work BC',
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        }].concat(meta)}
    >
      <body class="career-transition-tool" />
      <script defer type="text/javascript" src="google-translate.js" />
      <script defer type="text/javascript" src="analytics.js" />
    </Helmet>
  )
}

SEO.defaultProps = {
  title: 'Work BC Career Transition Tool',
  lang: 'en',
  meta: [],
  description: 'Auto-completed indexed searchable and viewable, the Work BC Career Transition Tool is yours for the perusing.',
}

SEO.propTypes = {
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  description: PropTypes.string,
}

export default SEO
