import React from 'react';

const AppHeaderTitleItem = (props) => (
  <div className="header-breadcrumbs-item">
    {props.children}
  </div>
);

AppHeaderTitleItem.propTypes = {
  children: React.PropTypes.any.isRequired,
};

export default AppHeaderTitleItem;
