import yaml from 'js-yaml';
import parse from '@gomez-git/js-ini-parser';

export default (data, extention) => {
  switch (extention) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
    case '.yaml':
      return yaml.load(data);
    case '.ini':
      return parse(data);
    default:
      throw new Error(`Unknown extention: '${extention}'!`);
  }
};
