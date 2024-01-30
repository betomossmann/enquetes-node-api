import { type NextFunction, type Request, type Response } from 'express'

export const cors = (req: Request, res: Response, next: NextFunction): void => {
  const headers = {
    'access-control-allow-headers': '*',
    'access-control-allow-methods': '*',
    'access-control-allow-origin': '*'
  }
  Object.entries(headers).forEach(([key, value]) => res.set(key, value))
  next()
}
