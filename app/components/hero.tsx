import {AiOutlineTrophy} from 'react-icons/ai'
import {GiWeightLiftingUp} from 'react-icons/gi'

const callsToAction = [
  {name: 'Leaderboard', href: '#', icon: AiOutlineTrophy},
  {
    name: 'Add Logs',
    href: '#',
    icon: GiWeightLiftingUp,
  },
]

export default function Hero() {
  return (
    <section className="lg:relative">
      <div className="mx-auto w-full max-w-7xl pt-16 pb-20 text-center lg:py-48 lg:text-left">
        <div className="px-4 sm:px-8 lg:w-1/2 xl:pr-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
            <span className="block xl:inline">Get competitive about</span>{' '}
            <span className="block text-yellow-500 xl:inline">
              counting calories
            </span>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
            CalorieLeaderBoard is a platform to gamify counting calories
          </p>
          <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow">
              <a
                href="#"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-yellow-600 px-8 py-5 text-base font-medium text-white hover:bg-yellow-700 "
              >
                See Leaderboard{' '}
                <AiOutlineTrophy className={'ml-3 -mr-1 h-5 w-5'} />
              </a>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <a
                href="#"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-white px-8 py-4 text-base font-medium text-yellow-600 hover:bg-gray-50 md:py-4 md:px-10 md:text-lg"
              >
                Log Calories
                <GiWeightLiftingUp className={'ml-3 -mr-1 h-5 w-5'} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-64 w-full sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="/images/hero.jpg"
          alt="A cup with cereals and fruits"
        />
      </div>
    </section>
  )
}
