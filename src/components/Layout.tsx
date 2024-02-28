type LayoutProps = React.PropsWithChildren<{
  title: React.ReactNode
}>

export default function Layout({ title, children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-r from-amber-300 to-orange-500">
      <div className="container mx-auto py-6 space-y-6">
        <h1 className="text-3xl font-medium">{title}</h1>
        {children}
      </div>
    </div>
  )
}