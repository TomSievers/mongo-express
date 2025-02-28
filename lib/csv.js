'use strict';

const flat = require('flat');
const csv = require('json2csv');
const { isPlainObject } = require('lodash');

const handleObject = function (data) {
  for (const x in data) {
    if(data[x] && data[x].constructor.name === 'Binary')
    {
      data[x] = data[x].buffer.toString('hex');
    } else if (isPlainObject(data[x])) {
      handleObject(data[x]);
    }
  }
};

module.exports = function (data) {
  for (let i = 0, ii = data.length; i < ii; i++) {
    const current = data[i];
    handleObject(current);
  }
  return csv({ data });
};
