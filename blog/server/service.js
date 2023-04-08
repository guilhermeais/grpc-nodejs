const PostGRPCAdaptar = require('./entities/post-grpc-adapter')
const { mongoClient } = require('./mongo')
const grpcErrors = require('./utils/grpc-errors')
const { PostId } = require('../proto/blog_pb')

const collection = mongoClient.db('blog').collection('posts')

exports.createPost = async (call, callback) => {
  const post = PostGRPCAdaptar.toPost(call.request)

  try {
    const { acknowledged, insertedId } = await collection.insertOne(post)

    if (!acknowledged) {
      return grpcErrors.notAcknowledged(null, callback)
    }

    const postId = new PostId().setId(insertedId.toString())

    return callback(null, postId)
  } catch (error) {
    return grpcErrors.internal(error, callback)
  }
}

exports.listAllPost = async (call, callback) => {
  try {
    console.log('listAllPost called')
    const postsStream = collection.find().stream()

    for await (const post of postsStream) {
      const postGRPC = PostGRPCAdaptar.toGRPCPost(post)

      call.write(postGRPC)
    }

    call.end()
  } catch (error) {
    console.log(error)
    return grpcErrors.internal(error, callback)
  }
}
