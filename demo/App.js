import React, { useRef, useEffect } from 'react'
import {
  Layout,
  Main,
  MenuItem,
  TopBar,
  SkipLink
} from 'cauldron-react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Home from './Home'
import About from './About'
import Contact from './Contact'
import './App.css'

let hasTransitioned = false // avoid focusing on the first render
const App = () => {
  const mainRef = useRef()
  // remove tabindex on blur of main so we don't
  // get excess focus rings when the user clicks
  // anywhere inside of the main content
  const onMainBlur = () => {
    if (!mainRef.current) {
      return
    }
    mainRef.current.removeEventListener('blur', onMainBlur)
    mainRef.current.removeAttribute('tabindex')
  }
  const focusMain = () => {
    // avoid messing with focus on a real page load
    if (!hasTransitioned) {
      hasTransitioned = true
      return
    }

    if (!mainRef.current) {
      return
    }

    mainRef.current.tabIndex = -1
    mainRef.current.focus()
    mainRef.current.addEventListener('blur', onMainBlur)
  }

  useEffect(() => {
    if (!mainRef.current) {
      return
    }

    mainRef.current.addEventListener('blur', onMainBlur)
  }, [mainRef])

  return (
    <Router>
      <>
        <SkipLink target={'#main-content'} />
        <TopBar role="banner">
          <MenuItem>
            <Link to="/" tabIndex={-1}>
              Home
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/about" tabIndex={-1}>
              About
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/contact" tabIndex={-1}>
              Contact
            </Link>
          </MenuItem>
        </TopBar>
        <Layout>
          <Main
            mainRef={mainRef}
            aria-labelledby="main-heading"
            id="main-content"
          >
            <Route
              exact
              path="/"
              render={() => {
                focusMain()
                return <Home />
              }}
            />
            <Route
              exact
              path="/about"
              render={() => {
                focusMain()
                return <About />
              }}
            />
            <Route
              exact
              path="/contact"
              render={() => {
                focusMain()
                return <Contact />
              }}
            />
          </Main>
          <footer>
            <Link to="/contact" className="dqpl-link">
              Request a free quote today!
            </Link>
            <Link to="/about" className="dqpl-link">
              Learn more about us
            </Link>
          </footer>
        </Layout>
      </>
    </Router>
  )
}

export default App
