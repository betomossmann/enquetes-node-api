import app from '@/main/config/app'

import Request from 'supertest'

describe('Body Parser Middleware', () => {
  it('Should parse body as json', () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })
    return Request(app)
      .post('/test_body_parser')
      .send({ name: 'any_name' })
      .expect({ name: 'any_name' })
  })
})
