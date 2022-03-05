import _ from 'lodash';

const formatInnerObject = (obj, depth, replacer = '    ') => {
  if (!_.isPlainObject(obj)) {
    return Array.isArray(obj) ? `[${obj}]` : obj;
  }

  const currentIndent = `${replacer.repeat(depth)}`;
  const bracketIndent = `${replacer.repeat(depth - 1)}}`;
  const lines = Object
    .entries(obj)
    .map(([key, value]) => (
      `${currentIndent}${key}: ${formatInnerObject(value, depth + 1)}`
    ));

  return ['{', ...lines, bracketIndent].join('\n');
};

const buildLine = (f, name, status, value, depth, replacer = '    ') => {
  const currentIndent = replacer.repeat(depth - 1);
  const operators = {
    added: '+',
    deleted: '-',
    nested: ' ',
    unchanged: ' ',
  };

  return status === 'changed'
    ? [
      `${currentIndent}  ${operators.deleted} ${name}: ${f(value.oldValue, depth + 1)}`,
      `${currentIndent}  ${operators.added} ${name}: ${f(value.newValue, depth + 1)}`,
    ]
    : `${currentIndent}  ${operators[status]} ${name}: ${f(value, depth + 1)}`;
};

const formatDiffTree = (tree, depth = 1, replacer = '    ') => {
  const bracketIndent = `${replacer.repeat(depth - 1)}}`;

  const lines = tree.flatMap((node) => {
    const {
      name, status, value, children,
    } = node;
    const func = status === 'nested' ? formatDiffTree : formatInnerObject;
    const currentValue = status === 'nested' ? children : value;

    return buildLine(func, name, status, currentValue, depth);
  });

  return ['{', ...lines, bracketIndent].join('\n');
};

export default formatDiffTree;
