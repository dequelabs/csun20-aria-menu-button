import React, {
  useState,
  useRef,
  useCallback,
  useEffect
} from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Offscreen,
  TextField
} from 'cauldron-react'
import MenuButton from '../'
import './Contact.css'

const Contact = ({ h1Ref }) => {
  const draftsList = useRef()
  const didMount = useRef(false)
  const [subject, setSubject] = useState({})
  const [message, setMessage] = useState({})
  const subjectRef = useCallback(node => setSubject(node))
  const messageRef = useCallback(node => setMessage(node))
  const [subjectValue, setSubjectValue] = useState('')
  const [subjectError, setSubjectError] = useState(null)
  const [messageValue, setMessageValue] = useState('')
  const [messageError, setMessageError] = useState(null)
  const [drafts, setDrafts] = useState([])
  const saveDraft = () => {
    if (!subject.value) {
      alert('Add subject before saving draft!')
      return
    }

    setDrafts([
      ...drafts,
      {
        subject: subject.value,
        message: message.value
      }
    ])

    draftsList.current.focus()
  }
  const validate = e => {
    e.preventDefault()
    const newSubjectError = subject.value
      ? null
      : 'Subject is required'
    const newMessageError = message.value
      ? null
      : 'Message is required'

    setSubjectError(newSubjectError)
    setMessageError(newMessageError)

    if (newSubjectError) {
      subject.focus()
    } else if (newMessageError) {
      console.log('focusing!?!?', newMessageError)
      message.focus()
    } else {
      alert('message received!')
    }
  }
  const onSubjectChange = value => setSubjectValue(value)
  const onMessageChange = value => setMessageValue(value)
  const discardDraft = index => {
    const currentDrafts = [...drafts]
    currentDrafts.splice(index, 1)
    setDrafts(currentDrafts)
  }

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
      return
    }
    draftsList.current.focus()
  }, [drafts])

  return (
    <div className="Wrap">
      <div className="hero">
        <span
          aria-hidden="true"
          className="fas fa-mobile-alt"
        />
        <h1 ref={h1Ref} id="main-heading">
          Contact
        </h1>
      </div>
      <form
        noValidate
        className="Content Contact"
        onSubmit={validate}
      >
        <Card>
          <CardHeader>
            <h2>Send us a message</h2>
            <MenuButton
              className="ContactActions"
              buttonContent={
                <>
                  <span className="fas fa-ellipsis-v" />
                  <Offscreen>Message options</Offscreen>
                </>
              }
              items={[
                {
                  children: <span>Save draft</span>
                },
                {
                  children: <span>Clear form</span>
                }
              ]}
              onSelection={el => {
                if (el.innerText === 'Save draft') {
                  return saveDraft()
                }

                setMessageValue('')
                setSubjectValue('')
                setTimeout(() => subject.focus(), 100)
              }}
            />
          </CardHeader>
          <CardContent>
            <TextField
              required
              id="subject"
              label="Subject"
              error={subjectError}
              fieldRef={subjectRef}
              value={subjectValue}
              onChange={onSubjectChange}
            />
            <TextField
              required
              multiline
              id="message"
              label="Message"
              error={messageError}
              fieldRef={messageRef}
              value={messageValue}
              onChange={onMessageChange}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit">Send</Button>
          </CardFooter>
        </Card>
      </form>
      <section
        className="Drafts"
        tabIndex={-1}
        ref={draftsList}
      >
        <h2 id="saved-drafts">Saved Drafts</h2>
        {!drafts.length ? (
          <p>
            <em>No drafts saved</em>
          </p>
        ) : (
          <ul aria-labelledby="saved-drafts" tabIndex={-1}>
            {drafts.map((draft, i) => (
              <li key={`draft-${i}-${drafts.length}`}>
                <h3>Draft {i + 1}</h3>
                <dl>
                  <div>
                    <dt>Subject: </dt>
                    <dd>{draft.subject}</dd>
                  </div>
                  <div>
                    <dt>Message: </dt>
                    <dd>{draft.message}</dd>
                  </div>
                </dl>
                <div className="DraftControls">
                  <button
                    onClick={() => {
                      setMessageValue(draft.message)
                      setSubjectValue(draft.subject)
                      subject.focus()
                    }}
                  >
                    Use <strong>Draft {i + 1}</strong>
                  </button>
                  <button
                    onClick={() => {
                      discardDraft(i)
                    }}
                  >
                    Discard <strong>Draft {i + 1}</strong>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

Contact.propTypes = {
  h1Ref: PropTypes.shape({ current: PropTypes.any })
}
export default Contact
