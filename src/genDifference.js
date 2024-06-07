import _ from "lodash";

const getDifferentObject = (object1, object2) => (
  _.sortBy(_.union(_.keys(object1), _.keys(object2))).map((key) => {
    if (!_.has(object2, key) && _.has(object1, key)) {
      const oldValue = object1[key];
      
      return {
        action: 'deleted',
        key,
        oldValue,
      };
    }
    
    if (!_.has(object1, key) && _.has(object2, key)) {
      const newValue = object2[key];
      
      return {
        action: 'added',
        key,
        newValue,
      };
    }
    if (_.isPlainObject(object1[key]) && _.isPlainObject(object2[key])) {
      return {
        action: 'nested',
        key,
        children: getDifferentObject(object1[key], object2[key]),
      };
    }
    if (!_.isEqual(object1[key], object2[key])) {
      const oldValue = object1[key];
      const newValue = object2[key];
      return {
        action: 'changed',
        key,
        oldValue,
        newValue,
      };
    }
    const oldValue = object1[key];
    return {
      action: 'unchanged',
      key,
      oldValue,
    };
  })
);

export default getDifferentObject;
