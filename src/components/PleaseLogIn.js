import React from 'react'
import { Grid, Typography, Button } from '@material-ui/core'
import { useAuth0 } from "../utils/react-auth0-spa";
import lockImage from '../otherlock.png'


const PleaseLogIn = (props) => {
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    return (
        <div>
            <img src={lockImage} alt="please log in" />
            <div style={{ padding: "20px 40px" }}>
                {isAuthenticated ? (
                    <Typography>
                        {"It looks like you don't have sufficient rights to access our search tool. Because this application doesn't affect anything, you can become an admin by clicking the button below and then logging out and back in."}
                    </Typography>
                )

                    :
                    (
                        <Grid container direction="column" >
                            <Typography variant="h6" style={{ marginBottom: 20 }}>
                                {"You must log in before you can access this resource."}
                            </Typography>
                            <Typography variant="body1" style={{ marginBottom: 20 }}>
                                {"Don't worry, it's free and you can sign up with any email."}
                            </Typography>
                            <Button onClick={() => loginWithRedirect({})} style={{ maxWidth: 400, color: "white" }} size="large" color="secondary" variant="contained">{"Sign in"}</Button>
                        </Grid>
                    )

                }
            </div>
        </div>
    )
}

export default PleaseLogIn