const grpc = require('@grpc/grpc-js')
const { CalculatorService } = require('../proto/calculator_grpc_pb')
const service = require('./service')
/**
 *
 * @param {grpc.Server} server
 */
function cleanup(server) {
  if (server) {
    server.forceShutdown()
  }

  process.exit(0)
}

 function createServer() {
  const grpcServer = new grpc.Server()

  process.on('SIGINT', () => {
    console.log('Caught interrupt signal')
    cleanup(grpcServer)
  })

  grpcServer.addService(CalculatorService, service)

  return grpcServer
}

module.exports = {
  createServer,
  cleanup
}