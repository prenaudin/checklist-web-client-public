import React from 'react';
import _ from 'lodash';
import Immutable from 'immutable';
import {Link} from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ChecklistActions from '../actions/checklists';
import ChecklistsRunTestsItem from './ChecklistsRunTestsItem';

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

const countOk = (tests) => {
  return tests.filter(test => test.status === 'ok').size;
};

const countNok = (tests) => {
  return tests.filter(test => test.status === 'nok').size;
};

const countPending = (tests) => {
  return tests.filter(test => test.status === 'pending').size;
};

const initTests = (testSuite) => {
  return _.reduce(testSuite, (memo, test) => {
    const newTest = createTest(test);
    return memo.set(newTest.id, newTest);
  }, new Immutable.Map());
};

class ChecklistsRun extends React.Component {

  constructor() {
    super();

    this.state = {
      title: '',
      tests: new Immutable.Map(),
    };
  }

  componentDidMount() {
    const {checklistId, projectId} = this.props.params;
    this.props.actions.findChecklist({checklistId, projectId});
  }

  componentWillReceiveProps(nextProps) {
    const {checklistId} = nextProps.params;
    const checklist = nextProps.checklists.get(checklistId);
    if (checklist && this.state.tests.size === 0) {
      this.setState({
        title: 'v' + (checklist.get('versions').size + 1),
        tests: initTests(checklist.get('testSuite').toJS()),
      });
    }
  }

  render() {
    const {projectId, checklistId} = this.props.params;
    const checklist = this.props.checklists.get(checklistId);
    let testIndex = 0;

    if (!checklist) {
      return false;
    }

    return (
      <div className="checklists-run">

        <label className="checklists-run-title form-group">
          <div className="checklists-run-form-title form-title">
            {checklist.get('title')}
            {' - '}
            {this.state.title}
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
                onChangeTestStatus={(status) => this.handleChangeTestStatus({id: test.id, status})}
                onChangeTestComment={this.handleChangeTestComment.bind(this)}
                onShowTestComment={this.handleShowTestComment.bind(this)}
              />
            );
          }).toArray()
        }

        <div className="form-footer-container">
          <div className="form-footer clearfix">
            <div className="form-resume" style={{marginRight: '30px'}}>
              <div className="form-resume-count" style={{color: '#7ED321', fontWeight: '300'}}>
                {countOk(this.state.tests)}
              </div>
              <div className="form-resume-subtitle">
                👍
              </div>
            </div>
            <div className="form-resume" style={{marginRight: '30px'}}>
              <div className="form-resume-count" style={{color: '#F5A623', fontWeight: '300'}}>
                {countNok(this.state.tests)}
              </div>
              <div className="form-resume-subtitle">
                👎
              </div>
            </div>
            <div className="form-resume" style={{marginRight: '30px'}}>
              <div className="form-resume-count" style={{color: '#888888', fontWeight: '300'}}>
                {countPending(this.state.tests)}
              </div>
              <div className="form-resume-subtitle">
                💤
              </div>
            </div>

            <div className="checklists-run-actions form-actions">
              <Link className="btn btn-default" to={`/projects/${projectId}/checklists`}>
                Cancel
              </Link>
              <div
                className="btn btn-primary"
                onClick={this.handleClickSave.bind(this)}
              >
                Save
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleChangeTitle(e) {
    this.setState({title: e.target.value});
  }

  handleChangeTestStatus({id, status}) {
    this.setState({tests: this.state.tests.setIn([id, 'status'], status)});
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
    const {projectId, checklistId} = this.props.params;
    const data = {
      title: this.state.title,
      tests: this.state.tests.toList().toJS(),
    };
    this.props.actions.createVersion({projectId, checklistId, data});
  }

}

ChecklistsRun.propTypes = {
  params: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired,
  checklists: React.PropTypes.instanceOf(Immutable.Map),
};

function mapStateToProps(state) {
  return {
    checklists: state.checklists,
    projects: state.projects,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ChecklistActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChecklistsRun);
