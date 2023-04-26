import { useNFT } from './NFT.hooks'
import { NFTItem } from './NFTItem'

const Styled = {
  wrapper: 'flex justify-center items-center gap-3',
}

const NFTList = () => {
  const { isLoading, NFTItemList } = useNFT()

  if (isLoading) {
    return (
      <div className={Styled.wrapper}>
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <div className={Styled.wrapper}>
      {NFTItemList.map(({ name, title, tokenId, img, contractAddress }) => (
        <NFTItem
          img={img}
          name={name}
          title={title}
          key={tokenId}
          tokenId={tokenId}
          contractAddress={contractAddress}
        />
      ))}
    </div>
  )
}

export default NFTList
