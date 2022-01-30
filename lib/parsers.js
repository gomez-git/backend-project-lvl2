import yaml from 'js-yaml';

export default (extention) => {
  switch (extention) {
    case '.json':
      return (filename) => JSON.parse(filename);
    default:
      return (filename) => yaml.load(filename);
  }
};
