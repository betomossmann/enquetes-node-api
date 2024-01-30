import { type Encrypter } from '@/data/protocols/cryptography'
import { type AddAccountRepository } from '@/data/protocols/db/account'
import { DbAddAccount } from '@/data/usecases'
import { type AccountModel } from '@/domain/models'
import { type AddAccountModel } from '@/domain/usecases'

type SutTypes = {
  sut: DbAddAccount
  encryptStub: Encrypter
  addAccountRepositoryStub: AddAccountRepository
}

const makeFakeAccountData = (): AddAccountModel => ({
  email: 'valid_email@mail.com',
  name: 'valid_name',
  password: 'valid_password'
})

const makeFakeAccount = (): AccountModel => ({
  email: 'valid_email@mail.com',
  id: 'valid_id',
  name: 'valid_name',
  password: 'hashed_password'
})

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(account: AddAccountModel): Promise<AccountModel> {
      return new Promise(resolve => {
        resolve(makeFakeAccount())
      })
    }
  }
  return new AddAccountRepositoryStub()
}

const makeSut = (): SutTypes => {
  class EncrypterStub {
    async encrypt(value: string): Promise<string> {
      return new Promise(resolve => {
        resolve('hashed_password')
      })
    }
  }
  const encryptStub = new EncrypterStub()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const sut = new DbAddAccount(encryptStub, addAccountRepositoryStub)
  return {
    addAccountRepositoryStub,
    encryptStub,
    sut
  }
}

describe('DbAddAccount Usecase', () => {
  it('Should call Encrypter with correct password', async () => {
    const { sut, encryptStub } = makeSut()
    const encryptSpy = jest.spyOn(encryptStub, 'encrypt')
    await sut.add(makeFakeAccountData())
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  it('Should throw if Encrypter throws', async () => {
    const { sut, encryptStub } = makeSut()
    jest.spyOn(encryptStub, 'encrypt').mockReturnValueOnce(
      new Promise((resolve, reject) => {
        reject(new Error())
      })
    )
    const promise = sut.add(makeFakeAccountData())
    await expect(promise).rejects.toThrow()
  })

  it('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add(makeFakeAccountData())
    expect(addSpy).toHaveBeenCalledWith({
      email: 'valid_email@mail.com',
      name: 'valid_name',
      password: 'hashed_password'
    })
  })

  it('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(
      new Promise((resolve, reject) => {
        reject(new Error())
      })
    )
    const promise = sut.add(makeFakeAccountData())
    await expect(promise).rejects.toThrow()
  })

  it('Should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.add(makeFakeAccountData())
    expect(account).toEqual(makeFakeAccount())
  })
})
