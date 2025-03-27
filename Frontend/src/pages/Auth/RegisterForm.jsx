import React from 'react'
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  IconButton, 
  InputAdornment,
  TextField,
  Typography
} from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import FacebookIcon from '@mui/icons-material/Facebook'
import { Link } from 'react-router-dom'
import { signup } from '../../apis/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';



const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    if (!username.trim() || !email.trim() || !password.trim()) {
      setError('Username and email and password are required!');
      setLoading(false);
      return;
    }
    try {
      const data = await signup(username, email, password);
      localStorage.setItem('token', data.access_token);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  return (
    <Container component="main" maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper
        stroke="black"
        sx={{
          p: 5,
          borderRadius: 12,
          width: '100%',
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.3)'
        }}>
        <Typography variant="h4" component="h1" gutterBottom textAlign="center">
                Sign Up Free
        </Typography>

        <Box component="form" noValidate sx={{ mt: 2 }} onSubmit={handleSubmit}>

          {/* Username */}
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!error && !username.trim()}
          />

          {/* Email */}
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error && !email.trim()}
          />

          {/* Password */}
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            margin="normal"
            placeholder="Enter your password"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Confirm Password */}
          <TextField 
            fullWidth label="Confirm Password" 
            type={showPassword ? 'text' : 'password'} 
            variant="outlined" 
            margin="normal" 
            placeholder="Confirm your password"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }
            }}
          />

          {/* Terms & Conditions */}
          <FormControlLabel control={<Checkbox color="success" />} label="I agree to the Terms and Conditions" sx={{ display: 'flex', justifyContent: 'center', width: '100%' }} />

          {/* Register Button */}
          <Button type="submit" fullWidth variant="contained" color="success" sx={{ mt: 2, py: 1.5 }}>
                    Register
          </Button>
        </Box>

        {/* Divider */}
        <Divider sx={{ my: 3 }} color='black'></Divider>

        {/* Login Link */}
        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Already have an account?{' '}
          <Typography
            component={Link} // Bọc Link trong Typography
            to="/Login"
            color="primary"
            sx={{ fontWeight: 'bold', textDecoration: 'none', cursor: 'pointer' }}
          >
            Login
          </Typography>
        </Typography>
      </Paper>
    </Container>
  )
}

export default RegisterForm