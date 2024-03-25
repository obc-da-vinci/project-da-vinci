export default function PageTitle({ title }: { title: string }) {
  return (
    <h1 className="mx-auto my-2 text-center font-light sm:max-w-[70%] sm:text-lg md:my-5 md:text-xl">
      {title}
    </h1>
  )
}
