import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'

const ProductTemplate = ({ data: { contentfulProduct }, location }) => (
  <Layout>
    <div style={{ textAlign: 'center' }}>
      {/* Product Info */}
      {console.log({ contentfulProduct })}
      <h2>
        {contentfulProduct.name}
        <span
          style={{
            display: 'block',
            marginTop: 10,
            fontSize: '1.2rem',
            fontWeight: 300,
            color: '#a4a2a2',
          }}
        >{`Added at ${contentfulProduct.createdAt}`}</span>
      </h2>
      <h4>${contentfulProduct.price}</h4>
      <p>{contentfulProduct.description}</p>
      <div style={{ marginBottom: 50 }}>
        <button
          style={{
            backgroundColor: 'darkorange',
            color: '#fff',
            padding: '0.3em 1em',
            borderRadius: '5px',
            cursor: 'pointer',
            fontFamily: 'sans-serif',
          }}
          className="snipcart-add-item"
          data-item-id={contentfulProduct.slug}
          data-item-price={contentfulProduct.price}
          data-item-image={contentfulProduct.image.file.url}
          data-item-name={contentfulProduct.name}
          data-item-url={location.pathname}
        >
          Add to Cart
        </button>
      </div>
      <Img
        fluid={contentfulProduct.image.fluid}
        style={{ margin: '0 auto', maxWidth: 400 }}
      />
      <p style={{ color: '#aaa', fontSize: '14px' }}>{`Updated at ${
        contentfulProduct.updatedAt
      }`}</p>
    </div>
  </Layout>
)

export const query = graphql`
  query($slug: String!) {
    contentfulProduct(slug: { eq: $slug }) {
      slug
      name
      price
      description
      createdAt(formatString: "MMMM Do, YYYY, h:mm:ss a")
      updatedAt(formatString: "MMMM Do, YYYY, h:mm:ss a")
      image {
        fluid(maxWidth: 800) {
          ...GatsbyContentfulFluid
        }
        file {
          url
        }
      }
    }
  }
`

export default ProductTemplate
