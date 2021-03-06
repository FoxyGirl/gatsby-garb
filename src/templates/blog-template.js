import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'

export default ({
  data: {
    allMarkdownRemark: { totalCount, edges },
  },
  pageContext,
}) => {
  const { currentPage, isFirstPage, isLastPage, totalPages } = pageContext
  console.log('currentPage', currentPage)
  console.log('isFirstPage', isFirstPage)

  const nextPage = `/blog/${String(currentPage + 1)}`
  const prevPage =
    currentPage - 1 === 1 ? '/blog' : `/blog/${String(currentPage - 1)}`

  return (
    <Layout>
      <div>
        <h1>My blogs</h1>
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
        {/* Pagintaion Links*/}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            maxWidth: 400,
            margin: '0 auto 50px',
          }}
        >
          {!isFirstPage && (
            <Link to={prevPage} rel="prev">
              Prev Page
            </Link>
          )}
          {Array.from({ length: totalPages }, (_, index) => (
            <Link key={index} to={`/blog/${index === 0 ? '' : index + 1}`}>
              {index + 1}
            </Link>
          ))}
          {!isLastPage && (
            <Link to={nextPage} rel="next">
              Next Page
            </Link>
          )}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      skip: $skip
      limit: $limit
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          id
          frontmatter {
            title
            date(fromNow: true, formatString: "dddd, MMM DD YYYY")
          }
          excerpt
        }
      }
    }
  }
`
