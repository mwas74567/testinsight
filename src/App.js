import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import axios from 'axios';

//components
import Navbar from './components/Navbar';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#00bcd4',
      dark: '#008394',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#ffffff',
    },
  },
  typography: {
    useNextVariants: true,
  },
});
axios.defaults.baseURL = "https://us-central1-insightsolutions254build.cloudfunctions.net";

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
      <Router>
        <Navbar />
        <div className="container">
        <Switch>
        </Switch>
        </div>
      </Router>
    </div>
    </MuiThemeProvider>
  );
}

export default React.memo(App);

