import humps from 'humps';
import _ from 'lodash';

import * as ErrorTypes from 'constants/ErrorTypes';
import ErrorRecord from 'models/ErrorRecord';

const flattenObject = function flattenObject(object) {
  const relationships = _.reduce(object.relationships, (result, value, key) => {
    const formatResult = result;
    if (_.isArray(value.data)) {
      formatResult[key] = _.pluck(value.data, 'id');
    } else {
      if (value.data) {
        formatResult[key] = value.data.id;
      }
    }
    return formatResult;
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
    .groupBy((value) => value.type)
    .mapValues((value) =>
      _.reduce(value, (result, resultValue) => {
        const formatResult = result;
        formatResult[resultValue.id] = camelizeKeys(resultValue);
        return formatResult;
      }, {})
    ).value();

  const results = _(entities)
    .mapValues((value) => _.keys(value))
    .value();

  return { results, entities };
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
