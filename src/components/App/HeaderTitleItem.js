import React from 'react';

class AppHeaderTitleItem extends React.Component {
  render() {
    return (
      <div className="header-breadcrumbs-item">
        {this.props.children}
      </div>
    );
  }
}

AppHeaderTitleItem.propTypes = {
  children: React.PropTypes.any.isRequired,
};

export default AppHeaderTitleItem;
