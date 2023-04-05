const grpc = require('@grpc/grpc-js')
const {createServer, cleanup} = require('./server')
const server = createServer()

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