type ValidError = 'invalid' | 'same' | 'different'

export const VALID_ERROR: Record<ValidError, string> = {
  invalid: 'Invalid Address',
  same: 'Same Address',
  different: 'Message sender different',
}
