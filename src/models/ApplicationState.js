import Immutable from 'immutable';

const { Record } = Immutable;

const defaultRecord = {
  modalReturnTo: null,
};

const ApplicationStateRecord = Record(defaultRecord);

class ApplicationState extends ApplicationStateRecord {
  getModalReturnTo() {
    return this.get('modalReturnTo') || '/projects';
  }
}

export default ApplicationState;
