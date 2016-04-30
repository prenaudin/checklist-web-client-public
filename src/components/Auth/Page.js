import React from 'react';
import { Link } from 'react-router';
const imgLogo = require('base-logo.svg');
const imgScreenshot = require('home-video-placeholder@2x.png');

const AuthPage = (props) => (
  <div className="auth-page">
    <div className="auth-page-form">
      <div className="auth-page-form-content">
        <Link to="/home" className="auth-page-logo">
          <img alt="C" src={imgLogo} className="home-logo-img" />
          Checklist
        </Link>
        <div className="auth-page-title">
          Create a new checklist
        </div>
        {props.children}
      </div>
    </div>
    <div className="auth-page-illustration">
      <img
        width={824}
        height={484}
        role="presentation"
        className="auth-page-illustration-img"
        src={imgScreenshot}
      />
    </div>
  </div>
);

AuthPage.propTypes = {
  children: React.PropTypes.any,
};

export default AuthPage;
