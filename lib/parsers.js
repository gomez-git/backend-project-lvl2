import yaml from 'js-yaml';

export default (extention, filename) => {
  switch (extention) {
    case '.json':
      return JSON.parse(filename);
    case '.yml':
    case '.yaml':
      return yaml.load(filename);
    default:
      throw new Error(`Unknown extention: '${extention}'!`);
  }
};
