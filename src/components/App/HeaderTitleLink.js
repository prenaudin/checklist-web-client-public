import React from 'react';
import { Link } from 'react-router';

class AppHeaderTitleLink extends React.Component {
  render() {
    return (
      <Link
        to={this.props.to}
        className="header-breadcrumbs-item"
      >
        {this.props.children}
      </Link>
    );
  }
}

AppHeaderTitleLink.propTypes = {
  children: React.PropTypes.any.isRequired,
  to: React.PropTypes.string.isRequired,
};

export default AppHeaderTitleLink;
