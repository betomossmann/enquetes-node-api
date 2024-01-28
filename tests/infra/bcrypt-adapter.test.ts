import { BcryptAdapter } from '@/infra/cryptography/'

import bcrypt from 'bcrypt'
import { describe, expect, it, vi } from 'vitest'

vi.mock('bcrypt', () => {
  return {
    default: {
      hash(): string {
        return 'hash'
      }
    }
  }
})

const salt = 12

const makeSut = (): BcryptAdapter => new BcryptAdapter(salt)

describe('Bcrypt Adapter', () => {
  it('Should call bcrypt with correct values', async () => {
    const sut = makeSut()
    const hashSpy = vi.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  it('Should return a valid hash on hash success', async () => {
    const sut = makeSut()
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hash')
  })
})
