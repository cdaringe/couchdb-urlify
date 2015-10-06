# couchdb-urlify
Convert, assert, or validate URLs to ensure that they are compatible with couchdb!
Does the above tasks according to the [CouchDB rules](https://wiki.apache.org/couchdb/HTTP_database_API#Naming_and_Addressing)!

# install
`npm i --save couchdb-urlify`

# usage
`var couchdbUrlify = require('couchdb-urlify');`

## convert
```js
// invalid couchdb url is modified to be compliant
var url = 'https://couchfun.org:8080/bad . spaces_ and _%chars';
couchdbUrlify(url); //=> 'https://couchfun.org:8080/badspaces_and_chars'

// valid couchdb url is unmodified
var url = 'https://sub.my.domain.org/my-couch-db';
couchdbUrlify(url); //=> 'https://sub.my.domain.org/my-couch-db'
```

## assert
```js
// THROWS as input and output dont match
var url = 'https://info.com:1/bad . spaces_ and _%chars';
couchdbUrlify.assert(url); //=> throws

var url = 'https://sub.my.domain.org/my-couch-db';
couchdbUrlify.assert(url); //=> returns true
```

## validate
Same as `assert`, but doesn't throw. Returns _only_ `true` or `false`.  True when urls === each other, false they don't!
