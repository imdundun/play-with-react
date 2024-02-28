import Sample1 from "./pages/Sample1"

interface SampleConfig {
  id: string
  element: React.ReactElement
  name: string
  description: string
}

const samples: SampleConfig[] = [
  {
    id: '1',
    element: <Sample1 />,
    name: 'Sample 1',
    description: 'Select + Table'
  }
]

export default samples