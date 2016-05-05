import Immutable from 'immutable';
import Version from 'models/Version';

describe('Version Model', () => {
  describe('Version counters', () => {
    const version = new Version(Immutable.fromJS({
      id: 2,
      tests: [
        { id: 1, title: 'A', status: 'ok' },
        { id: 2, title: 'B', status: 'nok' },
        { id: 3, title: 'C', status: 'nok' },
        { id: 4, title: 'D', status: 'nok' },
        { id: 5, title: 'E', status: 'ok' },
        { id: 6, title: 'F', status: 'pending' },
      ],
    }));

    it('presents version ok count', () => {
      expect(version.getOkCount()).to.equal(2);
    });

    it('presents version nok count', () => {
      expect(version.getNokCount()).to.equal(3);
    });

    it('presents version pending count', () => {
      expect(version.getPendingCount()).to.equal(1);
    });
  });
});
