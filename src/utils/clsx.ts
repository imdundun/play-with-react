type ClassName = string | undefined

export default function clsx(...classNames: ClassName[]) {
  return classNames.filter(Boolean).join(' ')
}