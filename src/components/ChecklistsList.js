import React from 'react'
import {Link} from 'react-router'
import moment from 'moment'
import ChecklistsHelpers from '../utils/ChecklistsHelpers'
import Icon from './Icon'
import ChecklistsListItem from './ChecklistsListItem'

class ChecklistsList extends React.Component {
  render() {
    return (
      <ul className="checklists-list">
        <li className='checklists-list-item checklists-list-item--new'>
          <Link
            to={`/projects/${this.props.projectId}/checklists/new`}
            className='checklists-list-item-content--new'
          >
            <div className='checklists-list-item-content-text'>
              New Checklist
            </div>
          </Link>
        </li>
        {
          this.props.checklists.map((checklist) => {
            return (
              <ChecklistsListItem
                key={checklist.get('id')}
                projectId={this.props.projectId}
                checklist={checklist}
                versions={this.props.versions}
              />
            )
          }).toArray()
        }
      </ul>
    );
  }
}

export default ChecklistsList;
