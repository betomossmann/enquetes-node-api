import { type HttpResponse } from '@/presentation/protocols'

export const badRequest = (error: Error): HttpResponse => ({
  body: error,
  statusCode: 400
})
