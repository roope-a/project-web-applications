import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {
  return (
    <div className="App">
      <ThemeProvider theme={ darkTheme }>
        <Header />
      </ThemeProvider>
    </div>
  );
}

export default App;
