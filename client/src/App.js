import './App.css';
import { BrowserRouter as Router, Routes, Route, redirect, Navigate, MemoryRouter } from 'react-router-dom'
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

// const getDesignTokens = (mode) => ({
//   components: {
//     MuiToolbar: {
//       styleOverrides: {
//         root: {
//           // height: 56
//         }
//       }
//     }
//   },
//   palette: {
//     mode,
//     ...(mode === 'light'
//       // light
//       ? {
//         primary: {
//           main: '#F8F9F9',
//         },
//         secondary: {
//           main: '#0A95FF',
//         },
//         accent: '#FF5722',
//         footer: '#232629'
//       }
//       // dark
//       : {
//         background: {
//           default: '#757575'
//         },
//         secondary: {
//           main: '#0A95FF',
//         },
//         accent: '#FF5722',
//         footer: '#232629'
//       })
//   },
// });

// from https://mui.com/material-ui/customization/dark-mode/

export default function ToggleColorMode() {
  const [mode, setMode] = useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
    createTheme({
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
        accent: '#FF5722',
        footer: '#232629'
      }
      // dark
      : {
        background: {
          default: '#757575'
        },
        secondary: {
          main: '#0A95FF',
        },
        accent: '#FF5722',
        footer: '#232629'
      })
      },
    }),
  [mode],
);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState((false));

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const authToken = localStorage.getItem('token');
      fetch('/validate', {
        headers: {
          'Content-type': 'application/json',
          'authorization': 'Bearer ' + authToken
      },
      })
            .then(response => response.json())
            .then(json => {
              if (json.success === true ) {
                setIsAuthenticated(json.success)
                localStorage.setItem('auth', json.success);
            }
            })
            .catch((error) => {
            });
    }
  }, []);

  // useEffect(() => {
  //   localStorage.setItem('auth', isAuthenticated);
  // }, []);

  return (
    // <div className="App">
      // <ThemeProvider theme={theme}>
        // <CssBaseline />
        <Router>
          <Routes>
            <Route path='/' element={<QuestionsPage />} />

            <Route path='/questions/:id' element={<QuestionPage />} />
            
            <Route path='/questions/ask' element={isAuthenticated ? <AskPage /> : <Navigate to='/users/login' />} />

            <Route path='/users/register' element={!isAuthenticated ? <RegisterPage /> : <Navigate to='/' />} />
            <Route path='/users/login' element={!isAuthenticated ? <LoginPage /> : <Navigate to='/' />} />
            <Route path='/users' element={<UsersPage />} />

            {/* needs to be like /users/:id/:name ?? */}
            <Route path='/users/profile/:id' element={<ProfilePage />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Router>
      // </ThemeProvider>
    // </div>
  );
}

// export default App;
