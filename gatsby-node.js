const path = require('path')

const { createFilePath } = require('gatsby-source-filesystem')

const PostTemplate = path.resolve('./src/templates/post-template.js')
const BlogTemplate = path.resolve('./src/templates/blog-template.js')

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'posts' })
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  const posts = result.data.allMarkdownRemark.edges
  posts.forEach(({ node: post }) => {
    createPage({
      path: `posts${post.fields.slug}`,
      component: PostTemplate,
      context: {
        slug: post.fields.slug,
      },
    })
  })

  const postsPerPage = 2
  const totalPages = Math.ceil(posts.length / postsPerPage)

  Array.from({ length: totalPages }).forEach((_, index) => {
    const currentPage = index + 1
    const isFirstPage = currentPage === 1
    const isLastPage = currentPage === totalPages
    createPage({
      path: isFirstPage ? '/blog' : `/blog/${currentPage}`,
      component: BlogTemplate,
      context: {
        limit: postsPerPage,
        skip: index * postsPerPage,
        isFirstPage,
        isLastPage,
        currentPage,
        totalPages,
      },
    })
  })
}
