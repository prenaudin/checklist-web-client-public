import React from 'react';
import _ from 'lodash';
import Immutable from 'immutable';
import {Link} from 'react-router';
import ChecklistsFormTestSuiteItem from './ChecklistsFormTestSuiteItem';

const TestRecord = Immutable.Record({
  id: null,
  title: '',
});

const createTest = () => {
  return new TestRecord({ id: _.uniqueId('testSuiteRecordId') });
};

const serializeTestSuite = (testSuite) => {
  return testSuite.filter((test) => {
    return !_.isEmpty(test.get('title'));
  });
};

class ChecklistsForm extends React.Component {

  constructor(props) {
    super(props);

    const test = createTest();
    this.state = {
      title: props.title || '',
      testSuite: props.testSuite || new Immutable.Map().set(test.id, test),
    };
  }

  render() {
    const projectId = this.props.params.projectId;
    let testIndex = 0;

    return (
      <div className="checklists-new">

        <label className="checklists-new-label form-group">
          <div className="form-title">
            Title
          </div>
          <input
            className="checklists-new-input form-input form-input--lg"
            type="text"
            autoFocus
            value={this.state.title}
            onChange={this.handleChangeTitle.bind(this)}
            placeholder="Awesome Checklist"
          />
        </label>

        {
          this.state.testSuite.map((test) => {
            testIndex++;
            return (
              <ChecklistsFormTestSuiteItem
                key={test.get('id')}
                index={testIndex}
                test={test}
                isLast={testIndex === this.state.testSuite.size}
                onChangeTestTitle={this.handleChangeTestTitle.bind(this)}
                onChangeLastTestTitle={this.handleChangeLastTestTitle.bind(this)}
              />
            );
          }).toArray()
        }

        <div className="form-footer-container">
          <div className="form-footer clearfix">
            <div className="form-resume">
              <div className="form-resume-count">
                {serializeTestSuite(this.state.testSuite).size}
              </div>
              <div className="form-resume-subtitle">
                Tests
              </div>
            </div>

            <div className="checklists-new-actions form-actions">
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

  handleChangeTestTitle(e, id) {
    const newTitle = e.target.value;
    const oldSuite = this.state.testSuite;
    this.setState({
      testSuite: oldSuite.set(id, oldSuite.get(id).set('title', newTitle)),
    });
  }

  handleChangeLastTestTitle(e, id) {
    const newTitle = e.target.value;
    const oldSuite = this.state.testSuite;
    const newTest = createTest();
    this.setState({
      testSuite: oldSuite
        .set(newTest.id, newTest)
        .set(id, oldSuite.get(id).set('title', newTitle)),
    });
  }

  handleClickSave() {
    const projectId = this.props.params.projectId;
    const data = {
      title: this.state.title,
      testSuite: serializeTestSuite(this.state.testSuite).map((test) => {
        return test.get('title');
      }).toArray(),
      project: projectId,
    };
    this.props.onClickSave(data);
  }
}

ChecklistsForm.propTypes = {
  title: React.PropTypes.string,
  params: React.PropTypes.object.isRequired,
  testSuite: React.PropTypes.instanceOf(Immutable.Map),
  onClickSave: React.PropTypes.func.isRequired,
};

export default ChecklistsForm;
