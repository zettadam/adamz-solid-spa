import type { Component, JSX } from 'solid-js'

const Quotation: Component = (): JSX.Element => {
  return (
    <figure>
      <blockquote>
        <p>
          Somewhere between the bottom of the climb and the summit is the answer
          to the mystery why we climb.
        </p>
      </blockquote>
      <figcaption>
        <p>Greg Child</p>
      </figcaption>
    </figure>
  )
}

export default Quotation
