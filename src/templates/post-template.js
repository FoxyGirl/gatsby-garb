import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

const PostTempalte = ({ data: { markdownRemark: post } }) => (
  <Layout>
    <div>
      <h1>{post.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  </Layout>
)

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
      }
    }
  }
`

export default PostTempalte
