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

  const displayObject = (coll, depth, replacer = '    ') => {
    if (!(coll instanceof Object)) {
      return coll;
    }

    const currentIndent = replacer.repeat(depth - 1);
    const lines = coll.flatMap(([{ key, status, value }]) => {
      if (status === 'unchanged') {
        return `${currentIndent}    ${key}: ${displayObject(value, depth + 1)}`;
      }
      if (status === 'changed') {
        const [removed, added] = value;
        return [
          `${currentIndent}  - ${key}: ${displayInnerObject(removed, depth + 1)}`,
          `${currentIndent}  + ${key}: ${displayInnerObject(added, depth + 1)}`,
        ];
      }
      const operator = status === 'added' ? '+' : '-';

      return `${currentIndent}  ${operator} ${key}: ${displayInnerObject(value, depth + 1)}`;
    });

    return ['{', ...lines, `${currentIndent}}`].join('\n');
  };

  return displayObject(data, 1);
};
