import React from 'react'
import { AppBar, Toolbar, Tabs, Tab, Typography, Grid, Button } from '@material-ui/core'
import { Search, BarChart, Home } from '@material-ui/icons'
import Logo from '../NewLogo.png';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import { useAuth0 } from "../utils/react-auth0-spa";


const useStyles = makeStyles({
    indicator: {
        backgroundColor: "#003A7A"
    }
})

const Menu = (props) => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
    const classes = useStyles({ ...props });

    const getTabState = () => {
        if (window.location.pathname.includes("search")) return 1
        if (window.location.pathname.includes("campaign")) return 1
        if (window.location.pathname.includes("analyze")) return 2
        else return 0
    }

    const [tabValue, setTabValue] = React.useState(getTabState())

    return (
        <>
            <AppBar style={{ maxHeight: 100, backgroundColor: "white" }}>
                <Toolbar>
                    <Link to="/">
                        <img src={Logo} alt="logo" style={{ marginRight: 50 }} />
                    </Link>
                    <Tabs
                        classes={{ indicator: classes.indicator }}
                        value={tabValue}
                        onChange={(event, value) => setTabValue(value)}
                    >
                        <Tab component={Link} to="/" label={<Grid container justify="center"><Home color="primary" style={{ marginRight: 10 }} /><Typography color="primary">{"Home"}</Typography></Grid>} />
                        <Tab component={Link} to="/search" label={<Grid container justify="center"><Search color="primary" style={{ marginRight: 10 }} /><Typography color="primary">{"Search Campaigns"}</Typography></Grid>} />
                        <Tab component={Link} to="/analyze" label={<Grid container justify="center"><BarChart color="primary" style={{ marginRight: 10 }} /><Typography color="primary">{"Analyze My Campaign"}</Typography></Grid>} />
                        
                    </Tabs>
                    <div style={{ display: "flex", justifyContent: "flex-end", marginLeft: 20 }}>
                        {!isAuthenticated && (
                            <Button variant="outlined" color="primary" onClick={() => loginWithRedirect({})}>{"Sign In"}</Button>
                        )}

                        {isAuthenticated && (
                            <Button variant="outlined" color="primary" onClick={() => logout()}>{"Sign Out"}</Button>

                        )}
                    </div>
                </Toolbar>
            </AppBar >
            <div style={{ paddingTop: 100 }} />
        </>
    )
}

export default Menu