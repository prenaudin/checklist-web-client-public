import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import User from 'models/User';

class HeaderAccount extends React.Component {
  render() {
    if (!this.props.user.get('isSignedIn')) {
      return false;
    }
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

HeaderAccount.propTypes = {
  user: React.PropTypes.instanceOf(User).isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, null)(HeaderAccount);
