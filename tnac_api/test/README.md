Prequisties:
-----------

* [nodejs] (http://nodejs.org/)
* [npm] (http://npmjs.org/): now it comes with node installer (at least for mac)
* [vows] (http://vowsjs.org/)

Install:
-------

- Go to the root of the repo (where package.json lives)
- run the install command on the current folder:
    
    $ npm install -g vows
    $ npm install

Run:
---

run individual tests, for example:

    $ vows tnac-api-test.js

or run all the tests:

    $ vows *-test.js

