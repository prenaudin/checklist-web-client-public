import React from 'react';
import AppHeaderTitleLink from 'components/App/HeaderTitleLink';
import HeaderUserContainer from 'containers/HeaderUserContainer';

const AppHeader = (props) => {
  let title = (
    <AppHeaderTitleLink to="/">
      Checklist
    </AppHeaderTitleLink>
  );
  if (props.title) {
    title = props.title;
  }

  return (
    <div className="header">
      <div className="header-title header-title--breadcrumbs">
        {title}
      </div>
      <HeaderUserContainer />
    </div>
  );
};

AppHeader.propTypes = {
  title: React.PropTypes.any,
};

export default AppHeader;
