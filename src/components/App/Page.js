import React from 'react';
import classNames from 'classnames';
import AppHeader from 'components/App/Header';

const AppPage = (props) => {
  const className = classNames('page', props.id, {
    'page-public': props.isPublic,
  });
  let header = false;
  if (props.title) {
    header = (
      <AppHeader title={props.title} />
    );
  }
  return (
    <div className={className}>
      {header}
      {props.children}
    </div>
  );
};

AppPage.propTypes = {
  children: React.PropTypes.any.isRequired,
  title: React.PropTypes.any,
  id: React.PropTypes.string.isRequired,
  isPublic: React.PropTypes.bool.isRequired,
};

export default AppPage;
