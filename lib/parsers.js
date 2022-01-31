import yaml from 'js-yaml';

export default (extention, filename) => {
  switch (extention) {
    case '.json':
      return JSON.parse(filename);
    default:
      return yaml.load(filename);
  }
};
