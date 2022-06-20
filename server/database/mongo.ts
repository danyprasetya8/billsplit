import mongodb from 'mongodb'

const { MongoClient } = require('mongodb')

type CachedDb = mongodb.Db | null

let cachedDb: CachedDb = null

const connectToDatabase: () => Promise<mongodb.Db> = async () => {
  if (cachedDb) return cachedDb

  const client: mongodb.MongoClient = await MongoClient.connect('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  cachedDb = client.db('billsplit')

  return cachedDb
}

export { connectToDatabase }
