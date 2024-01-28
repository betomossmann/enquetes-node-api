import { BcryptAdapter } from '@/infra/cryptography/'

import bcrypt from 'bcryptjs'
import { describe, expect, it, vi } from 'vitest'

describe('Bcrypt Adapter', () => {
  it('Should call bcrypt with correct values', async () => {
    const sut = new BcryptAdapter(12)
    const hashSpy = vi.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', 12)
  })
})
