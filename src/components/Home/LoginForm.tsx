import { Button } from '@/components/design'

import { useLoginForm } from './LoginForm.hooks'
import { Styled } from './LoginForm.styled'

const LoginForm = () => {
  const { handleLogin, isClicked, userWalletAddress, connectToWallet } = useLoginForm()

  return (
    <div className={Styled.wrapper}>
      <h3 className={Styled.title}>{userWalletAddress}</h3>
      <div className={Styled.gap4} />
      <div className={Styled.buttonWrapper}>
        <Button
          size="lg"
          text="Connect"
          theme="Filled"
          className={Styled.button}
          onClick={connectToWallet}
        />
        <div className={Styled.gap2} />
        <Button
          size="lg"
          onClick={handleLogin}
          className={Styled.button}
          text={isClicked ? 'Loading' : 'Login'}
        />
      </div>
    </div>
  )
}

export default LoginForm
