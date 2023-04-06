const { MongoClient } = require('mongodb')

const mongoUri = 'mongodb://root:root@localhost:27017/'
const mongoClient = new MongoClient(mongoUri, { useUnifiedTopology: true })

module.exports = {
  mongoClient
}
