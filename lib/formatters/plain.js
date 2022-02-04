import _ from 'lodash';

const formatInnerObject = (obj) => {
  if (_.isObject(obj)) {
    return '[complex value]';
  }

  return typeof obj === 'string' ? `'${obj}'` : `${obj}`;
};

const buildLine = (value, currentAncestry, status) => {
  if (status === 'unchanged') {
    return [];
  }

  const beginOfLine = `Property '${currentAncestry.slice(1)}' was`;
  const endOfLine = {
    added: `added with value: ${formatInnerObject(value)}`,
    deleted: 'removed',
    changed: `updated. From ${formatInnerObject(value.oldValue)} to ${formatInnerObject(value.newValue)}`,
  };

  return `${beginOfLine} ${endOfLine[status]}`;
};

const formatDiffTree = (tree, ancestry = '') => tree
  .flatMap((node) => {
    const {
      name, status, value, children,
    } = node;
    const currentAncestry = `${ancestry}.${name}`;
    const currentValue = status === 'nested' ? children : value;

    return status === 'nested'
      ? formatDiffTree(currentValue, currentAncestry, status)
      : buildLine(currentValue, currentAncestry, status);
  })
  .join('\n');

export default formatDiffTree;
