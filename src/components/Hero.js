import React from 'react'
import HeroImage from '../HeroImage.png'
import { Grid, Typography, Button, Card, CardContent } from '@material-ui/core';

const Hero = (props) => {
    return (
        <div style={{ backgroundImage: `url(${HeroImage})`, backgroundAttachment: "fixed", backgroundRepeat: "no-repeat", backgroundSize: "cover", height: "80vh", paddingTop: 100 }}>
            <Grid container direction="column" justify="center" style={{ height: "50vh" }} item xs={6}>
                <div style={{ margin: "0 auto" }}>
                    <Card>
                        <CardContent style={{ padding: 20, borderRadius: 20 }}>
                            <Typography style={{ marginBottom: 20 }} color="primary" variant="h4">Let's Analyze Some Campaigns</Typography>
                            <Typography style={{ marginBottom: 20 }} color="primary">Here at AnalyzeFundMe we aim to help others make the best campaign possible.</Typography>
                            <Grid container justify="space-between">
                                <Button color="primary" variant="outlined">Learn More</Button>
                                <Button color="primary">Sign In</Button>
                            </Grid>
                        </CardContent>
                    </Card>
                </div>
            </Grid>
        </div>
    )
}
export default Hero