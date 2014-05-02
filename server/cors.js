'use strict';
//================================================================================
// Properties
//================================================================================
var defaults = {
    domains: ['*'],
    methods: 'GET,HEAD,PUT,POST,DELETE,OPTIONS',
    headers: 'Content-Type, Authorization, Content-Length, X-Requested-With'
};

//================================================================================
// Functions
//================================================================================
function cors(options, req, res, next) {
    var allowedDomains = options.domains;

    if(allowedDomains.indexOf('*') !== -1 || allowedDomains.indexOf(req.headers.origin) !== -1) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Methods', options.methods);
        res.header('Access-Control-Allow-Headers', options.headers);
    }

    if(req.method === 'OPTIONS') {
        res.send(204); //'No Content' Response Code
    } else {
        next();
    }
}

//================================================================================
// Module
//================================================================================
module.exports = function(options) {
    //set defaults if no options were passed in
    if(!options) {
        options = {};
    }

    if(options.domains === undefined) {
        options.domains = defaults.domains;
    } else if (typeof options.domains === 'string') {
        options.domains = [options.domains];
    }

    if(options.methods === undefined) {
        options.methods = defaults.methods;
    }

    if(options.headers === undefined) {
        options.headers = defaults.headers;
    }

    return function(req, res, next) {
        cors(options, req, res, next);
    };
};