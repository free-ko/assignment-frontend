import { ethers } from 'ethers'

import { GOERLI_CHAIN_ID, METHOD } from '@/shared/constants'

export const isAddress = (address: string) => ethers.utils.isAddress(address)

export const convertToFormalAddress = (address: string) => ethers.utils.getAddress(address)

export const createBytesMsg = (msg: string) => ethers.utils.toUtf8Bytes(msg)

export const checkChainID = async () => {
  if (window.ethereum) {
    try {
      const _ethereum = window.ethereum as any

      await _ethereum.request({
        method: METHOD.switchEthereumChainToWallet,
        params: [{ chainId: GOERLI_CHAIN_ID }],
      })
    } catch (e) {
      console.error('checkChainID', e)
    }
  }
}

export const getAddress = async () => {
  if (window.ethereum) {
    try {
      const _ethereum = window.ethereum as any
      const [account] = await _ethereum.request({ method: METHOD.requestAccount })
      console.log('Connected account:', account)

      return account
    } catch (e) {
      console.error('getAddress', e)
    }
  }
}

export const requestSign = async (msg: string) => {
  console.log('signing msg = ', msg)

  if (window.ethereum) {
    try {
      const _ethereum = window.ethereum as any
      const bytesMsg = createBytesMsg(msg)

      return await _ethereum.request({
        method: METHOD.requestSign,
        params: [_ethereum.selectedAddress, ethers.utils.hexlify(bytesMsg)],
      })
    } catch (e) {
      console.error('requestSign', e)
    }
  }
}

export const sendEncodedNFT = async (
  tokenId: number,
  contractAddress: string,
  recipientAddress: string,
) => {
  const sendFrom = {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'sendFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  }

  if (window.ethereum) {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, [sendFrom], signer)

      return await contract.transferFrom(await signer.getAddress(), recipientAddress, tokenId)
    } catch (e) {
      console.error('sendEncodedNFT', e)
    }
  }
}
