type ValidError = 'empty' | 'invalid' | 'same' | 'different'

export const VALID_ERROR: Record<ValidError, string> = {
  empty: 'Empty Address',
  invalid: 'Invalid Address',
  same: 'Same Address',
  different: 'Message sender different',
}
