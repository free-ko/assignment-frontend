import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { NFTItemType } from '@/shared/types'

type SelectItemStore = {
  selectedItem: NFTItemType
  setSelectItem: (item: NFTItemType) => void
}

export const useSelectItem = create(
  devtools<SelectItemStore>(set => ({
    selectedItem: {
      name: '',
      tokenId: 0,
      title: '',
      img: '',
      contractAddress: '',
    },
    setSelectItem: (item: NFTItemType) => set({ selectedItem: item }),
  })),
)
