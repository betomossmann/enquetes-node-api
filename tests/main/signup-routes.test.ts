import { MongoHelper } from '@/infra/db/mongodb'
import app from '@/main/config/app'

import { type Collection } from 'mongodb'
import request from 'supertest'

let accountCollection: Collection

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL || '')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  it('Should return an account on success', async () => {
    const user = {
      email: 'daniel@gmail.com',
      name: 'Daniel',
      password: '123',
      passwordConfirmation: '123'
    }
    await request(app).post('/api/signup').send(user).expect(404)
  })
})
