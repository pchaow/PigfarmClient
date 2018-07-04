'use strict'
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    // API_URL : '"http://localhost:10001"',
    API_URL : '"http://pigfarm.miix.local"',
});
