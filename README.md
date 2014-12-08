# jt400 [![Dependency Status](https://david-dm.org/paulomcnally/jt400.js.png)](https://david-dm.org/paulomcnally/jt400.js) [![NPM version](https://badge.fury.io/js/jt400.png)](http://badge.fury.io/js/jt400)

[![NPM](https://nodei.co/npm/jt400.png)](https://nodei.co/npm/jt400/)

Download [jt400.jar](https://github.com/paulomcnally/jt400.js/raw/master/lib/jt400.jar) and copy in your path.

More info: [http://jt400.sourceforge.net/](http://jt400.sourceforge.net/)

# Install
    npm install jt400

# Custom config connection

* **Host**: 127.0.0.1
* **Database**: myDatabase
* **User**: myUser
* **Password**: myPassword

# app.js

    var Database = require('jt400');
    var database = new Database();

    var config = {
      libpath: __dirname + '/jt400.jar',
      drivername: 'com.ibm.as400.access.AS400JDBCDriver',
      url: 'jdbc:as400://127.0.0.1/myDatabase;user=myUser;password=myPassword'
    };

    database.initialize(config);

    // SELECT statements must be run with execute()
    database.execute('SELECT * FROM foo');

    database.on('execute', function(error, results) {
      if (error) {
        console.log(error);
      }
      else {
        console.log(results);
      }
    });

    //INSERT and UPDATE statements must be run with executeUpdate()
    database.executeUpdate('INSERT INTO foo (bar) VALUES ("bar")');

    database.on('executeUpdate', function(error, rowCount) {
      if (error) {
        console.log(error);
      }
      else {
        console.log(rowCount);
      }
    });


# Run
    node app.js

Based on [https://npmjs.org/package/jdbc](https://npmjs.org/package/jdbc)
