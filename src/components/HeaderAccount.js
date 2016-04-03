import React from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { Link } from 'react-router';

class HeaderAccount extends React.Component {
  render() {
    if (!this.props.account.get('isSignedIn')) {
      return false;
    }
    const email = this.props.account.get('email');
    const firstLetter = email[0];

    return (
      <Link to="/profile" className="header-infos">
        {this.props.account.get('email')}
        <div className="header-infos-avatar">
          {firstLetter}
        </div>
      </Link>
    );
  }
}

HeaderAccount.propTypes = {
  account: React.PropTypes.instanceOf(Immutable.Record).isRequired,
};

function mapStateToProps(state) {
  return {
    account: state.account,
  };
}

export default connect(mapStateToProps, null)(HeaderAccount);
