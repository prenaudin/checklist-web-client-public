import React from 'react';
const iconsImgSrc = require('icons.svg');

class Icon extends React.Component {

  render() {
    const iconId = this.props.id ? 'icon-' + this.props.id : this.props.iconId;
    const href = iconsImgSrc + '#' + iconId;
    return (
      <svg
        className="icon"
        dangerouslySetInnerHTML={{__html: `<use xlink:href="${href}"/>`}}
      />
    );
  }

}

export default Icon;
