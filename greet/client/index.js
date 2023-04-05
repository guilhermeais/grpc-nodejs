const grpc = require('@grpc/grpc-js')
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

async function doGreetManyTimes(client) {
  const request = new GreetRequest()
  request.setFirstName('Guilherme')

  const stream = client.greetManyTimes(request)

  const data = []
  for await (const response of stream) {
    data.push(response.getGreetings())
  }

  return data
}

async function doLongGreet(client) {
  const names = ['Guilherme', 'Pedro', 'Maria', 'João', 'Ana']

  return new Promise((resolve, reject) => {
    const longGreetStream = client.longGreet((err, res) => {
      if (err) {
        reject(err)
      }

      resolve(res.getGreetings())
    })

    names.map(name => {
      longGreetStream.write(new GreetRequest().setFirstName(name))
    })

    longGreetStream.end()
  })
}

async function main() {
  const credentails = grpc.ChannelCredentials.createInsecure()
  const client = new GreetServiceClient('localhost:50051', credentails)

  // const greetResponse = await doGreetManyTimes(client)
  // console.log(`[Greet]: `, greetResponse)

  const longGreetResponse = await doLongGreet(client)

  console.log(`[LongGreet]: `, longGreetResponse)
  client.close()
}

main()
