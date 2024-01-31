import { DbAddAccount } from '@/data/usecases'
import { BcryptAdapter } from '@/infra/cryptography'
import { AccountMongoRepository, LogMongoRepository } from '@/infra/db/mongodb'
import { EmailValidatorAdapter } from '@/infra/validators'
import { LogControllerDecorator } from '@/main/decorators'
import { SignUpController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const addAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const signUpController = new SignUpController(emailValidatorAdapter, addAccount)
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
