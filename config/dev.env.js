'use strict'
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    // API_URL : '"http://localhost:10001"',
    API_URL : '"https://ec2-13-250-40-240.ap-southeast-1.compute.amazonaws.com"',
});
