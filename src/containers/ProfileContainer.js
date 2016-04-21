import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfilePage from 'components/Profile/Page';
import { signout } from 'actions/account';

class ProfileContainer extends Component {
  render() {
    return (
      <ProfilePage
        onSignout={this.props.onSignout}
      />
    );
  }
}

ProfileContainer.propTypes = {
  onSignout: React.PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    onSignout: () => dispatch(signout()),
  };
}

export default connect(
  null,
  mapDispatchToProps
)(ProfileContainer);
