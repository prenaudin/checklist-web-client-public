import humps from 'humps';
import _ from 'lodash';

import * as ErrorTypes from 'constants/ErrorTypes';
import ErrorRecord from 'models/ErrorRecord';

const flattenObject = function flattenObject(object) {
  const relationships = _.reduce(object.relationships, (result, value, key) => {
    if (_.isArray(value.data)) {
      result[key] = _.pluck(value.data, 'id');
    } else {
      if (value.data) {
        result[key] = value.data.id;
      }
    }
    return result;
  }, {});

  return _(object)
    .pick('id', 'type')
    .extend(object.attributes)
    .extend(relationships)
    .value();
};

const flattenObjects = function flattenObjects(objectsToFlatten) {
  let objects = _.clone(objectsToFlatten);
  if (!_.isArray(objects)) {
    objects = [objects];
  }
  return _.map(objects, flattenObject);
};

export const camelizeKeys = function camelizeKeys(object) {
  return humps.camelizeKeys(object);
};

export const decamelizeKeys = function decamelizeKeys(object) {
  return humps.decamelizeKeys(object);
};

export const flattenResponse = function flattenResponse(response) {
  const flatten = [];
  flatten.push(flattenObjects(response.data));

  if (response.included) {
    flatten.push(flattenObjects(response.included));
  }

  const entities = _(flatten)
    .flatten()
    .groupBy((value) => { return value.type; })
    .mapValues((value) => {
      return _.reduce(value, (result, resultValue) => {
        result[resultValue.id] = camelizeKeys(resultValue);
        return result;
      }, {});
    })
    .value();

  const results = _(entities)
    .mapValues((value) => { return _.keys(value); })
    .value();

  return {results, entities};
};

export const transformServerError = function transformServerError(error) {
  switch (error.status) {
    case 401:
      return new ErrorRecord({
        type: ErrorTypes.UNAUTHORIZED,
        message: error.data.errors[0],
      });
    case 422:
      return new ErrorRecord({
        type: ErrorTypes.UNPROCESSABLE_ENTITY,
        message: error.data.errors.full_messages.join('\n'),
      });
    default:
      return false;
  }
};
