const displayInnerObject = (obj) => {
  if (obj instanceof Object) {
    return '[complex value]';
  }
  return typeof obj === 'string' ? `'${obj}'` : `${obj}`;
};

const buildLine = (value, currentAncestry, status) => {
  const beginOfLine = `Property '${currentAncestry.slice(1)}' was`;
  const endOfLine = {
    added: `added with value: ${displayInnerObject(value)}`,
    deleted: 'removed',
    changed: `updated. From ${displayInnerObject(value.oldValue)} to ${displayInnerObject(value.newValue)}`,
  };
  return `${beginOfLine} ${endOfLine[status]}`;
};

const displayTree = (tree, ancestry = '', nodeType = 'parent') => {
  if (nodeType === 'child') {
    return [];
  }

  const lines = tree.flatMap((node) => {
    const {
      name, type, status, value, children,
    } = node;
    const currentAncestry = `${ancestry}.${name}`;
    const currentValue = type === 'parent' ? children : value;

    return type === 'parent' || status === 'unchanged'
      ? displayTree(currentValue, currentAncestry, type)
      : buildLine(value, currentAncestry, status);
  });

  return [...lines].join('\n');
};

export default displayTree;
