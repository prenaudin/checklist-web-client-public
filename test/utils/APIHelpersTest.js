import * as APIHelpers from 'utils/APIHelpers';

describe('APIHelpers', () => {
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
