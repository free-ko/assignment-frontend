import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { LoginForm } from '@/components/Home'

const Home = () => {
  const navigate = useNavigate()
  const accessToken = localStorage.getItem('token')

  useEffect(() => {
    if (accessToken) {
      const tokenData = JSON.parse(atob(accessToken.split('.')[1]))
      const expiryTime = new Date(tokenData.exp * 1000)

      if (expiryTime > new Date()) {
        navigate('/nft')
      }
    }
  })

  return <LoginForm />
}
export default Home
