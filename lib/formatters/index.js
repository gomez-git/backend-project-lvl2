import formStylish from './stylish.js';
import formPlain from './plain.js';

export default (format, data) => {
  switch (format) {
    case 'plain':
      return formPlain(data);
    case 'json':
      return JSON.stringify(data);
    default:
      return formStylish(data);
  }
};
