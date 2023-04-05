const protobuffer = require('../proto/greet_pb')

exports.greet = function (call, callback) {
  console.log('Greet was invoked')
  const { request } = call
  const response = new protobuffer.GreetResponse().setGreetings(
    `Hello ${request.getFirstName()}!`
  )

  callback(null, response)
}
