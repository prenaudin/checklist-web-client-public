import Immutable from 'immutable';

const { Record } = Immutable;

const defaultRecord = {
  type: null,
  message: null,
};

const ErrorRecord = Record(defaultRecord);

export default ErrorRecord;
