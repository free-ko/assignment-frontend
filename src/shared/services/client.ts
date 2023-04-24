import axios from 'axios'

const BASE_URL = 'https://lrvalrdo8k.execute-api.us-east-1.amazonaws.com/Prod'

const getNonce = async ({ publicAddress }: { publicAddress: string }) => {
  const URL = `${BASE_URL}/users/nonce?publicAddress=${publicAddress}`

  try {
    const { status, data } = await axios.get(URL)

    if (status !== 200) {
      console.error(`HTTP error: ${status}`)
    }

    return data
  } catch (e) {
    console.error('getNonce API Error', e)
  }
}

const getToken = async ({ nonce, signature }: { nonce: any; signature: any }) => {
  const URL = `${BASE_URL}/auth/token`

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
    console.error('getToken API Error', e)
  }
}

const getOwnedNFT = async () => {
  const URL = `${BASE_URL}/users/nfts`

  try {
    const { status, data } = await axios.get(URL)

    if (status !== 200) {
      console.error(`HTTP error: ${status}`)
    }

    return data
  } catch (e) {
    console.error('getNonce API Error', e)
  }
}

export const client = {
  getNonce,
  getToken,
  getOwnedNFT,
}
