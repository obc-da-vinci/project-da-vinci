import {
  BsArrowRight,
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsYoutube,
} from 'react-icons/bs'
import { GiEmerald } from 'react-icons/gi'

export default function DashboardPage() {
  return (
    <>
      <section className="mt-8 flex flex-col md:mt-20 md:flex-row">
        <h1 className="mb-5 w-full text-3xl font-medium text-blue-500 md:mb-0 md:w-1/2 md:px-10 md:text-4xl lg:px-24 xl:px-32">
          Stay in sync from any app, on any device
        </h1>
        <div className="w-full text-lg text-neutral-700 md:w-1/2 md:px-12">
          <p className="mb-5">
            Boost productivity with integrations that fold right into your
            workflow.
          </p>
          <button className="flex items-center rounded-lg border bg-blue-500 px-4 py-1 text-white shadow transition-all duration-300 hover:bg-blue-600">
            Know more <BsArrowRight className="ml-1.5" />
          </button>
        </div>
      </section>
      <section className="my-10">
        <h2 className="inline-flex items-center text-xl font-medium text-blue-500 md:mt-16">
          <GiEmerald className="mr-1.5 min-w-8" /> Lorem ipsum dolor sit amet
          consectetur adipisicing elit.
        </h2>
        <p className="p-5 text-lg">
          Magnam ullam sint labore, deleniti sapiente accusamus! Exercitationem
          veniam facilis, dolores maiores quis ullam voluptatum ut voluptatem
          atque expedita voluptas architecto perferendis!
        </p>
      </section>
      <div className="rounded-2xl border-2 bg-gradient-to-tr from-blue-900 to-blue-950 p-2 pb-20 text-white shadow-xl md:p-0">
        <h2 className="my-5 flex justify-center text-center text-xl font-medium md:p-10 md:text-4xl">
          We make scheduling easy for you like never before
        </h2>
        <div className="flex flex-col md:flex-row">
          <article className="w-full p-5 md:w-1/2 md:p-10">
            <h3 className="text-center text-xl font-semibold md:text-start">
              Share your availability on Vinci Sphere with others
            </h3>
            <button className="mx-auto mt-5 flex items-center rounded-lg border bg-blue-500 px-4 py-1 text-white shadow transition-all duration-300 hover:bg-blue-600 md:mx-0">
              Know more <BsArrowRight className="ml-1.5" />
            </button>
          </article>

          <article className="p-5 md:p-10">
            <h4 className="text-center text-lg">
              Grow your business with scheduling automation. Simply submit your
              availability on Vinci Sphere via email or text, or add it to your
              website. And watch candidates and recruits schedule high-value
              meetings with you.
            </h4>
            <button className="mx-auto mt-5 flex items-center rounded-lg border bg-blue-500 px-4 py-1 text-white shadow transition-all duration-300 hover:bg-blue-600">
              Share your availability on Vinci Sphere with others
            </button>
            <div className="mt-8 flex items-center justify-center">
              <BsInstagram className="mx-1.5" size={25} />
              <BsTwitter className="mx-1.5" size={25} />
              <BsFacebook className="mx-1.5" size={25} />
              <BsYoutube className="mx-1.5" size={25} />
            </div>
          </article>
        </div>
      </div>
    </>
  )
}
