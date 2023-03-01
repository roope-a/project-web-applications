import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import QuestionsPage from './components/QuestionsPage';
import QuestionPage from './components/QuestionPage';
import RegisterPage from './components/RegisterPage';
import UsersPage from './components/UsersPage';
import LoginPage from './components/LoginPage';
import { CssBaseline } from '@mui/material';
import ProfilePage from './components/ProfilePage';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
    // light
      ? {}
      // dark
      : {
        background: {
          default: '#757575'
        },
        accent: '#FF5722'
      })
  },
});


function App() {

  // from https://mui.com/material-ui/customization/dark-mode/
  const [mode, setMode] = React.useState('dark');

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

  return (
    <div className="App">
      <ThemeProvider theme={ theme }>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path='/' element={ <QuestionsPage /> }/>
            {/* needs to be like /questions/:id */}
            <Route path='/questions' element={ <QuestionPage /> }/> 
            <Route path='/users/register' element={ <RegisterPage />}/>
            <Route path='/users/login' element={ <LoginPage/> }/>
            <Route path='/users' element={ <UsersPage/> }/>
            {/* needs to be like /users/:id/:name ?? */}
            <Route path='/users/profile' element={ <ProfilePage/> }/>
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
