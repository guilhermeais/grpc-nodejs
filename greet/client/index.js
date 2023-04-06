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

function doGreetEveryone(client) {
  const names = ['Guilherme', 'Pedro', 'Maria', 'João', 'Ana']

  const stream = client.greetEveryone()
  stream.on('data', response => {
    console.log(`[GreetEveryone]: `, response.getGreetings())
  })

  names.forEach(name => stream.write(new GreetRequest().setFirstName(name)))
  stream.end()
}

async function doGreetWithDeadline(client, deadlineTimeMs) {
  const request = new GreetRequest()
  request.setFirstName('Guilherme')

  return new Promise((resolve, reject) => {
    const deadlineTime = Date.now() + deadlineTimeMs
    client.greetWithDeadline(
      request,
      { deadline: deadlineTime },
      (err, response) => {
        if (err) {
          reject(err)
        } else {
          resolve(response.getGreetings())
        }
      }
    )
  })
}

async function main() {
  const credentails = grpc.ChannelCredentials.createInsecure()
  const client = new GreetServiceClient('localhost:50051', credentails)

  // const greetResponse = await doGreetManyTimes(client)
  // console.log(`[Greet]: `, greetResponse)

  // const longGreetResponse = await doLongGreet(client)

  // console.log(`[LongGreet]: `, longGreetResponse)

  // const greetEveryoneResponse = doGreetEveryone(client)

  // console.log(`[GreetEveryone]: `, greetEveryoneResponse)

  const greetWithDeadlineResponse = await doGreetWithDeadline(client, 1000)

  console.log(`[GreetWithDeadline]: `, greetWithDeadlineResponse)
  client.close()
}

main()
