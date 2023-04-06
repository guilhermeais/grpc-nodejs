const grpc = require('@grpc/grpc-js')
const { CalculatorClient } = require('../proto/calculator_grpc_pb')
const { SumRequest } = require('../proto/sum_pb')
const { FactorRequest } = require('../proto/factor_pb')
const { AvgRequest } = require('../proto/avg_pb')
const { MaxRequest } = require('../proto/max_pb')
const { SqrtRequest } = require('../proto/sqrt_pb')

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

async function getFactors(client, { numberToFactor }) {
  const request = new FactorRequest()
  request.setNumberToFactor(numberToFactor)

  const streamOfFactors = client.getFactors(request)

  const factors = []

  for await (const iterator of streamOfFactors) {
    factors.push(iterator.getNumber())
  }

  return factors
}

function getAvg(client) {
  const numbers = [1, 2, 3, 4]

  return new Promise((resolve, reject) => {
    const writable = client.getAvg((err, response) => {
      if (err) {
        return reject(err)
      }

      resolve(response.getNumber())
    })

    numbers.map(number => writable.write(new AvgRequest().setNumber(number)))

    writable.end()
  })
}

async function getMax(client) {
  const numbers = [1, 5, 3, 6, 2, 20]

  return new Promise((resolve, reject) => {
    const duplex = client.getMax()

    let max = 0
    duplex.on('data', res => {
      const actualNumber = res.getNumber()
      if (max !== actualNumber) {
        console.log(`max number changed: ${actualNumber}`)
      }
      max = res.getNumber()
    })

    duplex.on('end', () => {
      resolve(max)
    })

    numbers.map(number => {
      console.log(`sending number: ${number}`)
      duplex.write(new MaxRequest().setNumber(number))
    })

    duplex.end()
  })
}

async function getSqrt(client, number) {
  const request = new SqrtRequest().setNumber(number)

  return new Promise((resolve, reject) => {
    client.getSqrt(request, (err, response) => {
      if (err) {
        reject(err)
      } else {
        resolve(response.getResult())
      }
    })
  })
}

async function main() {
  const credentails = grpc.ChannelCredentials.createInsecure()
  const client = new CalculatorClient('localhost:50051', credentails)

  // const sumResponse = await sum(client, {
  //   firstNumber: 10,
  //   secondNumber: 2000,
  // })
  // console.log(`[Sum]: `, sumResponse.getResult())

  // const factors = await getFactors(client, {
  //   numberToFactor: 100,
  // })

  // console.log(`[Factors]: `, factors)

  // const avgResponse = await getAvg(client)

  // console.log(`[Avg]: `, avgResponse)

  // const max = await getMax(client)
  // console.log(`[Max]: `, max)
  try {
    await getSqrt(client, -100)
  } catch (error) {
    console.log(error)
  }

  const sqrtResponse = await getSqrt(client, 100)

  console.log(`[Sqrt]: `, sqrtResponse)

  client.close()
}

main()
