import React from 'react';
import AppHeaderTitleLink from 'components/App/HeaderTitleLink';
import HeaderUserContainer from 'containers/HeaderUserContainer';

class AppHeader extends React.Component {
  render() {
    let title = (
      <AppHeaderTitleLink to="/">
        Checklist
      </AppHeaderTitleLink>
    );
    if (this.props.title) {
      title = this.props.title;
    }

    return (
      <div className="header">
        <div className="header-title header-title--breadcrumbs">
          { title }
        </div>
        <HeaderUserContainer/>
      </div>
    );
  }
}

AppHeader.propTypes = {
  children: React.PropTypes.any,
  title: React.PropTypes.any,
};

export default AppHeader;
