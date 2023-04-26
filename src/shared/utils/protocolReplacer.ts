export const protocolReplacer = (str: string) => {
  if (!str) {
    return ''
  }

  const uri = 'https://nftstorage.link/ipfs/'

  return str.replaceAll('ipfs://', uri).replaceAll('https://ipfs.io/ipfs/', uri)
}
