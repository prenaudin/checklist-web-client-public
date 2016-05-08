import React from 'react';
const iconsImgSrc = require('icons.svg');

const Icon = (props) => {
  const iconId = `icon-${props.id}`;
  const href = `${iconsImgSrc}#${iconId}`;
  return (
    <svg className="icon">
      <use xlinkHref={href} />
    </svg>
  );
};

Icon.propTypes = {
  id: React.PropTypes.string.isRequired,
};

export default Icon;
