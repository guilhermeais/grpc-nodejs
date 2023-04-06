const grpc = require('@grpc/grpc-js')
const { BlogService } = require('../proto/blog_grpc_pb')
const service = require('./service')
const { mongoClient } = require('./mongo')

/**
 *
 * @param {grpc.Server} server
 */
async function cleanup(server) {
  if (server) {
    await mongoClient.close()
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

  // grpcServer.addService(BlogService, service)

  return grpcServer
}

module.exports = {
  createServer,
  cleanup,
}
