import yaml from 'js-yaml';

export default (extention, data) => {
  switch (extention) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
    case '.yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unknown extention: '${extention}'!`);
  }
};
