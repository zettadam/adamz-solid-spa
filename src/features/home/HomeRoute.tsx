import { Meta, Title } from '@solidjs/meta'

import AboutMe from './AboutMe'
import Quotation from './Quotation'
import './home.css'

const HomeRoute = () => {
  return (
    <>
      <Title>Home—Adam Ziolkowski</Title>
      <Meta
        name="description"
        content="You have arrived at the place Adam Ziolkowski calls home. Welcome friend and enter."
      />
      <div class="home">
        <Quotation />
        <AboutMe />
      </div>
    </>
  )
}

export default HomeRoute
