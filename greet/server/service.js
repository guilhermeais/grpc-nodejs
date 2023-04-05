const protobuffer = require('../proto/greet_pb')

exports.greet = function (call, callback) {
  console.log('Greet was invoked')
  const { request } = call
  const response = new protobuffer.GreetResponse().setGreetings(
    `Hello ${request.getFirstName()}!`
  )

  callback(null, response)
}

exports.greetManyTimes = (call, _) => {
  console.log('GreetManyTimes was invoked')
  const { request } = call
  const res = new protobuffer.GreetResponse()

  for (let i = 0; i < 10; i++) {
    res.setGreetings(`Hello ${request.getFirstName()}! - ${i+1}`)
    call.write(res)
  }

  call.end()
}
