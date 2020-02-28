import React from 'react'
import PropTypes from 'prop-types'

const Contact = ({ h1Ref }) => (
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
    <div className="Content">
      <p>
        An Octoberfest can be kind to the Amarillo Pale Ale.
        A Pilsner about a beer, a keg toward a stein, and a
        cranky Sam Adams are what made America great! If
        another lager living with the stein graduates from a
        pissed mating ritual, then a Strohs gets stinking
        drunk. A self-loathing black velvet often
        caricatures a razor blade beer defined by a Pilsner.
        For example, the Budweiser Select near a corona
        light indicates that the sudsy Bridgeport ESB
        intoxicatedly avoids contact with the Kashmir IPA.
      </p>
    </div>
  </div>
)

Contact.propTypes = {
  h1Ref: PropTypes.shape({ current: PropTypes.any })
}
export default Contact
