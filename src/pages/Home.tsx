import { Link } from "react-router-dom";
import Layout from "~/components/Layout";
import samples from "~/samples";

export default function Home() {
  return (
    <Layout title='Samples'>
      <ul>
        {samples.map(({ id, name, description }) => (
          <li key={id}>
            <Link to={`/samples/${id}`}>
              {name} ({description})
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}