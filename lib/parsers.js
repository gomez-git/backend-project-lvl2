import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const validateValue = (value) => (
  !Number.isNaN(parseInt(value, 10))
    ? parseInt(value, 10)
    : value
);

const parseIniObject = (obj) => Object
  .entries(obj)
  .reduce((acc, [key, value]) => (
    _.isPlainObject(value)
      ? { ...acc, [key]: parseIniObject(value) }
      : { ...acc, [key]: validateValue(value) }
  ), {});

export default (data, extention) => {
  switch (extention) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
    case '.yaml':
      return yaml.load(data);
    case '.ini':
      return parseIniObject(ini.parse(data));
    default:
      throw new Error(`Unknown extention: '${extention}'!`);
  }
};
