import React from 'react'
import HeroImage from '../HeroImage.png'
import { Grid, Typography, Button, Card, CardContent } from '@material-ui/core';
import { Link } from 'react-router-dom'
import { useAuth0 } from "../utils/react-auth0-spa";

//Hero Component
const Hero = (props) => {
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    return (
        <div style={{ backgroundImage: `url(${HeroImage})`, backgroundAttachment: "fixed", backgroundRepeat: "no-repeat", backgroundSize: "cover", height: "80vh", paddingTop: 100 }}>
            <Grid container direction="column" justify="center" style={{ height: "50vh" }} item xs={6}>
                <div style={{ margin: "0 auto" }}>
                    <Card style={{ marginLeft: 20 }}>
                        <CardContent style={{ padding: 20, borderRadius: 20 }}>
                            <Typography style={{ marginBottom: 20 }} color="primary" variant="h4">Let's Analyze Some Campaigns</Typography>
                            <Typography style={{ marginBottom: 20 }} color="primary">
                                Here at AnalyzeFundMe we aim to help others make the best campaign possible.
                                Often, those with good intentions don't know what a campaign needs so that they can help those around them.
                                With AnalyzeFundMe, you can use our predictive model to estimate how your campaign would do based on a variety of features.
                                </Typography>
                            <Grid container justify="flex-end">
                                {!isAuthenticated && (
                                    <Button variant="contained" color="primary" onClick={() => loginWithRedirect({})}>{"Sign Up or Sign In to get started"}</Button>
                                )}
                                {isAuthenticated && (
                                    <Button variant="contained" component={Link} to="/analyze" color="secondary">{"Analyze a Campaign"}</Button>
                                )}
                            </Grid>
                        </CardContent>
                    </Card>
                </div>
            </Grid>
        </div>
    )
}
export default Hero