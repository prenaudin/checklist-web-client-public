import React from 'react';
import {Link} from 'react-router';

class Home extends React.Component {
  render() {
    return (
      <div className="home page">
        <div className="home-links">
          <div className="home-links-group pull-left">
            <Link to="pricing">Pricing</Link>
            <Link to="showcase">Showcase</Link>
          </div>
          <div className="home-logo">
            <span className="home-logo-char">c</span>
            Checklyst
          </div>
          <div className="home-links-group pull-right">
            <Link to="signup">Sign up</Link>
            <Link to="signin">Log in</Link>
          </div>
        </div>

        <h3 className="home-tagline">
          Checklist for a safer future.
          Do things.
        </h3>

        <p>
          <Link to="/projects">
            My Projects
          </Link>
        </p>
      </div>
    );
  }
}

export default Home;
