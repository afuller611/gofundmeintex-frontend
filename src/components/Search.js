import React from 'react'
import { TextField, Button, Card, CardContent, Typography, Grid, IconButton, CircularProgress, makeStyles } from '@material-ui/core'
import axios from 'axios'
import SearchImage from '../SearchImageFinal.png'
import { NavigateBefore, NavigateNext, FirstPage, LastPage } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    hover: {
        backgroundColor: "#c3d3e4",
        '&:hover': {
            backgroundColor: "#00B964",
            color: "white"
        }
    }
})

const Search = (props) => {
    const classes = useStyles(props);


    const searchCampaigns = (e) => {
        e.preventDefault()
        if (state.description || state.title || state.firstName || state.lastName) {
            setState({ ...state, loading: true, error: false, noInput: false })
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/searchCampaigns`, {
                title: state.title,
                description: state.description,
                firstName: state.firstName,
                lastName: state.lastName
            }).then((res) => {
                console.log(res.data)
                setState({
                    ...state,
                    showResults: true,
                    campaigns: res.data,
                    loading: false
                })
            }).catch((err) => {
                console.log(err)
                setState({ ...state, loading: false, error: true })
            })
        } else setState({ ...state, noInput: true })
    }

    const [state, setState] = React.useState({
        showResults: false,
        title: "",
        description: "",
        firstName: "",
        lastName: "",
        campaigns: [],
        pageNumber: 1,
        numDisplay: 5,
        loading: false,
        error: false,
        noInput: false
    })

    return (
        <>
            <img src={SearchImage} alt="search" style={{ maxWidth: "100vw" }} />
            <div style={{ padding: "20px 40px" }}>
                <Typography variant="h4" style={{ marginBottom: 30 }}>Search Campaigns</Typography>
                <Typography style={{ marginBottom: 20 }}>Fill out at least one field below to search for related campaigns</Typography>
                {/* Form */}
                <form onSubmit={(e) => searchCampaigns(e)} style={{ marginBottom: 20 }}>
                    <Grid container direction="column" justify="space-around">
                        <Grid item style={{ marginBottom: 20 }}>
                            <TextField style={{ marginRight: 20, marginBottom: 20 }} variant="outlined" label="Title" value={state.title} onChange={(event) => setState({ ...state, title: event.target.value })} />
                            <TextField style={{ marginRight: 20, marginBottom: 20 }} variant="outlined" label="Description" value={state.description} onChange={(event) => setState({ ...state, description: event.target.value })} />
                            <TextField style={{ marginRight: 20, marginBottom: 20 }} variant="outlined" label="First Name" value={state.firstName} onChange={(event) => setState({ ...state, firstName: event.target.value })} />
                            <TextField style={{ marginRight: 20, marginBottom: 20 }} variant="outlined" label="Last Name" value={state.lastName} onChange={(event) => setState({ ...state, lastName: event.target.value })} />

                            {state.error && <Typography style={{ color: "red" }}>Please remove special characters from fields</Typography>}
                            {state.noInput && <Typography style={{ color: "red" }}>Please fill out at least one field</Typography>}
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="secondary" style={{ color: "white" }} type="submit">Search Campaigns</Button>
                        </Grid>
                    </Grid>
                </form>
                {/*Spinner */}
                {state.loading &&
                    <Grid container justify="center" direction="column" alignItems="center">
                        <Typography color="primary" variant="h5" style={{ marginBottom: 20 }}>{"Searching Campaigns..."}</Typography>
                        <CircularProgress />
                    </Grid>}
                {state.showResults && (
                    state.campaigns.length > 0 ?
                        <div>
                            {/* Campaign Cards */}
                            {state.campaigns.filter((camp, index) => index >= state.numDisplay * (state.pageNumber - 1) && index < (state.numDisplay) * state.pageNumber).map((campaign) => (
                                <Card key={campaign.campaign_id} classes={{ root: classes.hover }} style={{ marginBottom: 20 }}>
                                    <Link to={`/campaign/${campaign.campaign_id}`} style={{ textDecoration: "none", color: "inherit" }}>
                                        <CardContent style={{ padding: 20 }}>
                                            <div style={{ display: "flex", flexDirection: "row" }}>
                                                <img style={{ maxWidth: 200, marginRight: 20 }} src={campaign.campaign_image_url} alt={campaign.title} />
                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                    <Typography style={{ marginBottom: 20 }} variant="h5">{campaign.title}</Typography>
                                                    <Typography variant="body1" style={{ marginBottom: 20 }}>{`${campaign.user_first_name} ${campaign.user_last_name}`}</Typography>
                                                    <Typography variant="body2">
                                                        {`Raised ${campaign.current_amount}/${campaign.goal} ${campaign.currencycode}`}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Link>
                                </Card>
                            ))}
                            {/*Pagination */}
                            <Grid container justify="flex-end">
                                <TextField style={{ width: 200, marginRight: 20 }} select SelectProps={{ native: true }} variant="outlined" value={state.numDisplay} label={"Number to display"} onChange={(e) => setState({ ...state, numDisplay: e.target.value })}>
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={15}>15</option>
                                    <option value={20}>20</option>
                                </TextField>
                                <IconButton disabled={state.pageNumber < 2} onClick={() => setState({ ...state, pageNumber: 1 })}>
                                    <FirstPage />
                                </IconButton>
                                <IconButton disabled={state.pageNumber < 2} onClick={() => setState({ ...state, pageNumber: state.pageNumber - 1 })}>
                                    <NavigateBefore />
                                </IconButton>
                                <Typography style={{ marginTop: 15 }}>{state.pageNumber} of {Math.ceil(state.campaigns.length / state.numDisplay)}</Typography>
                                <IconButton disabled={state.pageNumber >= state.campaigns.length / state.numDisplay} onClick={() => setState({ ...state, pageNumber: state.pageNumber + 1 })}>
                                    <NavigateNext />
                                </IconButton>
                                <IconButton disabled={state.pageNumber >= state.campaigns.length / state.numDisplay} onClick={() => setState({ ...state, pageNumber: Math.ceil(state.campaigns.length / state.numDisplay) })}>
                                    <LastPage />
                                </IconButton>
                            </Grid>
                        </div>
                        :
                        <Typography style={{ color: "red" }}>{"No results, try a different search term"}</Typography>
                )}
            </div>
        </>
    )
}

export default Search