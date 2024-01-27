import { type Encrypter } from '@/data/protocols/cryptography'
import { type AccountModel } from '@/domain/models'
import { type AddAccountModel } from '@/domain/usecases'

export class DbAddAccount {
  constructor(private readonly encrypter: Encrypter) {}

  async add(account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)
    return new Promise((resolve) => {
      resolve(null)
    })
  }
}
