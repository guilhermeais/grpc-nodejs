const grpc = require('@grpc/grpc-js')
const { createServer, cleanup } = require('./server')
const { mongoClient } = require('./mongo')

const server = createServer()
async function main() {
  await mongoClient.connect()
  console.log('Connected to MongoDB!')

  const address = 'localhost:50051'

  const credentials = grpc.ServerCredentials.createInsecure()

  server.bindAsync(address, credentials, (err, _) => {
    if (err) {
      console.error(err)

      return cleanup(server)
    }

    server.start()
  })

  console.log(`Listening on ${address}`)
}

process.on('uncaughtException', function (err) {
  console.error(err)
  cleanup(server)
})

process.on('unhandledRejection', function (err) {
  console.error(err)
  cleanup(server)
})

main().catch(err => cleanup(server))
