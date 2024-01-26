import { ServerError } from '@/presentation/errors'
import { type HttpResponse } from '@/presentation/protocols'

export const badRequest = (error: Error): HttpResponse => ({
  body: error,
  statusCode: 400
})

export const serverError = (): HttpResponse => ({
  body: new ServerError(),
  statusCode: 500
})
