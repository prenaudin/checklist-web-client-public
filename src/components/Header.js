import React from 'react';
import HeaderAccount from './HeaderAccount';
import { Link } from 'react-router';

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <Link to='/' className="header-title header-title--brand header-breadcrumbs-item">
          Checklyst
        </Link>
        <HeaderAccount/>
      </div>
    );
  }
}

export default Header;
