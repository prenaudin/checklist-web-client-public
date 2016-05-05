import * as APIHelpers from 'utils/APIHelpers';
import projectsShowFixture from 'api/fixtures/projects/show';

describe('APIHelpers', () => {
  describe('Transform Object keys', () => {
    it('should camelize keys', () => {
      const rawData = {
        id: 1,
        created_by: 'John',
        delegated_from_on: 'Tuesday',
      };

      expect(APIHelpers.camelizeKeys(rawData)).to.deep.equal({
        id: 1,
        createdBy: 'John',
        delegatedFromOn: 'Tuesday',
      });
    });

    it('should decamelize keys', () => {
      const rawData = {
        id: 1,
        createdBy: 'John',
        delegatedFromOn: 'Tuesday',
      };

      expect(APIHelpers.decamelizeKeys(rawData)).to.deep.equal({
        id: 1,
        created_by: 'John',
        delegated_from_on: 'Tuesday',
      });
    });
  });

  describe('Flatten API Response', () => {
    it('flatten response to results ids', () => {
      const flatten = APIHelpers.flattenResponse(projectsShowFixture);
      expect(flatten.results).to.deep.equal({
        checklists: ['3'],
        users: ['1'],
        projects: ['1'],
      });
    });
  });
});
