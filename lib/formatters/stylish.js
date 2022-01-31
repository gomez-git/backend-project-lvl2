export default (data) => {
  const displayInnerObject = (obj, depth, replacer = '    ') => {
    if (!(obj instanceof Object)) {
      return obj;
    }

    const currentIndent = `${replacer.repeat(depth)}`;
    const bracketIndent = `${replacer.repeat(depth - 1)}}`;
    const lines = Object
      .entries(obj)
      .map(([key, value]) => (
        `${currentIndent}${key}: ${displayInnerObject(value, depth + 1)}`
      ));

    return ['{', ...lines, bracketIndent].join('\n');
  };

  const displayObject = (coll, depth = 1, replacer = '    ') => {
    if (!(coll instanceof Object)) {
      return coll;
    }

    const currentIndent = replacer.repeat(depth - 1);
    const lines = coll.flatMap((obj) => {
      const { key, status, value } = obj;
      if (status === 'unchanged') {
        return `${currentIndent}    ${key}: ${displayObject(value, depth + 1)}`;
      }
      if (status === 'changed') {
        const { oldValue, newValue } = obj;
        return [
          `${currentIndent}  - ${key}: ${displayInnerObject(oldValue, depth + 1)}`,
          `${currentIndent}  + ${key}: ${displayInnerObject(newValue, depth + 1)}`,
        ];
      }
      const operator = status === 'added' ? '+' : '-';

      return `${currentIndent}  ${operator} ${key}: ${displayInnerObject(value, depth + 1)}`;
    });

    return ['{', ...lines, `${currentIndent}}`].join('\n');
  };

  return displayObject(data);
};
