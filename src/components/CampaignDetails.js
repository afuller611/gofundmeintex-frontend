import React from 'react'
import { Typography, Grid, CircularProgress, Card, CardContent, Button, Tooltip } from '@material-ui/core'
import { OpenInNew, LocalOffer, CheckCircle, Info } from '@material-ui/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandHoldingHeart, faRibbon, faBullhorn, faHeart, faHandshake } from '@fortawesome/free-solid-svg-icons'
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Progress } from 'react-sweet-progress';
import "../custom.css";

// Component for Campaign Details

const CampaignDetails = (props) => {
    const { id } = useParams()

    const [campaign, setCampaign] = React.useState({})
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(false)

    React.useEffect(() => {
        setLoading(true)
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/campaign/${id}`).then((res) => {
            setCampaign(res.data)
            setLoading(false)
        }).catch((err) => {
            console.log(err)
            setError(true)
        })
    }, [id])

    return (
        <div style={{ padding: "20px 40px" }}>
            {loading ? <Grid container justify="center" style={{ marginTop: 50 }}>
                <CircularProgress />
            </Grid>
                :
                error || !campaign.campaign_id ?
                    <Typography>An error occurred while loading the campaign or the campaign was not found, please refresh or try a different campaign.</Typography>
                    :
                    <Grid container direction="column">
                        <Typography variant="h3" style={{ marginBottom: 20 }}>{campaign.title}</Typography>
                        <Typography variant="subtitle1" style={{ color: "gray", marginBottom: 10 }}>Created by {campaign.user_first_name} {campaign.user_last_name} - {campaign.location_city} {campaign.location_zip} {campaign.location_country}</Typography>
                        <div style={{ display: "flex", flexDirection: "row", marginBottom: 50, alignItems: "flex-start" }}>
                            <img style={{ maxWidth: 500, marginRight: 50, boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)", borderRadius: 4 }} src={campaign.campaign_image_url} alt={campaign.title} />
                            <Card style={{ backgroundColor: "#c3d3e4" }}>
                                <CardContent>
                                    <Grid container direction="row" spacing={2} wrap="nowrap">
                                        <Grid item xs={6} style={{ marginRight: 5 }}>
                                            <Typography style={{ marginBottom: 10, fontWeight: 600 }} variant="h6">Raised <span style={{ color: "#00B964", fontSize: "1.75rem" }}>{campaign.current_amount}</span> of {campaign.goal} {campaign.currencycode}</Typography>

                                            <Progress
                                                style={{ animation: "none", width: 300, fontFamily: "Roboto", marginBottom: 20 }}
                                                percent={Math.ceil((campaign.current_amount / campaign.goal) * 100)}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div style={{ display: "flex", flexWrap: "nowrap" }}>
                                                <Typography style={{ fontWeight: 600 }} variant="h6">Percent of goal met per day</Typography>
                                                <Tooltip placement="right" title={<Typography style={{ color: "white" }}>{`This campaign was detected to be ${campaign.language} so we used the ${campaign.language === "Italian" ? campaign.language : "English"} model for the predicted value${campaign.language !== "English" && campaign.language !== "Italian" ? " because we don't have a model for that language yet." : "."}`}</Typography>}><Info style={{ fontSize: 20, color: "#5b7f92", marginTop: 6, marginLeft: 5 }} /></Tooltip>
                                            </div>
                                            <Typography variant="body1" style={{ fontWeight: 600 }}>Predicted: {parseFloat(campaign.score).toFixed(4)}%</Typography>
                                            <Typography variant="body1" style={{ fontWeight: 600 }}>Actual: {((parseFloat(campaign.current_amount) / parseFloat(campaign.goal)) / (parseFloat(campaign.days_active) ? parseFloat(campaign.days_active) : 1)) * 100}%</Typography>
                                        </Grid>
                                    </Grid>
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                        <Grid container item direction="column" style={{ marginRight: 20 }}>
                                            <Typography style={{ marginBottom: 20, fontWeight: 600 }} variant="body1"><LocalOffer color="primary" style={{ marginBottom: -6, marginRight: 5 }} />{campaign.real_category} </Typography>
                                            <Typography style={{ marginBottom: 20, fontWeight: 600 }} variant="body1"><CheckCircle color="secondary" style={{ marginBottom: -6, marginRight: 5 }} />Active for {campaign.days_active} Days </Typography>
                                            <Typography style={{ marginBottom: 20, fontWeight: 600 }} variant="body1"><FontAwesomeIcon style={{ fontSize: 20, color: "#bc1c1c", marginRight: 5 }} icon={faHandHoldingHeart} />{campaign.donators} Donors</Typography>
                                            <Typography style={{ marginBottom: 20, fontWeight: 600 }} variant="body1"><FontAwesomeIcon style={{ fontSize: 20, color: "#f3ec17", marginRight: 5 }} icon={faRibbon} />{campaign.is_charity ? "Charity" : "Not a Charity"}</Typography>
                                            {campaign.is_charity && <Typography style={{ marginBottom: 20, fontWeight: 600 }}>{campaign.charity_name || campaign.charity_npo_id}</Typography>}
                                            <Button variant="outlined" color="primary" component="a" href={campaign.url} target="_blank">GoFundMe Page <OpenInNew style={{ fontSize: 18, marginLeft: 5 }} /></Button>
                                        </Grid>
                                        <Grid container item direction="column">
                                            <Typography style={{ marginBottom: 20, fontWeight: 600 }} variant="body1"><FontAwesomeIcon style={{ fontSize: 20, color: "#00B964", marginRight: 5 }} icon={faBullhorn} />{campaign.social_share_total} Social Media Shares</Typography>
                                            <Typography style={{ marginBottom: 20, fontWeight: 600 }} variant="body1"><FontAwesomeIcon style={{ fontSize: 20, color: "#bc1c1c", marginRight: 5 }} icon={faHeart} />{campaign.campaign_hearts} Campaign Hearts</Typography>
                                            <Typography style={{ marginBottom: 20, fontWeight: 600 }} variant="body1"><FontAwesomeIcon style={{ fontSize: 20, color: "#f3ec17", marginRight: 5 }} icon={faHandshake} />{campaign.has_beneficiary ? "Has a Beneficiary" : "No Beneficiary"}</Typography>
                                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                <FontAwesomeIcon style={{ fontSize: 20, color: "#003A7A", marginRight: 5 }} icon={faFacebookSquare} />
                                                <Typography style={{ marginBottom: 20, fontWeight: 600 }} variant="body1">{campaign.auto_fb_post_mode ? "Automatically Posts to Facebook" : "Doesn't Automatically Post to Facebook"}</Typography>
                                            </div>
                                        </Grid>
                                    </div>
                                </CardContent>
                            </Card>

                        </div>
                        <Typography variant="h6">Description:</Typography>
                        <Typography variant="body1">{campaign.description}</Typography>
                        {campaign.updates && campaign.updates.length > 0 &&
                            <>
                                {campaign.updates.map((update, index) => (
                                    <div key={index}>
                                        <Typography variant="h6" style={{ marginTop: 20 }}>Update by {update.updates_author}:</Typography>
                                        <Typography variant="body1">{update.updates_text}</Typography>
                                    </div>
                                ))}
                            </>
                        }
                    </Grid>
            }
        </div>
    )
}

export default CampaignDetails