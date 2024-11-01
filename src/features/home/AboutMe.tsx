import type { Component, JSX } from 'solid-js'

import LatestPosts from '../posts/LatestPosts'
import Elsewhere from '~/components/Elsewhere'

const AboutMe: Component = (): JSX.Element => {
  return (
    <div class="about-me">
      <span>
        <p>
          Hi, I am{' '}
          <b>
            Adam{' '}
            <a href="https://www.howtopronounce.com/ziolkowski">Ziolkowski</a>
          </b>
          .
        </p>
        <p>
          I climb web mountains on weekdays. On Saturdays, I follow the
          Dao—mainly that part about <em>not trying</em>. Any other time, I rest
          on my laurels and fritter hours away polishing my RPG character sheet.
        </p>
        <p>
          A ranged barbarian…{' '}
          <a href="https://en.wikipedia.org/wiki/Alignment_(Dungeons_%26_Dragons)#Chaotic_good">
            chaotic good
          </a>
          , on a quest to make better web sites and apps.
        </p>

        <LatestPosts />
        <Elsewhere />
        <p>
          <small>
            Written entirely by hand with{' '}
            <a href="https://www.solidjs.com/" target="_blank">
              SolidJS
            </a>
            ,{' '}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/HTML"
              target="_blank">
              HTML
            </a>
            ,{' '}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/CSS"
              target="_blank">
              CSS
            </a>{' '}
            and{' '}
            <a href="https://pocketbase.io/" target="blank">
              PocketBase
            </a>
          </small>
        </p>
      </span>
    </div>
  )
}

export default AboutMe
