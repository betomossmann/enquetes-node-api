import { type LogErrorRepository } from '@/data/protocols/db/account'
import { MongoHelper } from '@/infra/db/mongodb'

export class LogMongoRepository implements LogErrorRepository {
  log: (stack: string) => Promise<void>
  async logError(stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.insertOne({
      data: new Date(),
      stack
    })
  }
}
