import React from 'react';
import AppPage from 'components/App/Page';
import AppHeaderTitleItem from 'components/App/HeaderTitleItem';
import AppHeaderTitleLink from 'components/App/HeaderTitleLink';

const ProfilePage = (props) => {
  const { onSignout } = props;
  return (
    <AppPage
      id="profile"
      title={[
        <AppHeaderTitleLink key="projects" to="/projects"> Projects </AppHeaderTitleLink>,
        <AppHeaderTitleItem key="profile"> Profile </AppHeaderTitleItem>,
      ]}
    >
      <div className="profile">
        Profile
        <br />
        <div
          className="btn btn-default"
          onClick={onSignout}
        >
          logout
        </div>
      </div>
    </AppPage>
  );
};

ProfilePage.propTypes = {
  onSignout: React.PropTypes.func.isRequired,
};

export default ProfilePage;
