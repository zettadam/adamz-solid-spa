import type { Component, JSX } from 'solid-js'

const Quotation: Component = (): JSX.Element => {
  return (
    <figure>
      <blockquote>
        <p>
          Nobody climbs mountains for scientific reasons. Science is used to
          raise money for the expeditions, but{' '}
          <strong>you really climb for the hell of it.</strong>
        </p>
      </blockquote>
      <figcaption>
        <p>Edmund Hillary</p>
      </figcaption>
    </figure>
  )
}

export default Quotation
