# jt400 [![Dependency Status](https://david-dm.org/patriksimek/jt400.png)](https://david-dm.org/patriksimek/jt400) [![NPM version](https://badge.fury.io/js/jt400.png)](http://badge.fury.io/js/jt400)

[![NPM](https://nodei.co/npm/jt400.png)](https://nodei.co/npm/jt400/)


========

Download [jt400.jar](http://sourceforge.net/projects/jt400/) and copy in your path.

More info: [http://jt400.sourceforge.net/](http://jt400.sourceforge.net/)

# Install
    npm install jt400

# app.js
    var db = require('jt400');
    
    var config = {
        libpath: __dirname + '/jt400.jar',
        drivername: 'com.ibm.as400.access.AS400JDBCDriver',
        url: 'jdbc:as400://127.0.0.1/myDatabase;user=myUser;password=myPassword'
    };
    
    db.initialize(config);
    
    db.execute('SELECT * FROM users');
    
    db.on('execute', function(error, results){
        if( error ){
            console.log(error);
        }
        else{
            console.log( results );
        }
    });

# Run
    node app.js

Based on [https://npmjs.org/package/jdbc](https://npmjs.org/package/jdbc)