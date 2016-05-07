import React from 'react';
import _ from 'lodash';
import Immutable from 'immutable';
import { Link } from 'react-router';

import Project from 'models/Project';
import Checklist from 'models/Checklist';

import AppPage from 'components/App/Page';
import AppHeaderTitleLink from 'components/App/HeaderTitleLink';
import AppHeaderTitleItem from 'components/App/HeaderTitleItem';
import ChecklistsRunTestsItem from './TestsItem';

const TestRecord = Immutable.Record({
  id: null,
  title: '',
  comment: '',
  status: 'pending',
  showComment: false,
});

const createTest = (params = {}) => {
  const testData = Object.assign({}, { id: _.uniqueId() }, params);
  return new TestRecord(testData);
};

const countOk = (tests) => tests.filter(test => test.status === 'ok').size;
const countNok = (tests) => tests.filter(test => test.status === 'nok').size;
const countPending = (tests) => tests.filter(test => test.status === 'pending').size;

const initTests = (testSuite) => (
  _.reduce(testSuite, (memo, testTitle) => {
    const newTest = createTest({ title: testTitle });
    return memo.set(newTest.id, newTest);
  }, new Immutable.Map())
);

class ChecklistsRunPage extends React.Component {

  constructor(props) {
    super(props);
    this.handleChangeTestComment = this.handleChangeTestComment.bind(this);
    this.handleShowTestComment = this.handleShowTestComment.bind(this);
    this.handleClickSave = this.handleClickSave.bind(this);

    const { checklist } = props;
    this.state = {
      title: `v${checklist.get('versions').size + 1}`,
      tests: initTests(checklist.get('testSuite').toJS()),
    };
  }

  render() {
    const { project, checklist } = this.props;
    let testIndex = 0;

    return (
      <AppPage
        id="checklists-run"
        title={[
          <AppHeaderTitleLink key="projects" to="/projects"> Projects </AppHeaderTitleLink>,
          <AppHeaderTitleLink key="checklist" to={`/projects/${project.get('id')}/checklists`}>
            {project.get('title')}
          </AppHeaderTitleLink>,
          <AppHeaderTitleItem key="new">
            Run {checklist.get('title')}
          </AppHeaderTitleItem>,
        ]}
      >

        <label className="checklists-run-title form-group">
          <div className="checklists-run-form-title form-title">
            {checklist.get('title')}
            {' - '}
            {this.state.title}
          </div>

          <div className="checklists-run-form-description form-description">
            {checklist.get('description')}
          </div>
        </label>

        {
          this.state.tests.map(test => {
            testIndex++;
            return (
              <ChecklistsRunTestsItem
                key={test.id}
                index={testIndex}
                test={test}
                onChangeTestStatus={(status) =>
                  this.handleChangeTestStatus({ id: test.id, status })}
                onChangeTestComment={this.handleChangeTestComment}
                onShowTestComment={this.handleShowTestComment}
              />
            );
          }).toArray()
        }

        <div className="form-footer-container">
          <div className="form-footer clearfix">
            <div className="form-resume" style={{ marginRight: '30px' }}>
              <div className="form-resume-count" style={{ color: '#7ED321', fontWeight: '300' }}>
                {countOk(this.state.tests)}
              </div>
              <div className="form-resume-subtitle">
                👍
              </div>
            </div>
            <div className="form-resume" style={{ marginRight: '30px' }}>
              <div className="form-resume-count" style={{ color: '#F5A623', fontWeight: '300' }}>
                {countNok(this.state.tests)}
              </div>
              <div className="form-resume-subtitle">
                👎
              </div>
            </div>
            <div className="form-resume" style={{ marginRight: '30px' }}>
              <div className="form-resume-count" style={{ color: '#888888', fontWeight: '300' }}>
                {countPending(this.state.tests)}
              </div>
              <div className="form-resume-subtitle">
                💤
              </div>
            </div>

            <div className="checklists-run-actions form-actions">
              <Link className="btn btn-default" to={`/projects/${project.get('id')}/checklists`}>
                Cancel
              </Link>
              <div
                className="btn btn-primary"
                onClick={this.handleClickSave}
              >
                Save
              </div>
            </div>
          </div>
        </div>
      </AppPage>
    );
  }

  handleChangeTitle(e) {
    this.setState({ title: e.target.value });
  }

  handleChangeTestStatus({ id, status }) {
    this.setState({ tests: this.state.tests.setIn([id, 'status'], status) });
  }

  handleChangeTestComment(e, id) {
    const newComment = e.target.value;
    const oldTests = this.state.tests;
    this.setState({
      tests: oldTests.set(id, oldTests.get(id).set('comment', newComment)),
    });
  }

  handleShowTestComment(e, id) {
    const oldTests = this.state.tests;
    this.setState({
      tests: oldTests.set(id, oldTests.get(id).set('showComment', true)),
    });
  }

  handleClickSave() {
    const data = {
      title: this.state.title,
      tests: this.state.tests.toList().map((test) => (
        {
          title: test.get('title'),
          status: test.get('status'),
          comment: test.get('comment'),
        }
      )).toJS(),
    };
    this.props.onCreateVersion(data);
  }
}

ChecklistsRunPage.propTypes = {
  project: React.PropTypes.instanceOf(Project).isRequired,
  checklist: React.PropTypes.instanceOf(Checklist).isRequired,
  onCreateVersion: React.PropTypes.func.isRequired,
};

export default ChecklistsRunPage;
