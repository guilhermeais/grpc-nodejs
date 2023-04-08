const grpc = require('@grpc/grpc-js');

exports.internal = (error, callback) => callback({
  code : grpc.status.INTERNAL,
  message : error?.message || 'Internal server error',
});

exports.notAcknowledged = (error, callback) => callback({
  code : grpc.status.INTERNAL,
  message : error?.message || 'Operation not acknowledged',
});