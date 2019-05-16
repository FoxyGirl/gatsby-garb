import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

const PostTempalte = ({ data: { markdownRemark: post } }) => (
  <Layout>
    <div>
      <h1>{post.frontmatter.title}</h1>
      <h4>
        {post.timeToRead} {post.timeToRead > 1 ? 'minutes' : 'minute'}
      </h4>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  </Layout>
)

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      frontmatter {
        title
        date
      }
    }
  }
`

export default PostTempalte
