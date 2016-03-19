import React from 'react';
import _ from 'lodash';
import Immutable from 'immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ChecklistActions from '../actions/checklists';
import ChecklistsForm from './ChecklistsForm';

class ChecklistsEdit extends React.Component {

  componentDidMount() {
    const {projectId, checklistId} = this.props.params;
    this.props.actions.findChecklist({projectId, checklistId});
  }

  render() {
    const {checklistId} = this.props.params;
    const checklist = this.props.checklists.get(checklistId);
    if (!checklist) {
      return false;
    }

    const testSuite = checklist.get('testSuite')
      .map((test) => test.set('id', _.uniqueId('testSuiteRecordId')))
      .toMap()
      .mapKeys((key, test) => {
        return test.get('id');
      });

    return (
      <ChecklistsForm
        title={checklist.get('title')}
        testSuite={testSuite}
        params={this.props.params}
        onClickSave={this.handleClickSave.bind(this)}
      />
    );
  }

  handleClickSave(data) {
    const {checklistId, projectId} = this.props.params;
    const updateData = _.extend({}, data, {checklistId});
    console.log(updateData);
    this.props.actions.updateChecklist(updateData);
    this.props.history.pushState(null, `/projects/${projectId}/checklists`);
  }
}

ChecklistsEdit.propTypes = {
  params: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired,
  checklists: React.PropTypes.instanceOf(Immutable.Map).isRequired,
  history: React.PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ChecklistActions, dispatch),
  };
}

function mapStateToProps(state) {
  return {
    checklists: state.checklists,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChecklistsEdit);
