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
