const grpc = require('@grpc/grpc-js')
const { CalculatorClient } = require('../proto/calculator_grpc_pb')
const { SumRequest } = require('../proto/sum_pb')

/**
 *
 * @param {grpc.ServiceClientConstructor} client
 */
async function sum(client, { firstNumber, secondNumber }) {
  const request = new SumRequest()
  .setFirstNumber(firstNumber)
  .setSecondNumber(secondNumber)

  return new Promise((resolve, reject) => {
    client.sum(request, (err, response) => {
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
  const client = new CalculatorClient('localhost:50051', credentails)

  const sumResponse = await sum(client, {
    firstNumber: 10,
    secondNumber: 2000
  })
  console.log(`[Sum]: `, sumResponse.getResult())
  client.close()
}

main()
