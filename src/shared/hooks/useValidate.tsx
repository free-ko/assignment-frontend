import { useState } from 'react'

import { ERROR } from '@/shared/constants'
import { convertToFormalAddress, getAddress, isAddress } from '@/shared/plugins'
import { getLocalStorage } from '@/shared/services'

export const useValidateInput = () => {
  const [errorMessage, setErrorMessage] = useState<string>('')

  const isValid = async (address: string) => {
    try {
      const keys = Object.keys(ERROR)
      const currentAddress = await getAddress()
      const inputAddress = convertToFormalAddress(address)
      const loginAddress = getLocalStorage('loginAddress') as string

      if (loginAddress === inputAddress) {
        throw new Error(keys[1])
      }
      if (convertToFormalAddress(currentAddress) !== convertToFormalAddress(loginAddress)) {
        throw new Error(keys[2])
      }
      return isAddress(address)
    } catch (e: any) {
      const MSG = ERROR[e.message] ? ERROR[e.message] : e.message
      setErrorMessage(MSG)
      throw e
    }
  }

  return {
    isValid,
    errorMessage,
  }
}
