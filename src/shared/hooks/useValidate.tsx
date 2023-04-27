import { useState } from 'react'

import { VALID_ERROR } from '@/shared/constants'
import { convertToFormalAddress, isValidAddress } from '@/shared/plugins'
import { getLocalStorage } from '@/shared/services'

export const useValidateInput = () => {
  const [errorMessage, setErrorMessage] = useState<string>('')

  const isValid = async (inputAddress: string) => {
    if (!inputAddress) {
      setErrorMessage(VALID_ERROR.empty)

      return false
    }

    if (!isValidAddress(inputAddress)) {
      setErrorMessage(VALID_ERROR.invalid)

      return false
    }

    const loginAddress = getLocalStorage('loginAddress') as string
    const inputAddressByCheckSum = convertToFormalAddress(inputAddress)
    if (inputAddressByCheckSum === loginAddress) {
      setErrorMessage(VALID_ERROR.same)

      return false
    }

    return true
  }

  return {
    isValid,
    errorMessage,
  }
}
