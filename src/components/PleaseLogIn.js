import React from 'react'
import { Grid, Typography, Button, CircularProgress } from '@material-ui/core'
import { useAuth0 } from "../utils/react-auth0-spa";
import lockImage from '../otherlock.png'
import axios from 'axios'

// Component to prompt people to login or that they need more rights
const PleaseLogIn = (props) => {
    const { isAuthenticated, loginWithRedirect, user } = useAuth0();

    const [loading, setLoading] = React.useState(false)

    const getAdminRights = () => {
        setLoading(true)
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/becomeAdmin`, { userId: user.sub }).then(() => {
            window.location.reload()
        }).finally(() => setLoading(false))
    }
    return (
        <div>
            <img src={lockImage} alt="please log in" style={{ maxWidth: "100vw" }} />
            <div style={{ padding: "20px 40px" }}>
                {isAuthenticated ? (
                    <Grid container direction="column" >
                        <Typography variant="h6" style={{ marginBottom: 20 }}>
                            {"You must have proper rights before you can access this resource."}
                        </Typography>
                        <Typography variant="body1" style={{ marginBottom: 20 }}>
                            {"It looks like you don't have sufficient rights to access our search tool. Because this application doesn't affect anything, you can become an admin by clicking the button below and then logging out and back in."}
                        </Typography>
                        {loading ? <CircularProgress /> : <Button onClick={() => getAdminRights()} style={{ maxWidth: 400, color: "white" }} size="large" color="secondary" variant="contained">{"Become Admin"}</Button>}
                    </Grid>
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
                            <Button onClick={() => loginWithRedirect({})} style={{ maxWidth: 400, color: "white" }} size="large" color="secondary" variant="contained">{"Sign in | Sign Up"}</Button>
                        </Grid>
                    )

                }
            </div>
        </div>
    )
}

export default PleaseLogIn