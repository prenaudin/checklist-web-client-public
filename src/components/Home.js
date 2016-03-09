import React from 'react';
import {Link} from 'react-router';

class Home extends React.Component {
  render() {
    return (
      <div className="home page">

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
