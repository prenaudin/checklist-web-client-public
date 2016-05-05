import React from 'react';

class RoutesRedirectLayout extends React.Component {
  static propTypes = {
    routes: React.PropTypes.array.isRequired,
    children: React.PropTypes.any.isRequired,
  }

  componentWillMount() {
    this.props.routes[0].onRedirect(this.props.children);
  }

  render() {
    return false;
  }
}

export default RoutesRedirectLayout;
