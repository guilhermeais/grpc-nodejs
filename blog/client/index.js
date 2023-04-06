const grpc = require('@grpc/grpc-js')
const { BlogClient } = require('../proto/blog_grpc_pb')

async function main() {
  const credentails = grpc.ChannelCredentials.createInsecure()
  const client = new BlogClient('localhost:50051', credentails)

  client.close()
}

main()
