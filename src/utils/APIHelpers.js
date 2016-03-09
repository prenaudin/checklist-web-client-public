import humps from 'humps'

const flattenObject = function(object) {
  const relationships = _.reduce(object.relationships, (result, value, key) => {
    if (_.isArray(value.data)) {
      result[key] = _.pluck(value.data, 'id')
    } else {
      if (value.data) { result[key] = value.data.id; }
    }
    return result
  }, {})
  return _(object)
    .pick('id', 'type')
    .extend(object.attributes)
    .extend(relationships)
    .value()
}

const flattenObjects = function(objects) {
  if (!_.isArray(objects)) {
    objects = [objects]
  }
  return _.map(objects, flattenObject)
}

export const camelizeKeys = function(object) {
  return humps.camelizeKeys(object)
}

export const decamelizeKeys = function(object) {
  return humps.decamelizeKeys(object)
}

export const flattenResponse = function(response) {
  let flatten = []
  flatten.push(flattenObjects(response.data))
  response.included && flatten.push(flattenObjects(response.included))

  const entities = _(flatten)
    .flatten()
    .groupBy((value) => { return value.type })
    .mapValues((value) => {
      return _.reduce(value, (result, v) => {
        result[v.id] = camelizeKeys(v)
        return result
      }, {})
    })
    .value()

  const results = _(entities)
    .mapValues((value) => { return _.keys(value) })
    .value()

  return {results, entities}
}
