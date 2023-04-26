import { useCallback } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/design'
import { useValidateInput } from '@/shared/hooks'
import { sendEncodedNFT } from '@/shared/plugins'
import { useSelectItem } from '@/shared/stores'

const Styled = {
  input:
    'w-full border-slate-800 border-solid border-b-2 bg-transparent text-black placeholder:text-gray-500',
  button: 'w-full h-8',
  error: 'text-red-500 break-all',
  gap: 'mt-4',
}

const NTFSendForm = () => {
  const { selectedItem } = useSelectItem()
  const { register, getValues } = useForm()
  const { isValid, errorMessage } = useValidateInput()

  const sendNFT = useCallback(
    async (recipient: string) => {
      if (!(await isValid(recipient))) return

      if (selectedItem) {
        const { contractAddress, tokenId } = selectedItem
        await sendEncodedNFT(tokenId, recipient, contractAddress)
      }
    },
    [selectedItem],
  )

  const handleSendFormSubmit = (e: any) => {
    e.preventDefault()
    const recipientValue = getValues('recipient')

    void sendNFT(recipientValue)
  }

  return (
    <form onSubmit={handleSendFormSubmit}>
      <input
        className={Styled.input}
        placeholder={'Recipient Address'}
        {...register('recipient')}
      />
      {!!errorMessage && <h5 className={Styled.error}>{errorMessage}</h5>}
      <div className={Styled.gap} />
      <Button text="Send" type="submit" size="lg" className={Styled.button} />
    </form>
  )
}

export default NTFSendForm
