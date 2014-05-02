'use strict';
//================================================================================
// Module
//================================================================================
module.exports = function(err, req, res, next) {
    console.log('**************************************************');
    console.log('global error:', err);
    console.log('stack trace:', err.stack);
    console.log('**************************************************');
    var errorResponse = {
        error: err.message || err
    };
    res.send(errorResponse);
};