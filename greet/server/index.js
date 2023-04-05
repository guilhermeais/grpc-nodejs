const grpc = require('@grpc/grpc-js')

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

  grpcServer.bindAsync(address, credentials, (err, _) => {
    if (err) {
      console.error(err)

      return cleanup(server)
    }

    grpcServer.start()
  })

  console.log(`Listening on ${address}`)
}

main();