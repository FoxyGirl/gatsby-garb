import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import gatsbyLogo from '../images/gatsby-icon.png'

const isActive = ({ isCurrent }) => {
  return { className: isCurrent ? 'active' : 'navlink' }
}

const NavLink = props => (
  <Link getProps={isActive} {...props} style={{ marginRight: 40 }} />
)

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1
        style={{
          margin: 0,
          display: 'flex',
          flexDirection: 'flex-start',
          alignItems: 'center',
        }}
      >
        <img
          src={gatsbyLogo}
          alt="Gatsby Garb Logo"
          style={{
            width: '50px',
            marginBottom: 0,
            marginRight: '20px',
            border: '2px solid orange',
            borderRadius: '50%',
          }}
        />
        <NavLink to="/">{siteTitle}</NavLink>
      </h1>
      <nav>
        <NavLink to="/blog">Blog</NavLink>
        <NavLink to="/products">Store</NavLink>
      </nav>
      {/* Shopping cart Summary */}
      <div
        className="snipcart-summary  snipcart-checkout"
        style={{ color: '#fff', cursor: 'pointer' }}
      >
        <div>
          <strong>My Cart</strong>
        </div>
        <div>
          <span
            style={{ fontweight: 'bold' }}
            className="snipcart-total-items"
          />{' '}
          Items in cart
        </div>
        <div className="">
          Total price{' '}
          <span
            style={{ fontweight: 'bold' }}
            className="snipcart-total-price"
          />
        </div>
      </div>
      <div className="snipcart-summary">
        <a href="#" className="snipcart-user-email snipcart-user-profile">
          Customer dashboard
        </a>
      </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
