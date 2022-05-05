import formStylish from './stylish.js';
import formPlain from './plain.js';

export default (data, format, replacer) => {
  switch (format) {
    case 'plain':
      return formPlain(data);
    case 'json':
      return JSON.stringify(data, null, replacer);
    default:
      return formStylish(data, 0, replacer);
  }
};
