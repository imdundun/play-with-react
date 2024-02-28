type LayoutProps = React.PropsWithChildren<{
  title: React.ReactNode
}>

export default function Layout({ title, children }: LayoutProps) {
  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  )
}