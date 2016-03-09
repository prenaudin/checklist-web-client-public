import React from 'react';
import {Link} from 'react-router';

class HeaderHome extends React.Component {
  render() {
    return (
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
    );
  }
}

export default HeaderHome;
