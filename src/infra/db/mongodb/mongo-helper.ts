import { type Collection, MongoClient, ObjectId } from 'mongodb'

export const MongoHelper = {
  assign: <T>(collection: any): T => {
    const { _id, ...rest } = collection
    return Object.assign({}, rest, { id: _id })
  },
  client: null as MongoClient,

  async connect(uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
  },

  async disconnect(): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async getCollection(name: string): Promise<Collection> {
    if (!this.client) {
      await MongoHelper.connect(this.uri)
    }
    return this.client.db().collection(name)
  },

  map: <T>(collections: any[]): T[] => collections.map((collection) => MongoHelper.assign<T>(collection)),

  objectId: (id?: string): ObjectId => new ObjectId(id),

  uri: null as string
}
