// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var sum_pb = require('./sum_pb.js');
var factor_pb = require('./factor_pb.js');

function serialize_calculator_FactorRequest(arg) {
  if (!(arg instanceof factor_pb.FactorRequest)) {
    throw new Error('Expected argument of type calculator.FactorRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_FactorRequest(buffer_arg) {
  return factor_pb.FactorRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_FactorResponse(arg) {
  if (!(arg instanceof factor_pb.FactorResponse)) {
    throw new Error('Expected argument of type calculator.FactorResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_FactorResponse(buffer_arg) {
  return factor_pb.FactorResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_SumRequest(arg) {
  if (!(arg instanceof sum_pb.SumRequest)) {
    throw new Error('Expected argument of type calculator.SumRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_SumRequest(buffer_arg) {
  return sum_pb.SumRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_SumResponse(arg) {
  if (!(arg instanceof sum_pb.SumResponse)) {
    throw new Error('Expected argument of type calculator.SumResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_SumResponse(buffer_arg) {
  return sum_pb.SumResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var CalculatorService = exports.CalculatorService = {
  sum: {
    path: '/calculator.Calculator/Sum',
    requestStream: false,
    responseStream: false,
    requestType: sum_pb.SumRequest,
    responseType: sum_pb.SumResponse,
    requestSerialize: serialize_calculator_SumRequest,
    requestDeserialize: deserialize_calculator_SumRequest,
    responseSerialize: serialize_calculator_SumResponse,
    responseDeserialize: deserialize_calculator_SumResponse,
  },
  getFactors: {
    path: '/calculator.Calculator/GetFactors',
    requestStream: false,
    responseStream: true,
    requestType: factor_pb.FactorRequest,
    responseType: factor_pb.FactorResponse,
    requestSerialize: serialize_calculator_FactorRequest,
    requestDeserialize: deserialize_calculator_FactorRequest,
    responseSerialize: serialize_calculator_FactorResponse,
    responseDeserialize: deserialize_calculator_FactorResponse,
  },
};

exports.CalculatorClient = grpc.makeGenericClientConstructor(CalculatorService);
