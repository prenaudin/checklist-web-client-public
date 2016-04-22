import Immutable from 'immutable';

const { Record } = Immutable;

const defaultRecord = {
  id: null,
  type: 'project',
  title: '',
  createdAt: null,
  createdBy: null,
  updatedAt: null,
  checklists: new Immutable.OrderedSet(),
};

const ProjectRecord = Record(defaultRecord);

export default ProjectRecord;
