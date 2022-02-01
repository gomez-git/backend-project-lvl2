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

const buildLine = (f, name, status, value, depth, replacer = '    ') => {
  const currentIndent = replacer.repeat(depth - 1);
  const operators = {
    added: '+',
    deleted: '-',
    unchanged: ' ',
  };

  return `${currentIndent}  ${operators[status]} ${name}: ${f(value, depth + 1)}`;
};

const displayTree = (tree, depth = 1, nodeType = 'parent', replacer = '    ') => {
  if (nodeType === 'child') {
    return tree;
  }

  const bracketIndent = `${replacer.repeat(depth - 1)}}`;

  const lines = tree.flatMap((node) => {
    const {
      name, type, status, value, children,
    } = node;
    const func = type === 'parent' ? displayTree : displayInnerObject;
    const currentValue = type === 'parent' ? children : value;

    return status === 'changed'
      ? [
        buildLine(func, name, 'deleted', value.oldValue, depth),
        buildLine(func, name, 'added', value.newValue, depth),
      ]
      : buildLine(func, name, status, currentValue, depth);
  });

  return ['{', ...lines, bracketIndent].join('\n');
};

export default displayTree;
