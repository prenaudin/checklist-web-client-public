import React from 'react';
import { connect } from 'react-redux';
import User from 'models/User';
import HeaderUser from 'components/App/HeaderUser';

class HeaderUserContainer extends React.Component {

  render() {
    const { user } = this.props;
    if (!user.get('isSignedIn')) { return false; }
    return (
      <HeaderUser user={user} />
    );
  }
}

HeaderUserContainer.propTypes = {
  user: React.PropTypes.instanceOf(User).isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, null)(HeaderUserContainer);
