import React from 'react'
import {Link} from 'react-router'
import moment from 'moment'
import ChecklistsHelpers from '../utils/ChecklistsHelpers';
import Icon from './Icon'
import * as ChecklistActions from '../actions/checklists'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class ChecklistsListItem extends React.Component {

  constructor() {
    super()

    this.state = {
      showOptions: false
    }
  }

  render() {
    const checklist = this.props.checklist

    let content
    if (this.state.showOptions) {
      content = this.renderOptions()
    } else {
      content = this.renderDefault()
    }

    return (
      <li className='checklists-list-item checklists-list-item--show'>
        {content}
      </li>
    )
  }

  renderDefault() {
    const checklist = this.props.checklist;
    const lastVersionId = this.props.checklist.get('lastVersion');

    return (
      <div className='checklists-list-item--default'>
        <a
          href='javascript:void(0)'
          className='checklists-list-item-show-options'
          onClick={this.handleClickOptions.bind(this)}
        >
          <span className='checklists-list-item-show-options-content'>
            Options
          </span>
          <Icon id='options'/>
        </a>

        <div className='checklists-list-item-title'>
          {checklist.get('title')}
        </div>
        <div className='checklists-list-item-subtitle'>
          Version 3
          {' • '}
          {moment(checklist.get('createdAt')).format('DD/MM/YY')}
        </div>
        <div className='checklists-list-item-counters'>
          <div className='checklists-list-item-counters-list clearfix'>
            <div className='checklists-list-item-counters-item'>
              <div className='checklists-list-item-counters-item-count'>
                {checklist.get('lastVersionOkCount')}
              </div>
              <div className='checklists-list-item-counters-item-label'>
                👍
              </div>
            </div>
            <div className='checklists-list-item-counters-item'>
              <div className='checklists-list-item-counters-item-count'>
                {checklist.get('lastVersionNokCount')}
              </div>
              <div className='checklists-list-item-counters-item-label'>
                👎
              </div>
            </div>
            <div className='checklists-list-item-counters-item'>
              <div className='checklists-list-item-counters-item-count'>
                {checklist.get('lastVersionPendingCount')}
              </div>
              <div className='checklists-list-item-counters-item-label'>
                💤
              </div>
            </div>
          </div>
          <Link
            to={`/projects/${checklist.get('project')}/checklists/${checklist.get('id')}/run`}
            className='checklists-list-item-counters-btn btn btn-primary'
          >
            New test
          </Link>
        </div>
      </div>
    )
  }

  renderOptions() {
    const checklist = this.props.checklist
    return (
      <div className='checklists-list-item--options'>
        <a
          href='javascript:void(0)'
          className='checklists-list-item-close-options'
          onClick={this.handleClickClose.bind(this)}
        >
          <Icon id='close'/>
        </a>
        <div className='checklists-list-item-actions'>
          <Link to={`/projects/${checklist.get('project')}/checklists/${checklist.get('id')}/share`}>
            <Icon id='share'/>
            Share
          </Link>
          <Link to={`/projects/${checklist.get('project')}/checklists/${checklist.get('id')}/edit`}>
            <Icon id='edit'/>
            Edit
          </Link>
          <Link to={`/projects/${checklist.get('project')}/checklists/${checklist.get('id')}/duplicate`}>
            <Icon id='duplicate'/>
            Duplicate
          </Link>
          <a href='javascript:void(0)' onClick={this.handleClickDelete.bind(this)}>
            <Icon id='delete'/>
            Delete
          </a>
        </div>
      </div>
    )
  }

  handleClickOptions() {
    this.setState({showOptions: true})
  }

  handleClickClose() {
    this.setState({showOptions: false})
  }

  handleClickDelete() {
    this.props.actions.deleteChecklist({
      projectId: this.props.checklist.get('project'),
      checklistId: this.props.checklist.get('id'),
    });
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ChecklistActions, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(ChecklistsListItem)
