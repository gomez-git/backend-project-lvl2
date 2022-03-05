import _ from 'lodash';

const formatInnerObject = (obj) => {
  switch (true) {
    case _.isPlainObject(obj) || Array.isArray(obj):
      return '[complex value]';
    case typeof obj === 'string':
      return `'${obj}'`;
    default:
      return obj;
  }
};

const buildLine = (value, ancestry, status) => {
  if (status === 'unchanged') {
    return [];
  }

  const f = formatInnerObject;
  const beginOfLine = `Property '${ancestry.slice(1)}' was`;
  const endOfLine = {
    added: `added with value: ${f(value)}`,
    deleted: 'removed',
    changed: `updated. From ${f(value.oldValue)} to ${f(value.newValue)}`,
  };

  return `${beginOfLine} ${endOfLine[status]}`;
};

const formatDiffTree = (tree, ancestry = '') => tree
  .flatMap((node) => {
    const {
      name, status, value, children,
    } = node;
    const currentAncestry = `${ancestry}.${name}`;

    return status === 'nested'
      ? formatDiffTree(children, currentAncestry)
      : buildLine(value, currentAncestry, status);
  })
  .join('\n');

export default formatDiffTree;
