import axios from 'axios'

import { getLocalStorage } from '@/shared/services/localStorage'

const BASE_URL = 'https://lrvalrdo8k.execute-api.us-east-1.amazonaws.com/Prod'
const PATH = {
  users: {
    nonce: 'users/nonce',
    nfts: 'users/nfts',
  },
  auth: {
    token: 'auth/token',
  },
}

export const fetchUserOwnedNFT = async () => {
  const URL = `${BASE_URL}/${PATH.users.nfts}`

  try {
    const accessToken = getLocalStorage('token')

    const { status, data } = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (status !== 200) {
      console.error(`HTTP error: ${status}`)
    }

    return data
  } catch (e) {
    console.error('fetchOwnedNFT API Error', e)
  }
}

export const fetchUserNonce = async ({ publicAddress }: { publicAddress: string }) => {
  const URL = `${BASE_URL}/${PATH.users.nonce}`

  try {
    const { status, data } = await axios.get(URL, {
      params: {
        publicAddress,
      },
    })

    if (status !== 200) {
      console.error(`HTTP error: ${status}`)
    }

    return data
  } catch (e) {
    console.error('fetchNonce API Error', e)
  }
}

// nonce와 signature를 받지 않고, publicAddress, signature 받음
export const fetchAuthToken = async ({
  publicAddress,
  signature,
}: {
  publicAddress: string
  signature: string
}) => {
  const URL = `${BASE_URL}/${PATH.auth.token}`

  try {
    const { status, data } = await axios.post(URL, {
      publicAddress,
      signature,
    })

    if (status !== 200) {
      console.error(`HTTP error: ${status}`)
    }

    return data
  } catch (e) {
    console.error('fetchAuthToken API Error', e)
  }
}
