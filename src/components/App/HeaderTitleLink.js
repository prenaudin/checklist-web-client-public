import React from 'react';
import { Link } from 'react-router';

const AppHeaderTitleLink = (props) => (
  <Link
    to={props.to}
    className="header-breadcrumbs-item"
  >
    {props.children}
  </Link>
);

AppHeaderTitleLink.propTypes = {
  children: React.PropTypes.any.isRequired,
  to: React.PropTypes.string.isRequired,
};

export default AppHeaderTitleLink;
