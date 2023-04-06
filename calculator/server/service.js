const { SumResponse } = require('../proto/sum_pb')
const { AvgResponse } = require('../proto/avg_pb')
const { FactorResponse } = require('../proto/factor_pb')
const { MaxResponse } = require('../proto/max_pb')
const { SqrtResponse } = require('../proto/sqrt_pb')

const grpc = require('@grpc/grpc-js')

exports.sum = function (call, callback) {
  console.log('Sum was invoked')
  const { request } = call
  const { firstNumber, secondNumber } = request.toObject()
  const response = new SumResponse().setResult(
    (firstNumber || 0) + (secondNumber || 0)
  )

  callback(null, response)
}

function* getFactor(numberToFactor) {
  let k = 2

  while (numberToFactor > 1) {
    if (numberToFactor % k === 0) {
      numberToFactor /= k
      yield k
    } else {
      k += 1
    }
  }
}

exports.getFactors = function (call) {
  console.log('GetFactors was invoked')
  const { request } = call

  const { numberToFactor } = request.toObject()

  const response = new FactorResponse()

  for (const factor of getFactor(numberToFactor)) {
    response.setNumber(factor)
    call.write(response)
  }

  call.end()
}

exports.getAvg = async function (call, callback) {
  console.log('GetAvg was invoked')

  let total = 0
  let count = 0

  for await (const number of call) {
    count++
    total += parseInt(number?.getNumber() || 0)
  }

  callback(null, new AvgResponse().setNumber(total / count))
}

exports.getMax = function (call) {
  console.log('GetMax was invoked')

  let max = 0

  call.on('data', request => {
    const number = parseInt(request?.getNumber() || 0)

    if (number > max) {
      max = number
    }

    call.write(new MaxResponse().setNumber(max))
  })

  call.on('end', () => {
    call.end()
  })
}

exports.getSqrt = function (call, callback) {
  console.log('GetSqrt was invoked')

  const { request } = call
  const number = request.getNumber() || 0

  if (number < 0) {
    callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: `Number must be positive, received: ${number}`,
    })
    return
  }

  const response = new SqrtResponse().setResult(Math.sqrt(number))

  callback(null, response)
}
