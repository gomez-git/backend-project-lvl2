import stylish from './stylish.js';
import plain from './plain.js';

export default (format, data) => {
  switch (format) {
    case 'plain':
      return plain(data);
    default:
      return stylish(data);
  }
};
