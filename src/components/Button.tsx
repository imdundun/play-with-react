import clsx from "~/utils/clsx";

const defaultClassName = "relative cursor-default rounded-lg bg-white py-2 px-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"

export default function Button({ className, ...props }: React.ComponentProps<'button'>) {
  return <button {...props} className={clsx(defaultClassName, className)} />
}