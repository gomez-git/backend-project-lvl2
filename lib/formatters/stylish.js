import _ from 'lodash';

const formatInnerObject = (obj, depth, replacer) => {
  if (!_.isPlainObject(obj)) {
    return Array.isArray(obj) ? `[${obj}]` : obj;
  }

  const currentIndent = replacer.repeat(depth + 1);
  const bracketIndent = `${replacer.repeat(depth)}}`;
  const lines = Object.entries(obj)
    .map(([key, value]) => (
      `${currentIndent}${key}: ${formatInnerObject(value, depth + 1, replacer)}`
    ));

  return ['{', ...lines, bracketIndent].join('\n');
};

const buildLine = (f, name, status, value, depth, replacer) => {
  const currentIndent = replacer.repeat(depth).slice(2);
  const { oldValue, newValue } = value;
  const operators = {
    added: '+',
    deleted: '-',
    nested: ' ',
    unchanged: ' ',
  };

  return status === 'changed'
    ? `${currentIndent}${operators.deleted} ${name}: ${f(oldValue, depth, replacer)}\n`
    + `${currentIndent}${operators.added} ${name}: ${f(newValue, depth, replacer)}`
    : `${currentIndent}${operators[status]} ${name}: ${f(value, depth, replacer)}`;
};

const formatDiffTree = (tree, depth, replacer) => {
  const bracketIndent = `${replacer.repeat(depth)}}`;

  const lines = tree.map((node) => {
    const {
      name, status, value, children,
    } = node;
    const func = status === 'nested' ? formatDiffTree : formatInnerObject;
    const currentValue = status === 'nested' ? children : value;

    return buildLine(func, name, status, currentValue, depth + 1, replacer);
  });

  return ['{', ...lines, bracketIndent].join('\n');
};

export default formatDiffTree;
