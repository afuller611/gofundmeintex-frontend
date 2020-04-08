import React from 'react'
import Hero from './Hero'
import HomeMenu from './HomeMenu'
import { Grid } from '@material-ui/core'

const Home = (props) => {
    return (
        <Grid container direction="column">
            <HomeMenu homePage={true} style={{ maxHeight: 100 }} />
            <Hero style={{ paddingTop: 100 }} />
        </Grid>
    )
}

export default Home