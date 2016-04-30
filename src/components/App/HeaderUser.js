import React from 'react';
import { Link } from 'react-router';
import User from 'models/User';

class HeaderUser extends React.Component {
  render() {
    const email = this.props.user.get('email');
    const firstLetter = email[0];

    return (
      <Link to="/profile" className="header-infos">
        {this.props.user.get('email')}
        <div className="header-infos-avatar">
          {firstLetter}
        </div>
      </Link>
    );
  }
}

HeaderUser.propTypes = {
  user: React.PropTypes.instanceOf(User).isRequired,
};

export default HeaderUser;
