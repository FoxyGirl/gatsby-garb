import React from "react"
import { graphql, StaticQuery, Link } from "gatsby"
import Layout from "../../components/layout"

const getImageData = graphql`
  {
    allFile {
      edges {
        node {
          relativePath
          size
          extension
          birthTime(formatString: "YYYY-MM-DD  HH:MM")
        }
      }
    }
  }
`

export default () => (
  <Layout>
    <h1>Page 3!</h1>
    <StaticQuery
      query={getImageData}
      render={({ allFile: { edges } }) => (
        <table>
          <tr>
            <th>Relative Path</th>
            <th>Size</th>
            <th>Extension</th>
            <th>Birth time</th>
          </tr>
          <tbody>
            {edges.map(
              (
                { node: { relativePath, size, extension, birthTime } },
                index
              ) => (
                <tr key={index}>
                  <td>{relativePath}</td>
                  <td>{size}</td>
                  <td>{extension}</td>
                  <td>{birthTime}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    />
    <div>
      <Link to="/page-2">Go to page 2</Link>
    </div>
  </Layout>
)
