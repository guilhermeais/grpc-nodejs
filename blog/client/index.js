const grpc = require('@grpc/grpc-js')
const { BlogServiceClient } = require('../proto/blog_grpc_pb')
const { Post } = require('../proto/blog_pb')
const { Empty } = require('google-protobuf/google/protobuf/empty_pb')

function createPost(client) {
  return new Promise(function (resolve, reject) {
    const request = new Post()
      .setAuthorName('Guilherme')
      .setTitle('My first post!')
      .setContent('Hello world!')

    client.createPost(request, function (error, response) {
      if (error) {
        reject(error)
      } else {
        resolve(response.getId())
      }
    })
  })
}

function listPosts(client) {
  return new Promise(function (resolve, reject) {
    const call = client.listAllPost(new Empty())

    const posts = []

    call.on('data', function (post) {
      posts.push(post.toObject())
    })

    call.on('end', function () {
      resolve(posts)
    })

    call.on('error', function (error) {
      reject(error)
    })
  })
}

async function main() {
  const credentails = grpc.ChannelCredentials.createInsecure()
  const client = new BlogServiceClient('localhost:50051', credentails)

  const createdPostId = await createPost(client)
  console.log('Created post with id: ', createdPostId)

  const posts = await listPosts(client)

  console.log('Posts: ', posts)

  client.close()
}

main()
