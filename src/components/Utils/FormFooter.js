import React from 'react';

const FormFooter = ({ children }) => (
  <div className="form-footer-container">
    <div className="form-footer clearfix">
      {children}
    </div>
  </div>
);

FormFooter.propTypes = {
  children: React.PropTypes.node.isRequired,
};

const FormFooterActions = ({ children }) => (
  <div className="form-actions">
    {children}
  </div>
);

FormFooterActions.propTypes = {
  children: React.PropTypes.node.isRequired,
};

const FormFooterResume = ({ type, count }) => {
  let color;
  let text;
  switch (type) {
    case 'ok':
      color = '#7ED321';
      text = '👍';
      break;
    case 'nok':
      color = '#F5A623';
      text = '👎';
      break;
    case 'pending':
      color = '#888888';
      text = '💤';
      break;
    default:
      return false;
  }
  return (
    <div className="form-resume" style={{ marginRight: '30px' }}>
      <div className="form-resume-count" style={{ color, fontWeight: '300' }}>
        {count}
      </div>
      <div className="form-resume-subtitle">
        {text}
      </div>
    </div>
  );
};

FormFooterResume.propTypes = {
  type: React.PropTypes.string.isRequired,
  count: React.PropTypes.node.isRequired,
};

FormFooter.Actions = FormFooterActions;
FormFooter.Resume = FormFooterResume;
export default FormFooter;
