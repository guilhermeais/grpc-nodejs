// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var blog_pb = require('./blog_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

function serialize_google_protobuf_Empty(arg) {
  if (!(arg instanceof google_protobuf_empty_pb.Empty)) {
    throw new Error('Expected argument of type google.protobuf.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_google_protobuf_Empty(buffer_arg) {
  return google_protobuf_empty_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_post_Post(arg) {
  if (!(arg instanceof blog_pb.Post)) {
    throw new Error('Expected argument of type post.Post');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_post_Post(buffer_arg) {
  return blog_pb.Post.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_post_PostId(arg) {
  if (!(arg instanceof blog_pb.PostId)) {
    throw new Error('Expected argument of type post.PostId');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_post_PostId(buffer_arg) {
  return blog_pb.PostId.deserializeBinary(new Uint8Array(buffer_arg));
}


var BlogServiceService = exports.BlogServiceService = {
  createPost: {
    path: '/post.BlogService/CreatePost',
    requestStream: false,
    responseStream: false,
    requestType: blog_pb.Post,
    responseType: blog_pb.PostId,
    requestSerialize: serialize_post_Post,
    requestDeserialize: deserialize_post_Post,
    responseSerialize: serialize_post_PostId,
    responseDeserialize: deserialize_post_PostId,
  },
  readPost: {
    path: '/post.BlogService/ReadPost',
    requestStream: false,
    responseStream: false,
    requestType: blog_pb.PostId,
    responseType: blog_pb.Post,
    requestSerialize: serialize_post_PostId,
    requestDeserialize: deserialize_post_PostId,
    responseSerialize: serialize_post_Post,
    responseDeserialize: deserialize_post_Post,
  },
  updatePost: {
    path: '/post.BlogService/UpdatePost',
    requestStream: false,
    responseStream: false,
    requestType: blog_pb.Post,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_post_Post,
    requestDeserialize: deserialize_post_Post,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  deletePost: {
    path: '/post.BlogService/DeletePost',
    requestStream: false,
    responseStream: false,
    requestType: blog_pb.PostId,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_post_PostId,
    requestDeserialize: deserialize_post_PostId,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  listAllPost: {
    path: '/post.BlogService/ListAllPost',
    requestStream: false,
    responseStream: true,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: blog_pb.Post,
    requestSerialize: serialize_google_protobuf_Empty,
    requestDeserialize: deserialize_google_protobuf_Empty,
    responseSerialize: serialize_post_Post,
    responseDeserialize: deserialize_post_Post,
  },
};

exports.BlogServiceClient = grpc.makeGenericClientConstructor(BlogServiceService);
