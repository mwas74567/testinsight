import React from 'react'
import './App.css';
import {BrowserRouter as Router, Switch } from 'react-router-dom';
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import axios from 'axios';
import AuthRoute from './utils/AuthRoute';
import jwtDecode from 'jwt-decode';

//components
import Navbar from './components/Navbar';

//pages
import landing from './pages/landing';
import home from './pages/home';
import user from './pages/user';
import departments from './pages/departments';
import supervisors from './pages/supervisors';
import agents from './pages/agents';
import supervisor from './pages/supervisor';
import agent from './pages/agent';
import territories from './pages/territories';
import customers from './pages/customers';
import products from './pages/products';
import schedules from './pages/schedules';
import tasks from './pages/tasks';
import task from './pages/task';
import reports from './pages/reports';

//redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { logoutUser, getUser } from './redux';
import { SET_AUTHENTICATED } from './redux/user/types';

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

let token = localStorage.Insights254AuthTokenClient;

if(token){
  let decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser());
  }else{
    store.dispatch({type: SET_AUTHENTICATED});
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUser());
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <div className="App">
        <Router>
          <Navbar />
          <div className="container">
          <Switch>
            <AuthRoute path="/" exact landing component={landing} />
            <AuthRoute path="/home" exact component={home} />
            <AuthRoute path="/user" exact component={user} />
            <AuthRoute path="/departments" exact component={departments} />
            <AuthRoute path="/supervisors" exact component={supervisors} />
            <AuthRoute path="/agents" exact component={agents} />
            <AuthRoute path="/supervisors/:supervisorId" exact component={supervisor} />
            <AuthRoute path="/agents/:agentId" exact component={agent} />
            <AuthRoute path="/territories" exact component={territories} />
            <AuthRoute path="/customers" exact component={customers} />
            <AuthRoute path="/products" exact component={products} />
            <AuthRoute path="/schedules" exact component={schedules} />
            <AuthRoute path="/tasks" exact component={tasks} />            
            <AuthRoute path="/tasks/:taskId" exact component={task} />            
            <AuthRoute path="/reports" exact component={reports} />
          </Switch>
          </div>
        </Router>
      </div>
      </MuiThemeProvider>
    </Provider>
  );
}

export default React.memo(App);

