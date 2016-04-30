import React from 'react';
const iconsImgSrc = require('icons.svg');

class Icon extends React.Component {
  render() {
    const iconId = 'icon-' + this.props.id;
    const href = iconsImgSrc + '#' + iconId;
    return (
      <svg
        className="icon"
        dangerouslySetInnerHTML={{__html: `<use xlink:href="${href}"/>`}}
      />
    );
  }
}

Icon.propTypes = {
  id: React.PropTypes.string.isRequired,
};

export default Icon;