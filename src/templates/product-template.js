import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'

const ProductTemplate = ({ data: { contentfulProduct } }) => (
  <Layout>
    <div>
      {/* Product Info */}
      <h2>
        {contentfulProduct.name} -
        <span style={{ color: '#ccc' }}>{`Added at ${
          contentfulProduct.createdAt
        }`}</span>
      </h2>
      <p>{contentfulProduct.description}</p>
      <Img fluid={contentfulProduct.image.fluid} />
      <p style={{ color: '#ccc', fontSize: '12px' }}>{`Updated at ${
        contentfulProduct.updatedAt
      }`}</p>
    </div>
  </Layout>
)

export const query = graphql`
  query($slug: String!) {
    contentfulProduct(slug: { eq: $slug }) {
      name
      price
      description
      createdAt(formatString: "MMMM Do, YYYY, h:mm:ss")
      updatedAt(formatString: "MMMM Do, YYYY, h:mm:ss a")
      image {
        fluid(maxWidth: 800) {
          ...GatsbyContentfulFluid
        }
      }
    }
  }
`

export default ProductTemplate
