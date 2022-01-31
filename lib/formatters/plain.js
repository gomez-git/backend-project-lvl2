export default (data) => {
  const displayInnerObject = (obj) => {
    if (obj instanceof Object) {
      return '[complex value]';
    }
    return typeof obj === 'string' ? `'${obj}'` : `${obj}`;
  };

  const displayObject = (coll, ancestry = '') => {
    if (!(coll instanceof Object)) {
      return [];
    }

    const lines = coll.flatMap((obj) => {
      const { key, status, value } = obj;
      const currentAncestry = `${ancestry}.${key}`;
      const string = `Property '${currentAncestry.slice(1)}' was`;
      if (status === 'unchanged') {
        return displayObject(value, currentAncestry);
      }
      if (status === 'changed') {
        const { oldValue, newValue } = obj;
        return `${string} updated. From ${displayInnerObject(oldValue)} to ${displayInnerObject(newValue)}`;
      }
      const text = status === 'added'
        ? `added with value: ${displayInnerObject(value)}`
        : 'removed';

      return `${string} ${text}`;
    });

    return [...lines].join('\n');
  };

  return displayObject(data);
};
