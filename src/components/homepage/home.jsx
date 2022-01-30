import React from 'react';
import { Link } from 'react-router-dom';
import '../homepage/home.css';
import displayImg from '../homepage/ecommerce.jpg';

const Home = () => {
  return (
    <div className="home-body">
      <div className="home-items">
        <p>Every cloth you need at a single place, at your doorstep</p>
        <button className="explore-btn">
          <Link to="/products" className="explore-link">
            Explore Now <i className="fas fa-arrow-right"></i>
          </Link>
        </button>
      </div>
      <div className="home-items">
        <img src={displayImg} alt="" className="display-img" />
      </div>
    </div>
  );
};

export default Home;
