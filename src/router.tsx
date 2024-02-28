import { createBrowserRouter } from "react-router-dom";
import Home from "~/pages/Home";
import samples from "./samples";

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'samples',
        children: samples.map(sample => ({
          path: sample.id,
          element: sample.element
        }))
      }
    ]
  },
])

export default router