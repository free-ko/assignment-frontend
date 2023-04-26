import { ethers } from 'ethers'

import { GOERLI_CHAIN_ID } from '@/shared/constants'

const ethereum = window.ethereum

export const isAddress = (address: string) => ethers.utils.isAddress(address)

export const convertToFormalAddress = (address: string) => ethers.utils.getAddress(address)

export const createBytesMsg = (msg: string) => ethers.utils.toUtf8Bytes(msg)

export const checkChainId = async () => {
  if (ethereum) {
    const _ethereum = window.ethereum as any
    await _ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: GOERLI_CHAIN_ID }],
    })
  }
}

export const getAddress = async () => {
  if (ethereum) {
    const _ethereum = ethereum as any
    const [account] = await _ethereum.request({ method: 'eth_requestAccounts' })
    console.log('Connected account:', account)

    return account
  } else {
    throw new Error('E404')
  }
}

export const signing = async (msg: string) => {
  console.log('signing msg = ', msg)

  if (ethereum) {
    const _ethereum = ethereum as any
    const bytesMsg = createBytesMsg(msg)

    return await _ethereum.request({
      method: 'personal_sign',
      params: [_ethereum.selectedAddress, ethers.utils.hexlify(bytesMsg)],
    })
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

  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, [sendFrom], signer)

    return await contract.transferFrom(await signer.getAddress(), recipientAddress, tokenId)
  }
}
