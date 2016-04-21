import Immutable from 'immutable';

const { Record } = Immutable;

const defaultRecord = {
  id: null,
  createdAt: null,
  updatedAt: null,
  type: 'checklists',
  title: '',
  project: null,
  testSuite: {},
  versions: new Immutable.OrderedSet(),
  lastVersion: null,
};

const Checklist = Record(defaultRecord);

export default Checklist;
