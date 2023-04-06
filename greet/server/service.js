const protobuffer = require('../proto/greet_pb')
const { setTimeout } = require('timers/promises')

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
    res.setGreetings(`Hello ${request.getFirstName()}! - ${i + 1}`)
    call.write(res)
  }

  call.end()
}

exports.longGreet = async (call, callback) => {
  console.log('LongGreet was invoked')
  const names = []
  for await (const greetRequest of call) {
    names.push(greetRequest.getFirstName())
  }

  const greeting = `Hello ${names.join(', ')}! :D`

  console.log(greeting)
  callback(null, new protobuffer.GreetResponse().setGreetings(greeting))
}

exports.greetEveryone = async call => {
  console.log('GreetEveryone was invoked')
  for await (const greetRequest of call) {
    const greting = `Hello, ${greetRequest.getFirstName()}!`
    console.log(greting)
    call.write(new protobuffer.GreetResponse().setGreetings(greting))
  }

  console.log('GreetEveryone was finished')
  call.end()
}

exports.greetWithDeadline = async (call, callback) => {
  console.log('GreetWithDeadline was invoked')
 for (let i = 0; i < 3; i++) {
    if (call.cancelled) {
      console.log('Call was cancelled')
      return
    }
    console.log(`Waiting... ${i + 1}`)
    await setTimeout(1000)
 }

  const res = new protobuffer.GreetResponse().setGreetings(
    `Hello ${call.request.getFirstName()}!`
  )

  callback(null, res)
}
