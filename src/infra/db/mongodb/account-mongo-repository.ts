import { type AddAccountRepository } from '@/data/protocols/db/account'
import { type AccountModel } from '@/domain/models'
import { type AddAccountModel } from '@/domain/usecases'

import { MongoHelper } from './mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    return {
      email: accountData.email,
      id: result.insertedId.toString(),
      name: accountData.name,
      password: accountData.password
    }
  }
}
