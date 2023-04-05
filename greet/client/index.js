const grpc = require('@grpc/grpc-js');
const { GreetServiceClient } = require('../proto/greet_grpc_pb')
const { GreetRequest } = require('../proto/greet_pb')

/**
 * 
 * @param {grpc.ServiceClientConstructor} client 
 */
async function doGreet(client) {
  const request = new GreetRequest()
  request.setFirstName('Guilherme')

  return new Promise((resolve, reject) => {
    client.greet(request, (err, response) => {
      if (err) {
        reject(err)
      } else {
        resolve(response)
      }
    })
  })
}

async function main() {
  const credentails = grpc.ChannelCredentials.createInsecure()
  const client = new GreetServiceClient('localhost:50051', credentails)

  const greetResponse = await doGreet(client)
  console.log(
    `[Greet]: `, greetResponse.getGreetings()
  )
  client.close();
}

main();