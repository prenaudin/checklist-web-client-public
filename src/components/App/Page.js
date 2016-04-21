import React from 'react';
import classNames from 'classnames';
import AppHeader from 'components/App/Header';

class AppPage extends React.Component {
  render() {
    const className = classNames('page', this.props.id);
    let header = false;
    if (this.props.title) {
      header = (
        <AppHeader title={this.props.title}/>
      );
    }
    return (
      <div className={className}>
        { header }
        { this.props.children }
      </div>
    );
  }
}

AppPage.propTypes = {
  children: React.PropTypes.any.isRequired,
  title: React.PropTypes.any,
  id: React.PropTypes.string.isRequired,
};

export default AppPage;
