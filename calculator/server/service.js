const protobuffer = require('../proto/sum_pb')

exports.sum = function (call, callback) {
  console.log('Sum was invoked')
  const { request } = call
  const { firstNumber, secondNumber } = request.toObject()
  const response = new protobuffer.SumResponse().setResult(
    (firstNumber || 0) + (secondNumber || 0)
  )

  callback(null, response)
}
