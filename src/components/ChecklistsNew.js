import React from 'react';
import _ from 'lodash';
import Immutable from 'immutable';
import {Link} from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ChecklistActions from '../actions/checklists';

const TestRecord = Immutable.Record({
  id: null,
  title: '',
})

const createTest = () => {
  return new TestRecord({ id: _.uniqueId() })
}

const serializeTestSuite = (testSuite) => {
  return testSuite.filter((test) => {
    return !_.isEmpty(test.title)
  })
}

class ChecklistsNewTestSuiteItem extends React.Component {

  render() {
    return (
      <label className='checklists-new-label form-group'>
        <div className='form-title'>
          Story #{this.props.index}
        </div>
        <input
          className='checklists-new-input form-input form-input--md'
          type='text'
          value={this.props.test.title}
          onChange={this.handleChange.bind(this)}
          placeholder='You can use markdown'
        />
      </label>
    );
  }

  handleChange(e) {
    if (this.props.isLast) {
      this.props.onChangeLastTestTitle(e, this.props.test.id)
    } else {
      this.props.onChangeTestTitle(e, this.props.test.id)
    }
  }
}

class ChecklistsNew extends React.Component {

  constructor() {
    super();
    const test = createTest();

    this.state = {
      title: '',
      testSuite: new Immutable.Map().set(test.id, test)
    };
  }

  render() {
    const projectId = this.props.params.projectId;
    let testIndex = 0;

    return (
      <div className='checklists-new'>

        <label className='checklists-new-label form-group'>
          <div className='form-title'>
            Title
          </div>
          <input
            className='checklists-new-input form-input form-input--lg'
            type='text'
            autoFocus
            value={this.state.title}
            onChange={this.handleChangeTitle.bind(this)}
            placeholder='Awesome Checklist'
          />
        </label>

        {
          this.state.testSuite.map(((test) => {
            testIndex++
            return (
              <ChecklistsNewTestSuiteItem
                key={test.id}
                index={testIndex}
                test={test}
                isLast={testIndex === this.state.testSuite.size}
                onChangeTestTitle={this.handleChangeTestTitle.bind(this)}
                onChangeLastTestTitle={this.handleChangeLastTestTitle.bind(this)}
              />
            );
          }).bind(this)).toArray()
        }

        <div className='form-footer-container'>
          <div className='form-footer clearfix'>
            <div className='form-resume'>
              <div className='form-resume-count'>
                {serializeTestSuite(this.state.testSuite).size}
              </div>
              <div className='form-resume-subtitle'>
                Tests
              </div>
            </div>

            <div className='checklists-new-actions form-actions'>
              <Link className='btn btn-default' to={`/projects/${projectId}/checklists`}>
                Cancel
              </Link>
              <a
                href='javascript:void'
                className='btn btn-primary'
                onClick={this.handleClickSave.bind(this)}
              >
                Save
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleChangeTitle(e) {
    this.setState({title: e.target.value});
  }

  handleChangeTestTitle(e, id) {
    const newTitle = e.target.value;
    const oldSuite = this.state.testSuite;
    this.setState({
      testSuite: oldSuite.set(id, oldSuite.get(id).set('title', newTitle))
    });
  }

  handleChangeLastTestTitle(e, id) {
    const newTitle = e.target.value;
    const oldSuite = this.state.testSuite;
    const newTest = createTest()
    this.setState({
      testSuite: oldSuite
        .set(newTest.id, newTest)
        .set(id, oldSuite.get(id).set('title', newTitle))
    });
  }

  handleClickSave() {
    const projectId = this.props.params.projectId
    const data = {
      title: this.state.title,
      testSuite: serializeTestSuite(this.state.testSuite).map((test) => {
        return {title: test.title}
      }).toArray(),
      project: projectId,
    }
    this.props.actions.addChecklist(data);
    this.props.history.pushState(null, `/projects/${projectId}/checklists`);
  }

}

ChecklistsNew.propTypes = {
  actions: React.PropTypes.object.isRequired
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ChecklistActions, dispatch)
  }
}

export default connect(
  null,
  mapDispatchToProps
)(ChecklistsNew)
