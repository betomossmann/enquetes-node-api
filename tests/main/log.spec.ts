import { LogControllerDecorator } from '@/main/decorators'
import { type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'

describe('LogController Decorator', () => {
  it('Should call controller handle', async () => {
    class ControllerStub implements Controller {
      async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const httpResponse: HttpResponse = {
          body: {
            name: 'any_name'
          },
          statusCode: 200
        }
        return new Promise(resolve => {
          resolve(httpResponse)
        })
      }
    }
    const controllerStub = new ControllerStub()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const sut = new LogControllerDecorator(controllerStub)
    const httpRequest = {
      body: {
        email: 'any_email',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
})
