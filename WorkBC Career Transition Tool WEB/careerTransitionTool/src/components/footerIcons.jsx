import React from 'react'
import PropTypes from 'prop-types'

function FooterIcons({ S }) {
  return (
    <div className={`${S.socialLinksParent}`}>
      {/* Twitter */}
      <a href="https://twitter.com/WorkBC">
        <svg viewBox="0 0 36 36" focusable="false" className={S.footerIcon}>
          <path fill="#26A7DF" d="M36 18c0 9.94-8.06 18-18 18S0 27.94 0 18 8.06 0 18 0s18 8.06 18 18" />
          <path fill="#FFF" d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm297.1 84L257.3 234.6 379.4 396H283.8L209 298.1 123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5L313.6 116h47.5zM323.3 367.6L153.4 142.9H125.1L296.9 367.6h26.3z" />
        </svg>
      </a>
      {/* Facebook */}
      <a href="https://www.facebook.com/WorkBC">
        <svg viewBox="0 0 36 36" focusable="false" className={S.footerIcon}>
          <path fill="#4D67A4" d="M36 18c0 9.94-8.06 18-18 18S0 27.94 0 18 8.06 0 18 0s18 8.06 18 18" />
                  <path fill="#FFF" d="M27.8,25.6l0.9-5.6h-5.3v-3.9c0-1.6,0.6-2.8,3-2.8h2.6V8.2c-1.4-0.2-3-0.4-4.4-0.4c-4.6,0-7.8,2.8-7.8,7.8V20h-5v5.6h5v14.1c1.1,0.2,2.2,0.3,3.3,0.3c1.1,0,2.2-0.1,3.3-0.3V25.6H27.8z" />
        </svg>
      </a>
      {/* Youtube */}
      <a href="https://www.youtube.com/user/WorkBC">
        <svg viewBox="0 0 36 36" focusable="false" className={S.footerIcon}>
          <path fill="#CC181E" d="M36 18c0 9.94-8.06 18-18 18S0 27.94 0 18 8.06 0 18 0s18 8.06 18 18" />
          <path fill="#FFF" d="M26.177 14.578c-.263-.99-.582-1.6-.96-1.95s-1.164-.436-7.217-.436c-6.052 0-6.837.087-7.215.437-.38.348-.7.96-.96 1.948-.263.99-.292 3.492-.292 3.492 0 3.29.58 4.918 1.338 5.47.758.554 7.13.407 7.13.407s6.373.146 7.13-.407c.756-.553 1.337-2.182 1.337-5.47 0 0-.03-2.503-.29-3.492m-9.893 6.605v-6.227l4.77 3.113-4.77 3.113z" />
        </svg>
      </a>
      {/* LinkedIn */}
      <a href="https://www.linkedin.com/company/official-workbc">
        <svg viewBox="0 0 36 36" focusable="false" className={S.footerIcon}>
          <path fill="#0178B5" d="M36 18c0 9.94-8.06 18-18 18S0 27.94 0 18 8.06 0 18 0s18 8.06 18 18" />
          <path fill="#FFF" d="M14.862 13.437c0 .8-.65 1.45-1.45 1.45s-1.45-.65-1.45-1.45c0-.802.65-1.45 1.45-1.45s1.45.648 1.45 1.45" />
          <path clipPath="url(#SVGID_2_)" fill="#FFF" d="M12.148 15.98h2.506v8.034h-2.506z" />
                  <path fill="#FFF" d="M8,72 L64,72 C68.418278,72 72,68.418278 72,64 L72,8 C72,3.581722 68.418278,-8.11624501e-16 64,0 L8,0 C3.581722,8.11624501e-16 -5.41083001e-16,3.581722 0,8 L0,64 C5.41083001e-16,68.418278 3.581722,72 8,72 Z" />
        </svg>
      </a>
    </div>
  );
}

FooterIcons.propTypes = {
  S: PropTypes.shape({
    socialLinksParent: PropTypes.string.isRequired,
    footerIcon: PropTypes.string.isRequired,
  }).isRequired,
}

export default FooterIcons
