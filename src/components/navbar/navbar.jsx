import React from 'react';
import { NavLink } from 'react-router-dom';
import '../navbar/navbar.css';
import { Link } from 'react-router-dom';

const Navbar = ({ itemsInCart, user }) => {
  return (
    <nav>
      <Link to="/" className="brand">
        <h1>
          Super Store
          <i className="fas fa-store"></i>
        </h1>
      </Link>
      <ul id="nav-links">
        <li>
          <NavLink to="/" className="links" exact>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" className="links" activeClassName="active">
            Products
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cart"
            className="links"
            activeClassName="active"
            id="cart"
          >
            Cart <i className="fas fa-shopping-cart"></i>
            <span id="nav-cart-total">{itemsInCart.length}</span>
          </NavLink>
        </li>
        {!user && (
          <>
            <li>
              <NavLink to="/login" className="links" activeClassName="active">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" className="links" id="register">
                Register
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink to="/profile" className="links" activeClassName="active">
                {user.name}
              </NavLink>
            </li>
            <li>
              <NavLink to="/logout" className="links" id="register">
                Log Out
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
