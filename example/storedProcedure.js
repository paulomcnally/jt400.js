var Database = require('jt400');
var database = new Database();

var config = {
  libpath: __dirname + '/jt400.jar',
  drivername: 'com.ibm.as400.access.AS400JDBCDriver',
  url: 'jdbc:as400://127.0.0.1/myDatabase;user=myUser;password=myPassword'
};

database.initialize(config);

//CALL stored procedure must use executeStoredProc()
// InOut parameters require a value to be provided
//  in the outputParameters object.  In this example
//  the first parameter is an InOut parameter, the
//  second is an Out parameter.  Do not provide a
//  value for Out parameters.
//
// Index values can be an int or a string, if it is
//  a string it must correspond to the column name in
//  the stored procedure.
//
// DataType must be one of integer values for jdbc sql types in
//  java.sql.Types.
var outputParameters = [
  {
    Index: 1,
    DataType: 1,
    Value: 'a'
  },
  {
    Index: 2,
    DataType: 1
  }
];

database.executeStoredProc("CALL FOO('BAR',?,?)", outputParameters);

database.on('executeStoredProc', function(error, results) {
  if (error) {
    console.log(error);
  }
  else {
    console.log(results);
  }
});
