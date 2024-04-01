import { BsDiamondFill } from 'react-icons/bs'
import { IoEllipse } from 'react-icons/io5'

export default function HomePage() {
  return (
    <main>
      <header className="container mx-auto my-14">
        <h1 className="mb-5 text-center text-3xl font-medium text-blue-500 sm:text-4xl md:text-6xl">
          Easy scheduling ahead
        </h1>
        <p className="px-5 text-center text-neutral-700 sm:text-lg md:px-16 md:text-xl">
          Vinci Sphere is your scheduling automation platform for eliminating
          the back-and-forth emails to find the perfect time — and so much more.
        </p>
      </header>
      <section className="mb-5 flex flex-col space-y-3">
        <h2 className="inline-flex items-center text-xl font-medium text-blue-500">
          <BsDiamondFill className="mr-1.5" />
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </h2>
        <p>
          Quos corrupti officia, et sapiente reiciendis vitae ullam dolor
          nostrum incidunt alias reprehenderit consequuntur tenetur expedita,
          doloremque veniam dolorum minus impedit. Qui?
        </p>
      </section>
      <section className="mb-5 flex flex-col space-y-3">
        <h2 className="inline-flex items-center text-xl font-medium text-blue-500">
          <IoEllipse className="mr-1.5" />
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem vitae
          voluptatibus laborum harum quaerat deleniti, sit, nisi delectus non,
          ipsum inventore sed recusandae. Officiis nulla rerum sapiente ad quos
          tempora!
        </p>
      </section>
    </main>
  )
}
