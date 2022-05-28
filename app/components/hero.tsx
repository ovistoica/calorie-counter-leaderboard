import {AiOutlineTrophy} from 'react-icons/ai'
import {GiWeightLiftingUp} from 'react-icons/gi'
import {LinksFunction} from '@remix-run/node'
import heroCss from '~/styles/components/hero.css'

export const links: LinksFunction = () => {
  return [{rel: 'stylesheet', href: heroCss}]
}

export default function Hero() {
  return (
    <section className="hero">
      <picture>
        <img src="/images/hero.jpg" alt="A cup with cereals and fruits" />
      </picture>
      <div>
        <h1 className="hero-title">
          <span>Get competitive about</span>
          <span>counting calories</span>
        </h1>
        <p>CalorieLeaderBoard is a platform to gamify counting calories</p>
        <div className="button-container">
          <button className="btn-primary btn-large">
            See Leaderboard <AiOutlineTrophy />
          </button>
          <button className="btn-large">
            Log Calories <GiWeightLiftingUp />
          </button>
        </div>
      </div>
    </section>
  )
}
