import DefaultImg from '@/assets/img_default.png'
import { useSelectItem } from '@/shared/stores'
import { NFTItemType } from '@/shared/types'

const Styled = {
  wrapper: (isSelected: boolean) =>
    `flex flex-col justify-center items-center w-full h-180 rounded-md border-2 border-solid ${
      isSelected ? 'border-gray-600' : 'border-teal-400'
    } p-2`,
  img: 'w-20 h-20 rounded-md',
  text: 'text-sm',
}

export const NFTItem = ({ name, title, tokenId, img, contractAddress }: NFTItemType) => {
  const { selectedItem, setSelectItem } = useSelectItem()
  const isSelected = selectedItem.tokenId === tokenId

  const handleClick = () => {
    setSelectItem({
      img,
      name,
      title,
      tokenId,
      contractAddress,
    })
  }

  return (
    <div key={tokenId} className={Styled.wrapper(isSelected)} onClick={handleClick}>
      <img
        src={img}
        alt="NFT-Image"
        className={Styled.img}
        onError={({ currentTarget }) => (currentTarget.src = DefaultImg)}
      />
      <span className={Styled.text}>{title}</span>
      <span className={Styled.text}>{tokenId}</span>
    </div>
  )
}
