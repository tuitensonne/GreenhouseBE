import { Box } from '@mui/material'
import { assets } from '../../assets/asset'
import LoginForm from './LoginForm.jsx'
import RegisterForm from './RegisterForm.jsx'
import { useLocation } from 'react-router-dom'

const Auth = () => {
  const location = useLocation()
  const isLogin = location.pathname === '/Login'
  const isRegister = location.pathname === '/Signup'

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Cột chứa LoginForm */}
      <Box
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `url(${assets.backgroundAuth})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {isLogin && <LoginForm />}
        {isRegister && <RegisterForm />}
      </Box>
    </Box>
  )
}

export default Auth
