import { type Encrypter } from '@/data/protocols/cryptography'
import { type AddAccountRepository } from '@/data/protocols/db/account'
import { type AccountModel } from '@/domain/models'
import { type AddAccountModel } from '@/domain/usecases'

export class DbAddAccount {
  constructor (private readonly encrypter: Encrypter, private readonly addAccountRepository: AddAccountRepository) {}

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    const account = await this.addAccountRepository.add({ ...accountData, password: hashedPassword })
    return account
  }
}
