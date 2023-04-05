const { SumResponse } = require('../proto/sum_pb')
const { FactorResponse } = require('../proto/factor_pb')

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
