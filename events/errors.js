var utils = require('../include/utils').utils;

var Errors = {
    dberror: function(c){
        c.write('Backend Databse Error\n');
        c.end();
    }
}

exports.Errors = Errors;