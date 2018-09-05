import camelCase from 'lodash.camelcase';

var namespacer = '/';

export default (function (type) {
  return type.indexOf(namespacer) === -1 ? camelCase(type) : type.split(namespacer).map(function (part) {
    return camelCase(part);
  }).join(namespacer);
});