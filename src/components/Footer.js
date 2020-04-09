import React from 'react'
import { Grid, Typography } from '@material-ui/core';

//Footer - Pretty straightforward

const Footer = (props) => {
    return (
        <div style={{ backgroundColor: "#333232", padding: "50px 30px", minHeight: 50 }}>
            <Grid container justify="space-around">
                <Grid item xs={12}>
                    <Typography style={{ color: "white" }}>
                        {"AnalyzeFundMe is an educational tool built by BYU Information Systems students and is in no way affiliated with GoFundMe."}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography style={{ color: "white" }}>
                        {"This site was not designed to be mobile friendly."}
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}
export default Footer