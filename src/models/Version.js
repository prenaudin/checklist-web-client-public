import Immutable from 'immutable';

const { Record } = Immutable;

const defaultRecord = {
  id: null,
  createdAt: null,
  updatedAt: null,
  type: 'versions',
  title: '',
  checklist: null,
  tests: {},
  publicSlug: null,
};

const VersionRecord = Record(defaultRecord);

/* Last version counters */
const getTestsCount = (version, status) => {
  const tests = version.get('tests');
  return tests.reduce((memo, test) => {
    switch (test.get('status')) {
      case status:
        return memo + 1;
      default:
        return memo;
    }
  }, 0);
};

class Version extends VersionRecord {
  getOkCount() {
    return getTestsCount(this, 'ok');
  }

  getNokCount() {
    return getTestsCount(this, 'nok');
  }

  getPendingCount() {
    return getTestsCount(this, 'pending');
  }

  isPublic() {
    return this.get('publicSlug') !== null;
  }
}

export default Version;
