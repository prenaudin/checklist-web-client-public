import ApplicationState from 'models/ApplicationState';

describe('ApplicationState Model', () => {
  describe('modalReturnTo', () => {
    const model = new ApplicationState();

    it('presents modalReturnTo as setted', () => {
      expect(
        model.set('modalReturnTo', '/home').getModalReturnTo()
      ).to.equal('/home');
    });

    it('presents default modalReturnTo if not setted', () => {
      expect(
        model.getModalReturnTo()
      ).to.equal('/projects');
    });
  });
});
