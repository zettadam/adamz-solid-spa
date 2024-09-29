import type { Component, JSX } from 'solid-js'

import LatestPosts from '../posts/LatestPosts'

const AboutMe: Component = (): JSX.Element => {
  return (
    <div class="about-me">
      <span>
        <p>
          Hi, my name is{' '}
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
          , on a quest to make better websites*.
        </p>

        <LatestPosts />

        <p>* I make and consult on web apps from Monday to Friday.</p>
      </span>
    </div>
  )
}

export default AboutMe
