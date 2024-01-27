import { EmailValidatorAdapter } from '@/infra/validators'

import validator from 'validator'
import { describe, expect, it, vi } from 'vitest'

vi.mock('validator', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...(actual as object),
    isEmail(): boolean {
      return true
    }
  }
})

describe('EmailValidator Adapter', () => {
  it('Should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter()
    vi.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email@mail.com')
    expect(isValid).toBe(false)
  })

  it('Should return true if validator returns true', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('valid_email@mail.com')
    expect(isValid).toBe(true)
  })

  it('Should call validator with correct email', () => {
    const sut = new EmailValidatorAdapter()
    const isEmailSpy = vi.spyOn(validator, 'isEmail')
    sut.isValid('any_email@mail.com')
    expect(isEmailSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
