import { ChangeEvent, forwardRef } from 'react'

interface IInputProps {
  error?: string
  inputValue?: string
  placeholder: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

const Styled = {
  wrapper:
    'relative w-full h-full border-gray-50 border-solid border-b-2 placeholder:text-gray-500',
  input: 'w-full h-full bg-transparent border-0 border-gray-50 border-solid',
}

const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ error, inputValue, placeholder, onChange }, ref) => {
    return (
      <div className={Styled.wrapper}>
        <input
          ref={ref}
          type="text"
          value={inputValue}
          onChange={onChange}
          placeholder={placeholder}
          className={Styled.input}
        />
        {error && <div className="absolute">{error}</div>}
      </div>
    )
  },
)

export default Input
