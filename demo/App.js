import React, { useRef } from 'react'
import {
  Workspace,
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

let hasTransitioned = false // avoid focusing on the first render
const App = () => {
  const mainRef = useRef()
  const focusMain = () => {
    // avoid messing with focus on a real page load
    if (!hasTransitioned) {
      hasTransitioned = true
      return
    }

    if (!mainRef.current) {
      return
    }

    mainRef.current.focus()
  }

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
        <Workspace
          noSideBar
          workspaceRef={mainRef}
          tabIndex={-1}
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
        </Workspace>
      </>
    </Router>
  )
}

export default App
