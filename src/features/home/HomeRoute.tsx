import { Title } from '@solidjs/meta'
import type { JSX, Component } from 'solid-js'
import './home.css'

const HomeRoute: Component = (): JSX.Element => {
  return (
    <>
      <Title>Adam Ziolkowski | Home</Title>
      <div class="home">
        <div class="about-me">
          <span>
            <p>
              Hi, I am{' '}
              <b>
                Adam{' '}
                <a href="https://www.howtopronounce.com/ziolkowski">
                  Ziolkowski
                </a>
              </b>
              .
            </p>
            <p>
              I climb web mountains on weekdays. On Saturdays, I follow the
              Dao—mostly the <em>not trying</em> part. Any other time, I rest on
              my laurels and fritter hours away polishing my RPG character
              sheet.
            </p>
            <p>
              A ranged barbarian…{' '}
              <a href="https://en.wikipedia.org/wiki/Alignment_(Dungeons_%26_Dragons)#Chaotic_good">
                chaotic good
              </a>
              , on a quest to make better websites*.
            </p>
            <p>* I make and consult on web apps from Monday to Friday.</p>
          </span>
        </div>

        <blockquote>
          <p class="quote">
            Nobody climbs mountains for scientific reasons. Science is used to
            raise money for the expeditions, but{' '}
            <strong>you really climb for the hell of it.</strong>
          </p>
          <p class="author">Edmund Hillary</p>
        </blockquote>
      </div>
    </>
  )
}

export default HomeRoute
