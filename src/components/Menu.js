import React from 'react'
import { AppBar, Toolbar, Tabs, Tab, Typography, Grid, Button } from '@material-ui/core'
import { Search, BarChart, Home } from '@material-ui/icons'
import Logo from '../NewLogo.png';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'


const useStyles = makeStyles({
    indicator: {
        backgroundColor: "#003A7A"
    }
})

const Menu = (props) => {

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
                        <Tab component={Link} to="/search" label={<Grid container justify="center"><Search color="primary" style={{ marginRight: 10 }} /><Typography color="primary">{"Search"}</Typography></Grid>} />
                        <Tab component={Link} to="/analyze" label={<Grid container justify="center"><BarChart color="primary" style={{ marginRight: 10 }} /><Typography color="primary">{"Analytics Tool"}</Typography></Grid>} />

                    </Tabs>
                    <div style={{ display: "flex", justifyContent: "flex-end", marginLeft: 20 }}>
                        <Button variant="outlined" color="primary">{"Sign In"}</Button>
                    </div>
                </Toolbar>
            </AppBar >
            <div style={{ paddingTop: 100 }} />
        </>
    )
}

export default Menu