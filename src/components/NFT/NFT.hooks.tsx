import { useQuery } from '@tanstack/react-query'

import { fetchUserOwnedNFT } from '@/shared/services'
import { NFTItemType, TokenInfo } from '@/shared/types'
import { protocolReplacer } from '@/shared/utils'

// 임시로 데이터를 셋팅해서 사용
const mockDataList: NFTItemType[] = [
  {
    name: 'name1',
    tokenId: 1234,
    title: 'title',
    img: '',
    contractAddress: '0x43D366919EED58B777B98ff21d25B74cdF9A29Dc',
  },
  {
    name: 'name2',
    tokenId: 1235,
    title: 'title',
    img: '',
    contractAddress: '0x43D366919EED58B777B98ff21d25B74cdF9A29Dc',
  },
  {
    name: 'name3',
    tokenId: 1236,
    title: 'title',
    img: '',
    contractAddress: '0x43D366919EED58B777B98ff21d25B74cdF9A29Dc',
  },
]

export const useNFT = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['ownedNFT'],
    queryFn: fetchUserOwnedNFT,
  })

  const myTokenData: TokenInfo[] = data?.data.ownedNfts
  const NFTItemList: NFTItemType[] = myTokenData?.map(({ metadata, title, tokenId, contract }) => ({
    name: metadata?.name ? metadata.name : '',
    img: protocolReplacer(metadata?.image ? metadata.image : ''),
    title,
    tokenId,
    contractAddress: contract?.address,
  }))

  return {
    NFTItemList,
    isLoading,
  }
}
