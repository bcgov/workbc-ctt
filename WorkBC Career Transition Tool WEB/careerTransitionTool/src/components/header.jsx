import React from 'react'
import PropTypes from 'prop-types'
import S from '../styles/nav.module.scss'
import WorkBCLogo from '../images/workbc-header-logo.svg'
function Header({ setCategory, category = '', query }) {

  return (
    <header className={S.header}>
      <nav className={`navbar ${S.headerBanner}`}>
        <div className={`navbar-brand ${S.navLeft}`}>
          <div className={`navbar-item site-logo`}>
            <a href="https://www.workbc.ca" style={{ color: 'white', textDecoration: 'none' }}>
              <img className={S.logo} src={WorkBCLogo} alt="Work BC" />
            </a>
          </div>
          <div className="navbar-brand__title">
            Career Transition Tool
          </div>
        </div>
       </nav>
     
    </header>
  )
}

Header.propTypes = {
  setCategory: PropTypes.func.isRequired,
  category: PropTypes.string,
  query: PropTypes.string,
}

Header.defaultProps = {
  category: '',
  query: '',
}

export default Header
