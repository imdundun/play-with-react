import Sample1 from "./pages/Sample1"
import Sample2 from "./pages/Sample2"

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
  },
  {
    id: '2',
    element: <Sample2 />,
    name: 'Sample 2',
    description: 'Image decorator + Scrollspy'
  }
]

export default samples