import React from 'react'
import { TextField, Checkbox, FormControlLabel, Button, Typography, Divider, Box, Container, Grid, Paper,  IconButton, InputAdornment } from '@mui/material'
import { assets } from '../../assets/asset.js'
import FacebookIcon from '@mui/icons-material/Facebook'
import GoogleIcon from '@mui/icons-material/Google'
import { Link } from 'react-router-dom'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <Container component="main" maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper
        stroke="black"
        sx={{
          p: 8,
          borderRadius: 12,
          width: '100%',
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255, 255, 255, 0.3)'
        }}>
        <Typography variant="h4" component="h1" gutterBottom textAlign="center">
            Welcome back!
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom textAlign="center">
            Please log in to continue
        </Typography>

        <Box component="form" noValidate sx={{ mt: 3 }}>
          {/* Username */}
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            placeholder="Enter your email"
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
          />

          {/* Remember & Forgot Password */}
          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="Remember for 30 days"
            />
            <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
                Forgot password?
            </Typography>
          </Box>

          {/* Login Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color= "success"
            sx={{ mt: 2, py: 1.5, borderRadius: 12 }}
          >
              Login
          </Button>
        </Box>

        {/* Divider */}
        <Divider sx={{ my: 3 }} color='black' ></Divider>

        {/* Sign Up Link */}
        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Don't have an account?{' '}
          <Typography
            component={Link} // Bọc Link trong Typography
            to="/Signup"
            color="primary"
            sx={{ fontWeight: 'bold', textDecoration: 'none', cursor: 'pointer' }}
          >
                Sign up
          </Typography>
        </Typography>
      </Paper>
    </Container>
  )
}

export default LoginForm