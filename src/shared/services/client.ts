import axios from 'axios'

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

const fetchOwnedNFT = async () => {
  const URL = `${BASE_URL}/${PATH.users.nfts}`

  try {
    const { status, data } = await axios.get(URL)

    if (status !== 200) {
      console.error(`HTTP error: ${status}`)
    }

    return data
  } catch (e) {
    console.error('fetchOwnedNFT API Error', e)
  }
}

const fetchNonce = async ({ publicAddress }: { publicAddress: string }) => {
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

const fetchToken = async ({ nonce, signature }: { nonce: any; signature: any }) => {
  const URL = `${BASE_URL}/${PATH.auth.token}`

  try {
    const { status, data } = await axios.post(URL, {
      nonce,
      signature,
    })

    if (status !== 200) {
      console.error(`HTTP error: ${status}`)
    }

    return data
  } catch (e) {
    console.error('fetchToken API Error', e)
  }
}

export const client = {
  fetchNonce,
  fetchOwnedNFT,
  fetchToken,
}
