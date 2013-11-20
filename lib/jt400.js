var EventEmitter = require('events').EventEmitter;
var java = require('java');
var sys = require('sys');
var S = require('string');

function JDBCConn() {
    EventEmitter.call(this);
    this._config = {};
    this._conn = null;
}

sys.inherits(JDBCConn, EventEmitter);

JDBCConn.prototype.initialize = function (config) {
    var self = this;
    self._config = config;

    java.classpath.push(self._config.libpath);
    java.newInstance(self._config.drivername, function (err, driver) {

        if (err) {
            throw new Error(err);
        } else {
            java.callStaticMethod('java.sql.DriverManager', 'registerDriver', driver, function (registerDriverError, result) {

                if (registerDriverError) {
                    self.emit('init', registerDriverError, null);
                } else {
                    self.emit('init', null, self._config.drivername);
                }
            });
        }
    });
};

JDBCConn.prototype.open = function () {
    var self = this;

    java.callStaticMethod('java.sql.DriverManager', 'getConnection', self._config.url, function (getConnectionError, conn) {
        if (getConnectionError) {
            self.emit('open', getConnectionError, null);
        } else {
            self._conn = conn;
            self.emit('open', null, conn);
        }
    });

};

JDBCConn.prototype.close = function () {
    var self = this;
    this._conn.close(function (closeError, result) {
        if (closeError) {
            self.emit('close', closeError, null);
        } else {
            self.emit('close', null, result);
        }
    });
};

JDBCConn.prototype.execute = function (sql) {
    var self = this;

    java.callStaticMethod('java.sql.DriverManager', 'getConnection', self._config.url, function (getConnectionError, conn) {
        if (getConnectionError) {
            self.emit('execute', getConnectionError, null);
        } else {

            conn.createStatement(function (createStatementError, statement) {
                if (createStatementError) {
                    self.emit('execute', createStatementError, null);
                    console.log(createStatementError);
                }
                else {
                    statement.executeQuery(sql, function (executeQueryError, resultset) {
                        if (executeQueryError) {
                            self.emit('execute', executeQueryError, null);
                            console.log(executeQueryError);
                        }
                        else {
                            resultset.getMetaData(function (getMetaDataError, rsmd) {
                                if (getMetaDataError) {
                                    self.emit('execute', getMetaDataError, null);
                                    console.log(getMetaDataError);
                                }
                                else {

                                    var cc = rsmd.getColumnCountSync();
                                    var results = [];
                                    var next = resultset.nextSync();

                                    while (next) {
                                        var row = {};

                                        for (var i = 1; i <= cc; i++) {
                                            var colname = rsmd.getColumnNameSync(i);


                                            var item = resultset.getStringSync(i);

                                            if (!S(item).isEmpty()) {
                                                row[colname] = S(item).trim().s
                                            }
                                            else {
                                                row[colname] = '';
                                            }


                                        }
                                        results.push(row);
                                        next = resultset.nextSync();
                                    }
                                    self.emit('execute', null, results);
                                }

                            });
                        }
                    });
                }

            });
        }
    });
};

module.exports = new JDBCConn();
