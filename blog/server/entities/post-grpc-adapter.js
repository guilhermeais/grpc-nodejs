const Post = require('./post')
const { Post: PostGRPC } = require('../../proto/blog_pb')
module.exports = class PostGRPCAdaptar {
  static toPost (grpcPost) {
    return new Post({
      authorName: grpcPost.getAuthorName(),
      content: grpcPost.getContent(),
      title: grpcPost.getTitle()
    })
  }

  static toGRPCPost (post) {
    return new PostGRPC()
      .setAuthorName(post.authorName)
      .setContent(post.content)
      .setTitle(post.title)
  }
}