import { adaptRoute } from '@/main/adapters'
import { makeSignupController } from '@/main/factories'

import { type Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignupController()))
}
