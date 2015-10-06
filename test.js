'use strict';
var test = require('tape');
var couchurl = require('./index.js');
test('couchdb url', function(t) {
    var url_valid_1 = 'http://www.a.b.c.org:1234/my_-weird2()url$-+';
    var url_valid_2 = 'https://f.info/z';
    var url_valid_3 = 'https://sub.my.domain.org/my-couch-db';
    t.equal(couchurl(url_valid_1), url_valid_1, 'valid db urls match before + after');
    t.equal(couchurl(url_valid_2), url_valid_2, 'valid db urls match before + after, 2');
    t.equal(couchurl(url_valid_3), url_valid_3, 'valid db urls match before + after, 3');

    var url_invalid_1 = 'https://info.com:1/bad. _';
    var url_invalid_2 = 'https://info.com:1/bad . spaces_ and _%chars';
    t.notEqual(couchurl(url_invalid_1), url_invalid_1, 'invalid urls mutated to valid');
    t.equal(couchurl(url_invalid_1), 'https://info.com:1/bad_', 'invalid urls mutated predictably');
    t.equal(couchurl(url_invalid_2), 'https://info.com:1/badspaces_and_chars', 'invalid urls mutated predictably, 2');

    t.throws(function() {
        couchurl.assert(url_invalid_1);
    }, Error, 'errors on asserting and url in/out don\'t match');

    t.notOk(couchurl.validate(url_invalid_1), 'validate returns false on i/o mismatch');
    t.ok(couchurl.validate(url_valid_1), 'validate returns true on i/o mismatch');

    t.end();
});
