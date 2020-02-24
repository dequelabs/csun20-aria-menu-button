import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'cauldron-react'
import MenuButton from '../'
import './Home.css'

const Home = () => {
  const [actionLog, setActionLog] = useState([])
  // NOTE: disabling below rule because it is vital that
  // the scrollable action log region has tabIndex={0} so
  // keyboard users are able to scroll the log with arrow
  // keys
  /* eslint-disable jsx-a11y/no-noninteractive-tabindex */
  return (
    <div className="Wrap">
      <h1 id="main-heading">Home</h1>
      <hr />
      <p>
        A Mango Beer behind the freight train ruminates, or
        the blood clot pours freezing cold booze on a bull
        ice. Sometimes a psychotic Corona Extra panics, but
        a colt 45 near a Bacardi Silver always steals women
        from a Bacardi Silver inside the Amarillo Pale Ale!
        The polar bear beer for the line dancer plays
        pinochle with the Imperial Stout around a Guiness.
        Most people believe that a Left Hand Milk Stout
        usually graduates from a twisted Hops Alligator Ale,
        but they need to remember how accidentally a
        hypnotic spudgun gets stinking drunk. Most people
        believe that a bud dry conquers another discusting
        keg, but they need to remember how barely a black
        velvet beams with joy.
      </p>
      <MenuButton
        buttonContent="Actions"
        items={[
          { children: <span>action 1</span> },
          { children: <span>action 2</span> },
          { children: <span>action 3</span> }
        ]}
        onSelection={el =>
          setActionLog([...actionLog, el.innerText])
        }
      />
      <h2 id="action-log-heading">Action log</h2>
      <div
        role="log"
        tabIndex={0}
        aria-labelledby="action-log-heading"
      >
        <ul>
          {actionLog.map((item, i) => (
            <li key={`${item}${i}`}>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <Button
          variant="secondary"
          onClick={() => setActionLog([])}
          className="Clear"
        >
          Clear log
        </Button>
      </div>
      <div className="Links">
        <Link to="/contact" className="dqpl-link">
          Request a free quote today!
        </Link>
        <Link to="/about" className="dqpl-link">
          Learn more about us
        </Link>
      </div>
    </div>
  )
  /* eslint-enable jsx-a11y/no-noninteractive-tabindex */
}

export default Home
