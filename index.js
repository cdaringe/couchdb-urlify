'use strict';
var url = require('url');

var couchdbUrlify = function(str) {
    var conn = url.parse(str);
    var urlSansPathname;
    if (!conn.pathname) {
        throw new ReferenceError('url has no pathname');
    }

    // restore potentially modified pathname (url does some encoding)
    delete conn.pathname;
    conn.pathname = str.substr(url.format(conn).length);

    // remove leading '/' for db name mutation
    if (conn.pathname.charAt(0) === '/') {
        conn.pathname = conn.pathname.substr(1);
    }
    conn.pathname = '/' + conn.pathname
        .replace(/[^/a-z0-9_$()+-]/gi, '')
        .replace('/', '%2F');
    return url.format(conn);
};

couchdbUrlify.assert = function(str, opts) {
    var compareUrl = couchdbUrlify(str);
    if (str !== compareUrl) {
        if (opts.silent) {
            return false
        }
        throw new Error(
            'couchdb input url invalid. provided: ' + str +
            ', expects: ' + compareUrl + '.  See ' +
            'https://wiki.apache.org/couchdb/HTTP_database_API' +
            '#Naming_and_Addressing'
        );
    }
    return true;
};

couchdbUrlify.validate = function(str) {
    return couchdbUrlify.assert(str, {silent: true });
}

module.exports = couchdbUrlify;
