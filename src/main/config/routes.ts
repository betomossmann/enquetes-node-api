import { type Express, Router } from 'express'
import { readdirSync } from 'fs'
import { join } from 'path'

export default async (app: Express): Promise<void> => {
  const router = Router()
  app.use('/api', router)

  const files = readdirSync(join(__dirname, '../routes'))

  for (const file of files) {
    if (!file.endsWith('.map')) {
      try {
        const route = await import(`../routes/${file}`)
        route.default(router)
      } catch (e) {
        // Handle any exceptions here, such as logging the error
        console.error(`Failed to import route ${file}:`, e)
      }
    }
  }
}
