const PostGRPCAdaptar = require('./entities/post-grpc-adapter')
const { mongoClient } = require('./mongo')
const collection = mongoClient.db('blog').collection('posts')
const grpcErrors = require('./utils/grpc-errors')
const { PostId } = require('../proto/blog_pb')

exports.createPost = async (call, callback) => {
  const post = PostGRPCAdaptar.toPost(call.request)

  try {
    const { acknowledged, insertedId } = await collection.insertOne(post)

    if (!acknowledged) {
      return grpcErrors.notAcknowledged(null, callback)
    }

    const postId = new PostId().setId(insertedId.toString())

    return callback(null, postId);
  } catch (error) {
    return grpcErrors.internal(error, callback)
  }
}
