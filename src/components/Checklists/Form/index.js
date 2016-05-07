import React from 'react';
import _ from 'lodash';
import Immutable from 'immutable';
import { Link } from 'react-router';

import TextareaAutosize from 'react-textarea-autosize';
import ChecklistsFormTestSuiteItem from 'components/Checklists/Form/TestSuiteItem';

const TestRecord = Immutable.Record({
  id: null,
  title: '',
});

const createTest = () => new TestRecord({ id: _.uniqueId('testSuiteRecordId') });

const serializeTestSuite = (testSuite) =>
  testSuite.filter((test) => !_.isEmpty(test.get('title')));

class ChecklistsForm extends React.Component {
  static propTypes = {
    title: React.PropTypes.string,
    description: React.PropTypes.string,
    projectId: React.PropTypes.string.isRequired,
    testSuite: React.PropTypes.instanceOf(Immutable.Map),
    onClickSave: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeTestTitle = this.handleChangeTestTitle.bind(this);
    this.handleChangeLastTestTitle = this.handleChangeLastTestTitle.bind(this);
    this.handleClickSave = this.handleClickSave.bind(this);

    const test = createTest();
    this.state = {
      title: props.title || '',
      description: props.description || '',
      testSuite: props.testSuite || new Immutable.Map().set(test.id, test),
    };
  }

  render() {
    const projectId = this.props.projectId;
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
            onChange={this.handleChangeTitle}
            placeholder="Awesome Checklist"
          />
        </label>

        <label className="checklists-new-label form-group">
          <div className="form-title">
            Checklist description
          </div>
          <TextareaAutosize
            className="checklists-new-input form-input"
            value={this.state.description}
            onChange={this.handleChangeDescription}
            placeholder="You can use Markdown and Emoji 🎉"
          />
        </label>

        <hr className="form-hr" />

        {
          this.state.testSuite.map((test) => {
            testIndex++;
            return (
              <ChecklistsFormTestSuiteItem
                key={test.get('id')}
                index={testIndex}
                test={test}
                isLast={testIndex === this.state.testSuite.size}
                onChangeTestTitle={this.handleChangeTestTitle}
                onChangeLastTestTitle={this.handleChangeLastTestTitle}
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
              <div className="btn btn-primary" onClick={this.handleClickSave}>
                Save
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleChangeTitle(e) {
    this.setState({ title: e.target.value });
  }

  handleChangeDescription(e) {
    this.setState({ description: e.target.value });
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
    const { projectId } = this.props;
    const data = {
      title: this.state.title,
      description: this.state.description,
      testSuite: serializeTestSuite(this.state.testSuite).map((test) => (
        test.get('title')
      )).toArray(),
      project: projectId,
    };
    this.props.onClickSave(data);
  }
}

export default ChecklistsForm;
