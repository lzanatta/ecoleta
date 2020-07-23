import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './styles.css';

import logo from '../../assets/logo.svg'

const Home = () => {
  return (
    <div id="page-home">
      <div className="content">
        <header>
          <img src={logo} alt="Ecoleta"/>
        </header>
        
        <main>
          <h1>Your marketplace for waste collection.</h1>
          <p>We help people find waste collection centers in an efficient manner.</p>
          <Link to="/create-point">
            <span>
              <FiLogIn />
            </span>
            <strong>Register a waste collection point</strong>
          </Link>
        </main>
      </div>
    </div>
  );
}

export default Home;
