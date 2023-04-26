import { NFTList, NFTSendForm } from '@/components/NFT'

const Styled = {
  wrapper: 'flex flex-col justify-center items-center w-screen h-screen flex flex-col items-center',
  gap: 'mt-4 mb-4',
}

const NFT = () => {
  return (
    <div className={Styled.wrapper}>
      <NFTList />
      <div className={Styled.gap} />
      <NFTSendForm />
    </div>
  )
}

export default NFT
