import { useState } from 'react'

import { VALID_ERROR } from '@/shared/constants'
import { convertToFormalAddress, getAddress, isAddress } from '@/shared/plugins'
import { getLocalStorage } from '@/shared/services'

export const useValidateInput = () => {
  const [errorMessage, setErrorMessage] = useState<string>('')

  const isValid = async (address: string) => {
    try {
      const currentAddress = await getAddress()
      const inputAddress = convertToFormalAddress(address)
      const loginAddress = getLocalStorage('loginAddress') as string

      if (loginAddress === inputAddress) {
        throw new Error(VALID_ERROR.same)
      }

      if (convertToFormalAddress(currentAddress) !== convertToFormalAddress(loginAddress)) {
        throw new Error(VALID_ERROR.different)
      }

      return isAddress(address)
    } catch (e: any) {
      setErrorMessage(e.message)
      throw e
    }
  }

  return {
    isValid,
    errorMessage,
  }
}
