import React from 'react';
import {Link} from 'react-router';

const imgVideoPlaceholder = require('home-video-placeholder@2x.png');
const imgLogo = require('home-logo.svg');
const imgFeaturesCheck = require('home-features-check-icon.svg');
const imgFeaturesDuplicate = require('home-features-duplicate-icon.svg');
const imgFeaturesShare = require('home-features-share-icon.svg');
const imgCompanies = require('home-companies.svg');

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <section className="home-section home-section--header">
          <div className="home-section-inner">
            <header className="home-header clearfix">
              <div className="home-header-group pull-left">
                <Link to="pricing">Pricing</Link>
                <Link to="showcase">Showcase</Link>
              </div>
              <div className="home-header-group pull-right">
                <Link to="signup">Sign up</Link>
                <Link to="signin">Log in</Link>
              </div>
              <div className="home-logo">
                <img src={imgLogo} className="home-logo-img"/>
                Checklist
              </div>
            </header>

            <h3 className="home-tagline">
              Checklist for a safer future
              <br/>
              Do things
            </h3>

            <Link className="btn btn-primary home-signup-btn" to="signup">
              Sign up for free
            </Link>

            <div className="home-header-btn-subtitle">
              No credit card required
            </div>

            <div className="home-video">
              <img width={824} height={484} src={imgVideoPlaceholder}/>
            </div>
          </div>
        </section>

        <section className="home-section home-section--features">
          <div className="home-section-inner">
            <ul className="home-features-list clearfix">
              <li>
                <img
                  className="home-features-list-item-img"
                  src={imgFeaturesCheck}
                />
                <div className="home-features-list-item-title">
                  Check
                </div>
                <div className="home-features-list-item-subtitle">
                  Work your way up from a blank checklist, or pull list from notes or mail.
                </div>
              </li>
              <li>
                <img
                  className="home-features-list-item-img"
                  src={imgFeaturesShare}
                />
                <div className="home-features-list-item-title">
                  Share
                </div>
                <div className="home-features-list-item-subtitle">
                  Share your checklist with anyone or view on any device via a humble URL.
                </div>
              </li>
              <li>
              <img
                className="home-features-list-item-img"
                src={imgFeaturesDuplicate}
              />
              <div className="home-features-list-item-title">
                Duplicate
              </div>
              <div className="home-features-list-item-subtitle">
                You can duplicate chcelists from. Just click on the duplicate icon.
              </div>
              </li>
            </ul>
          </div>
        </section>

        <section className="home-section home-section--companies">
          <div className="home-section-inner">
            <div className="home-companies-title">
              Join people these great companies
            </div>
            <img className="home-companies-img" src={imgCompanies}/>
            <Link className="btn btn-primary home-signup-btn" to="signup">
              Sign up for free
            </Link>
          </div>
        </section>

        <section className="home-section home-section--footer">
          <div className="home-section-inner">
            © 2015 Checklist Limited. All rights reserved. Bordeaux, France
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
