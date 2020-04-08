import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/Home';
import Menu from './components/Menu';
import Search from './components/Search'
import Footer from './components/Footer';
import CampaignDetails from './components/CampaignDetails';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";



const App = () => {
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
            <Search />
          </Route>
          <Route path="/campaign/:id">
            <Menu />
            <CampaignDetails/>
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
