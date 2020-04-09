import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/Home';
import Menu from './components/Menu';
import Search from './components/Search'
import Footer from './components/Footer';
import CampaignDetails from './components/CampaignDetails';
import CampaignAnalyze from './components/CampaignAnalyze';
import PleaseLogIn from './components/PleaseLogIn';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { useAuth0 } from "./utils/react-auth0-spa";
import { Grid } from '@material-ui/core'
import Logo from './NewLogo.png'



const App = () => {
  const { loading, user, isAuthenticated } = useAuth0();
  console.log(user)
  if (loading) return (
    <Grid container justify="center" alignContent="center" style={{ height: "100vh" }}>
      <img src={Logo} alt="loading" />
    </Grid>
  )
  return (
    <MuiThemeProvider theme={createMuiTheme({
      palette: {
        primary: {
          main: "#003A7A"
        },
        secondary: {
          main: "#00B964"
        }
      }
    })}>
      <Router>
        <Switch>
          <Route exact path="/search">
            <Menu />
            {isAuthenticated ?
              <Search />
              :
              <PleaseLogIn />
            }
          </Route>
          <Route path="/campaign/:id">
            <Menu />
            {isAuthenticated // FIXME && isadminuser
              ?
              <CampaignDetails />
              :
              <PleaseLogIn />
            }
          </Route>
          <Route path="/analyze">
            <Menu />
            {isAuthenticated ?
              <CampaignAnalyze />
              :
              <PleaseLogIn />
            }
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
