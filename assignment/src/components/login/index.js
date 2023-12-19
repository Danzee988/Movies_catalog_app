import React, { useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom'; // Import useHistory from React Router
import { AuthContext } from "../../contexts/authContext";

const Login = () => {
  const context = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    console.log("login")
    try {
      await context.authenticate(email, password);
      console.log("Authenticated and logged in");
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error.message);
      setError(error.message || 'Login failed. Please try again.');
    }
  };

  return (
    <Card style={{ maxWidth: 400, margin: 'auto', marginTop: 50 }}>
      <CardContent>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={(e) => handleLogin(e)}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: 20 }}
            type="submit"
          >
            Login
          </Button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
