import { type Encrypter } from '@/data/protocols/cryptography'

import bcrypt from 'bcrypt'

export class BcryptAdapter implements Encrypter {
  constructor (private readonly salt: number) {}

  async encrypt (plaintext: string): Promise<string> {
    const hash = await bcrypt.hash(plaintext, this.salt)
    return hash
  }
}
