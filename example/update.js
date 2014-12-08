var Database = require('jt400');
var database = new Database();

var config = {
  libpath: __dirname + '/jt400.jar',
  drivername: 'com.ibm.as400.access.AS400JDBCDriver',
  url: 'jdbc:as400://127.0.0.1/myDatabase;user=myUser;password=myPassword'
};

database.initialize(config);

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
