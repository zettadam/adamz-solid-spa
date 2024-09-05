import type { Component, JSX } from 'solid-js'
import { Title } from '@solidjs/meta'

import AboutMe from './AboutMe'
import Quotation from './Quotation'

import './home.css'

const HomeRoute: Component = (): JSX.Element => {
  return (
    <>
      <Title>Home — Adam Ziolkowski</Title>
      <div class="home">
        <AboutMe />
        <Quotation />
      </div>
    </>
  )
}

export default HomeRoute
