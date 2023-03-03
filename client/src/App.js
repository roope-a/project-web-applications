import './App.css';
import { BrowserRouter as Router, Routes, Route, redirect, Navigate } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import QuestionsPage from './components/QuestionsPage';
import QuestionPage from './components/QuestionPage';
import AskPage from './components/AskPage';
import RegisterPage from './components/RegisterPage';
import UsersPage from './components/UsersPage';
import LoginPage from './components/LoginPage';
import { CssBaseline } from '@mui/material';
import ProfilePage from './components/ProfilePage';
import NotFound from './components/NotFound';

const getDesignTokens = (mode) => ({
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: {
          // height: 56
        }
      }
    }
  },
  palette: {
    mode,
    ...(mode === 'light'
      // light
      ? {
        primary: {
          main: '#F8F9F9',
        },
        secondary: {
          main: '#0A95FF',
        },
        accent: '#FF5722'
      }
      // dark
      : {
        background: {
          default: '#757575'
        },
        secondary: {
          main: '#0A95FF',
        },
        accent: '#FF5722'
      })
  },
});


function App() {

  // from https://mui.com/material-ui/customization/dark-mode/
  const [mode, setMode] = React.useState('light');

  const colorMode = React.useMemo(() => ({

    // The dark mode switch would invoke this method
    toggleColorMode: () => {
      setMode((prevMode) =>
        prevMode === 'light' ? 'dark' : 'light',
      );
    },
  }),
    [],
  );

  // Update the theme only if the mode changes
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  // False is only for devving 
  const [isAuthenticated, setIsAuthenticated] = useState((false));

  const setAuth = (value) => {
    setIsAuthenticated(value);
  };

  //FIX ME, add checking that token is valid!

  // useEffect(() => {
  //   if (localStorage.getItem('token')) {
  //     setAuth(true)
  //   }
  // }, []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path='/' element={<QuestionsPage />} />

            {/* needs to be like /questions/:id */}
            <Route path='/questions' element={<QuestionPage />} />
            
            {/* just for dev */}
            <Route path='/questions/ask' element={<AskPage />} />
            {/* <Route path='/questions/ask' element={!isAuthenticated ? <AskPage /> : <Navigate to='/' />} /> */}

            <Route path='/users/register' element={!isAuthenticated ? <RegisterPage /> : <Navigate to='/' />} />
            <Route path='/users/login' element={!isAuthenticated ? <LoginPage /> : <Navigate to='/' />} />
            <Route path='/users' element={<UsersPage />} />

            {/* needs to be like /users/:id/:name ?? */}
            <Route path='/users/profile' element={<ProfilePage />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
