import React from 'react';
import { Link } from 'react-router';
import AppPage from 'components/App/Page';
import AppHeaderTitleLink from 'components/App/HeaderTitleLink';
import AppHeaderTitleItem from 'components/App/HeaderTitleItem';

class ProjectsNewPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleClickSave = this.handleClickSave.bind(this);
    this.state = {
      title: '',
    };
  }

  render() {
    return (
      <AppPage
        id="projects-index"
        title={[
          <AppHeaderTitleLink key="projects" to="/projects"> Projects </AppHeaderTitleLink>,
          <AppHeaderTitleItem key="new"> New Project </AppHeaderTitleItem>,
        ]}
      >
        <div className="projects-new">
          <label className="projects-new-label form-group">
            <div className="form-title"> Title </div>
            <input
              className="projects-new-input form-input form-input--lg"
              type="text"
              autoFocus
              value={this.state.title}
              onChange={this.handleChangeTitle}
              placeholder="Awesome Project"
            />
          </label>

          <div className="projects-new-actions form-actions">
            <Link className="btn btn-default" to="/projects">
              Cancel
            </Link>

            <div className="btn btn-primary" onClick={this.handleClickSave}>
              Save
            </div>
          </div>
        </div>
      </AppPage>
    );
  }

  handleChangeTitle(e) {
    this.setState({ title: e.target.value });
  }

  handleClickSave() {
    this.props.onAddProject({
      title: this.state.title,
    });
  }
}

ProjectsNewPage.propTypes = {
  onAddProject: React.PropTypes.func.isRequired,
};

export default ProjectsNewPage;
