export default (data) => {
  const displayInnerObject = (obj) => {
    if (obj instanceof Object) {
      return '[complex value]';
    }
    return typeof obj === 'string' ? `'${obj}'` : `${obj}`;
  };

  const displayObject = (coll, sequence = '') => {
    if (!(coll instanceof Object)) {
      return [];
    }

    const lines = coll.flatMap(([{ key, status, value }]) => {
      const paths = `${sequence}.${key}`;
      if (status === 'unchanged') {
        return displayObject(value, paths);
      }
      if (status === 'changed') {
        const [removed, added] = value;
        return `Property '${paths.slice(1)}' was updated. From ${displayInnerObject(removed)} to ${displayInnerObject(added)}`;
      }
      const text = status === 'added'
        ? `added with value: ${displayInnerObject(value)}`
        : 'removed';

      return `Property '${paths.slice(1)}' was ${text}`;
    });

    return [...lines].join('\n');
  };

  return displayObject(data);
};
