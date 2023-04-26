import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { PATHNAME } from '@/shared/constants'
import { checkChainID, convertToFormalAddress, getAddress, requestSign } from '@/shared/plugins'
import { fetchAuthToken, fetchUserNonce, setLocalStorage } from '@/shared/services'

export const useLoginForm = () => {
  const navigate = useNavigate()
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const [userWalletAddress, setUserWalletAddress] = useState<string>(
    'Waiting Your Wallet Address...',
  )

  const connectToWallet = useCallback(async () => {
    await checkChainID()
    const address = await getAddress()
    setUserWalletAddress(address)
  }, [])

  const getUserNonce = useCallback(
    async (userWalletAddress: string) => {
      const { nonce } = await fetchUserNonce({
        publicAddress: userWalletAddress,
      })

      return nonce
    },
    [userWalletAddress],
  )

  const getAuthToken = useCallback(async (userWalletAddress: string, signature: string) => {
    const { data } = await fetchAuthToken({
      signature,
      publicAddress: userWalletAddress,
    })

    return data.access_token
  }, [])

  const handleLogin = useCallback(async () => {
    if (isClicked) {
      return
    }

    try {
      setIsClicked(true)

      const nonce = await getUserNonce(userWalletAddress)
      const signature = await requestSign(nonce)
      const authToken = await getAuthToken(userWalletAddress, signature)

      setLocalStorage('token', authToken)
      setLocalStorage('loginAddress', convertToFormalAddress(userWalletAddress))

      setIsClicked(false)

      navigate(PATHNAME.NFT)
    } catch (e) {
      setIsClicked(false)
      throw e
    }
  }, [userWalletAddress, isClicked])

  return {
    handleLogin,
    isClicked,
    userWalletAddress,
    connectToWallet,
  }
}
