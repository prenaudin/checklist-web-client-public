import React from 'react';
import { connect } from 'react-redux';
import ProfilePage from 'components/Profile/Page';
import { signout } from 'actions/auth';

const ProfileContainer = (props) => <ProfilePage {...props} />;

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
