import { type Encrypter } from '@/data/protocols/cryptography'
import { DbAddAccount } from '@/data/usecases'

import { describe, expect, it, vi } from 'vitest'

type SutTypes = {
  sut: DbAddAccount
  encryptStub: Encrypter
}

const makeSut = (): SutTypes => {
  class EncrypterStub {
    async encrypt(value: string): Promise<string> {
      return new Promise((resolve) => {
        resolve('hashed_password')
      })
    }
  }
  const encryptStub = new EncrypterStub()
  const sut = new DbAddAccount(encryptStub)
  return {
    encryptStub,
    sut
  }
}

describe('DbAddAccount Usecase', () => {
  it('Should call Encrypter with correct password', async () => {
    const { sut, encryptStub } = makeSut()
    const encryptSpy = vi.spyOn(encryptStub, 'encrypt')
    const accountData = {
      email: 'valid_email@mail.com',
      name: 'valid_name',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
