import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers'
import { type Controller, type HttpRequest } from '@/presentation/protocols'

export class SignUpController implements Controller {
  handle(httpRequest: HttpRequest): any {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
