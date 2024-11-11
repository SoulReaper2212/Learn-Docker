import React, { useState } from 'react';
import Messages from '../components/messages.js';
import { Container, TextField, Button, Typography, Box, AppBar, Toolbar  } from '@mui/material';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleLogin = (e) => {
    e.preventDefault();
    
    
  
   
    fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',  
      body: JSON.stringify({
        username: username,  
        password: password,
      }),
    })
    .then(response => {
      if (!response.ok) {
        return response.json()  // Parse the error response
          .then(errorData => {
            setErrorMessage(errorData.msg)
            throw new Error(errorData.msg || 'Login failed');  
           
          });
      }
      return response.json();  
    })
    .then(data => {
      console.log(data);  
      localStorage.setItem('token', data.access_token);
      window.location.href = 'http://localhost:3001';
    })
    .catch(error => {
      console.error('Error:', error.message);  
    });
  };
 

  return (
    <>

    <AppBar position="static" sx={{ backgroundColor: 'black', alignContent:"center",alignItems:"center" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 , fontFamily: 'Ubuntu Mono, monospace' }}>
            SEE THE POWER OF DOCKER AND DOCKER COMPOSE
          </Typography>
        </Toolbar>
      </AppBar>
    <Container maxWidth="xs">


     
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          marginTop: 4,  
          paddingY: "7%",  
          borderRadius: 2, 
          border: '2px solid black',
          borderWidth: "2%" 
        }}
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleLogin} style={{ width: '80%' }}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="black" fullWidth >
            Login
          </Button>

          {errorMessage && (  // Conditionally render the error message
        <Typography sx={{marginTop:"5%"}} color="error">
          {errorMessage}
        </Typography>
      )}

        </form>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 4,
          bgcolor: "white",
          paddingX: "3%",
          paddingY: "7%",
          borderRadius: 2,
          border: '5px solid black',
        }}
      >
        <Messages /> 
      </Box>

    </Container>

    </>
  );
};

export default LoginPage;
