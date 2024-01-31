import { adaptRoute } from '@/main/adapters'
import { makeSignUpController } from '@/main/factories'

import { type Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
}
