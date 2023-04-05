const grpc = require('@grpc/grpc-js')
const service = require('./service')
const { GreetServiceService } = require('../proto/greet_grpc_pb')

const address = 'localhost:50051'

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

function main() {
  const grpcServer = new grpc.Server()
  const credentials = grpc.ServerCredentials.createInsecure()

  process.on('SIGINT', () => {
    console.log('Caught interrupt signal')
    cleanup(grpcServer)
  })

  grpcServer.addService(GreetServiceService, service)

  grpcServer.bindAsync(address, credentials, (err, _) => {
    if (err) {
      console.error(err)

      return cleanup(server)
    }

    grpcServer.start()
  })

  console.log(`Listening on ${address}`)
}

main()
