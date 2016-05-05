import Immutable from 'immutable';

const { Record } = Immutable;

const defaultRecord = {
  modalReturnTo: null,
};

const ApplicationState = Record(defaultRecord);

export default ApplicationState;
