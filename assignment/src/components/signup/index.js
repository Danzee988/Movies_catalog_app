import React, { useState,useContext } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
// import { auth } from '../../components/firebase'; // Make sure to import your Firebase instance
// import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useHistory from React Router
import { AuthContext } from "../../contexts/authContext";


const Signup = ({ handleSignup }) => {
  const context = useContext(AuthContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      console.log("userEmail:", email);
      console.log("password:", password);
  
      // Regular expression for a strong password
      let passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      const isValidPassword = passwordRegEx.test(password);
  
      if (isValidPassword) {
        console.log('User password meets requirements.');
  
        // Assuming `context.register` returns a boolean indicating successful registration
        const registrationSuccess = await context.register(email, password);

        console.log(registrationSuccess)
        if (registrationSuccess) {
          console.log('User signed up successfully.');
          //context.setRegistered(true);
          navigate('/login');
        } else {
          console.error('Error registering user.');
          setError('Registration failed. Please try again.');
        }
      } else {
        console.error('Invalid password format.');
        setError('Password must be at least 8 characters long and include at least one letter, one digit, and one special character.');
      }
    } catch (error) {
      console.error('Error signing up:', error.message);
      setError(getErrorMessage(error.code) || 'An error occurred during registration. Please try again.');
    }
  };
  
  

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'The email entered is not a valid one. Please try again.';
      case 'auth/weak-password':
        return 'The password should be at leat 6 characters. Please try again.';
      case 'auth/email-already-in-use':
        return 'The email  already belongs to an account. Please try to login or try again.';
      default:
        return 'An error occurred. Please try again later.';
    }
  };

  

  return (
    <Card style={{ maxWidth: 400, margin: 'auto', marginTop: 50 }}>
      <CardContent>
        <Typography variant="h5" align="center" gutterBottom>
          Sign Up
        </Typography>
        <form>
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
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </CardContent>
    </Card>
  );
};

export default Signup;
