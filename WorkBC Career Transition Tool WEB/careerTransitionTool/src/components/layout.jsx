import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import QueryContext from '../contexts/QueryContext'

import Header from './header'
import Footer from './footer'
import '../styles/layout.scss'
import '../styles/index.scss'

const Layout = ({ children }) => {
  const initialCategory = typeof window !== 'undefined' ? localStorage.getItem('category') : ''
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState((!initialCategory || initialCategory === 'home') ? '' : initialCategory)
  const [appContext, setAppContext] = useState({
    query: '',
    category: (!initialCategory || initialCategory === 'home') ? '' : initialCategory,
    setQuery,
    setCategory,
  })

  useEffect(() => {
    setAppContext({
      query,
      category,
      setQuery,
      setCategory,
    })
  }, [query, category])

  useEffect(() => {
    if (category) setQuery('')
  }, [category])

  useEffect(() => {
    if (query) setCategory('')
  }, [query])

  return (
    <>
      <Header
        siteTitle="Work BC Career Transition Tool"
        setQuery={setQuery}
        setCategory={setCategory}
        query={query}
        category={category}
      />
      <QueryContext.Provider value={appContext}>
        <section className="main">{children}</section>
      </QueryContext.Provider>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
