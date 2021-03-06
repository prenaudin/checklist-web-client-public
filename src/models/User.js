import Immutable from 'immutable';

const { Record } = Immutable;

const defaultRecord = {
  id: null,
  email: null,
  isSignedIn: false,
  isSigning: false,
  authError: false,
};

const UserRecord = Record(defaultRecord);

export default UserRecord;
