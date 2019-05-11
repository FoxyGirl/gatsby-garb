import React from 'react'
import { graphql, StaticQuery, Link } from 'gatsby'
import Layout from '../components/layout'

const getBlogData = graphql`
  {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          id
          frontmatter {
            title
            date
          }
          excerpt
        }
      }
    }
  }
`

export default () => (
  <Layout>
    <div>
      <h1>My blogs</h1>
      <StaticQuery
        query={getBlogData}
        render={({ allMarkdownRemark: { totalCount, edges } }) => (
          <>
            <h4
              style={{
                display: 'block',
                marginTop: '5px',
                paddingLeft: '30px',
                color: '#bbb',
                fontWeight: 'normal',
              }}
            >
              {' '}
              Amount of posts: {totalCount}
            </h4>
            {edges.map(
              ({
                node: {
                  id,
                  frontmatter: { title, date },
                  fields: { slug },
                  excerpt,
                },
              }) => (
                <div key={id} style={{ marginBottom: '50px' }}>
                  <h3 style={{ color: 'darkblue' }}>
                    <Link to={`/posts/${slug}`}>{title} </Link>
                    <span
                      style={{
                        display: 'block',
                        marginTop: '10px',
                        color: '#bbb',
                        fontWeight: 'normal',
                        fontSize: '0.9em',
                      }}
                    >
                      published {date}
                    </span>
                  </h3>
                  <p>{excerpt}</p>
                  <Link to={`/posts/${slug}`}>Read more</Link>
                </div>
              )
            )}
          </>
        )}
      />
    </div>
  </Layout>
)
