import formStylish from './stylish.js';
import formPlain from './plain.js';
import formJson from './json.js';

export default (format, data) => {
  switch (format) {
    case 'plain':
      return formPlain(data);
    case 'json':
      return formJson(data);
    default:
      return formStylish(data);
  }
};
