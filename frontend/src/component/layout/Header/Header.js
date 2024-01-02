import React from 'react';
import './Header.css';
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className='header'>
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
  <Link className="navbar-brand" to="#">ECommerce</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link className="nav-link Home" to="/">Home <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to="/products">Product</Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to="#">Contact</Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to="#">About</Link>
      </li>
    </ul>
    <ul className='navbar-nav'>
      <li className="nav-item active">
        <Link className="nav-link" to="/search">
            <img className='search' src='https://cdn-icons-png.flaticon.com/512/151/151773.png'></img>
        </Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to="/cart">
            <img className='search' src='https://cdn-icons-png.flaticon.com/512/3144/3144456.png'></img>
        </Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to="/login">
            <img className='search' src='https://cdn-icons-png.flaticon.com/512/64/64572.png'></img>
        </Link>
      </li>
    </ul>
  </div>
</nav>
</div>
  )
}

export default Header

