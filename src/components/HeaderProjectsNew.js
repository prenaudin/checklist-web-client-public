import React from 'react';
import { Link } from 'react-router';
import HeaderAccount from './HeaderAccount';

class HeaderProjectsNew extends React.Component {
  render() {

    return (
      <div className="header header--projects-new">
        <div className="header-title header-title--breadcrumbs">
          <Link to='/projects' className='header-breadcrumbs-item'>
            Projects
          </Link>
          <div className='header-breadcrumbs-item'>
            New
          </div>
        </div>
        <HeaderAccount/>
      </div>
    );
  }
}

export default HeaderProjectsNew;
