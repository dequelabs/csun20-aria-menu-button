import React, { useState } from 'react'
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardFooter
} from 'cauldron-react'
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
      <div className="hero">
        <span aria-hidden="true" className="fas fa-home" />
        <h1 id="main-heading">Home</h1>
      </div>
      <div className="Content">
        <Card>
          <CardHeader>
            <h2>Beer ipsum</h2>
          </CardHeader>
          <CardContent>
            <p>
              A Mango Beer behind the freight train
              ruminates, or the blood clot pours freezing
              cold booze on a bull ice. Sometimes a
              psychotic Corona Extra panics, but a colt 45
              near a Bacardi Silver always steals women from
              a Bacardi Silver inside the Amarillo Pale Ale!
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
          </CardContent>
          <CardFooter>
            <Button
              variant="secondary"
              onClick={() => setActionLog([])}
              className="Clear"
            >
              Clear log
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
  /* eslint-enable jsx-a11y/no-noninteractive-tabindex */
}

export default Home
