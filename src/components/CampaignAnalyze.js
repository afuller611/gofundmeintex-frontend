import React from 'react'
import { Grid, Card, CardContent, Typography, TextField, FormControlLabel, Checkbox, FormControl, Radio, Button, CircularProgress } from '@material-ui/core'
import axios from 'axios';
import { CheckCircle } from '@material-ui/icons'
import '../custom.css'

const currencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'CHF', 'SEK', 'NOK', 'DKK']
const categories = ['Accidents & Emergencies', 'Animals & Pets', 'Babies Kids & Family', 'Business & Entrepreneurs', 'Celebrations & Events', 'Community & Neighbors', 'Creative Arts Music & Film', 'Funerals & Memorials', 'Travel & Adventure', 'Medical Illness & Healing', 'Missions Faith & Church', 'Weddings & Honeymoons', 'Sports Teams & Clubs', 'Education & Learning', 'Volunteer & Service', 'Competitions & Pageants', 'Dreams Hopes & Wishes', 'Other']

const CampaignAnalyze = (props) => {
    const [state, setState] = React.useState({
        goal: "",
        description: "",
        title: "",
        currencyCode: "",
        category: "",
        autoFbPost: false,
        isCharity: false,
        visibleInSearch: false,
        mediaType: 0,
    })


    const [notNumber, setNotNumber] = React.useState(false)

    const [loading, setLoading] = React.useState(false)

    const [result, setResult] = React.useState("")

    const handleSubmit = (e) => {
        setNotNumber(false)
        setResult("")
        e.preventDefault()
        if (isNaN((parseInt(state.goal)))) {
            setNotNumber(true)
            return
        }
        setLoading(true)
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/analyzeCampaign`, state).then((res) => {
            setResult(res.data)
        }).catch((err) => console.log(err)).finally(() => setLoading(false))
    }

    return (
        <div style={{ padding: "20px 40px" }}>
            <Grid container direction="column">
                <Typography variant="h3" style={{ marginBottom: 20 }}>{"Analyze a Potential Campaign"}</Typography>
                <Typography variant="subtitle1">We've developed a model to indicate how well your GoFundMe campaign would do based on several criteria</Typography>
                <Typography variant="subtitle1">Fill in the following fields and click submit to see your results</Typography>
                <Typography variant="subtitle2" style={{ marginTop: 20 }}>The data used to make this prediction was in English and Italian - this prediction will only be accurate using one of those two languages</Typography>
                <Card style={{ backgroundColor: "#deeaf7", marginTop: 30, maxWidth: 1000 }}>
                    <CardContent >
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <Grid container justify="space-between" spacing={3}>
                                <Grid item xs={6}>
                                    <TextField value={state.goal} onChange={(e) => setState({ ...state, goal: e.target.value })} required style={{ backgroundColor: "white", borderRadius: 4 }} fullWidth variant="outlined" label="Campaign Goal" />
                                    {notNumber && <Typography variant="caption" style={{ color: "red" }}>Campaign Goal must be a number (remove any commas)</Typography>}
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField required value={state.currencyCode} onChange={(e) => setState({ ...state, currencyCode: e.target.value })} select SelectProps={{ native: true }} style={{ backgroundColor: "white", borderRadius: 4 }} fullWidth variant="outlined" label="Currency Code">
                                        <option value="" />
                                        {currencies.map((currency, index) => (
                                            <option key={index} value={currency}>{currency}</option>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField required value={state.category} onChange={(e) => setState({ ...state, category: e.target.value })} select SelectProps={{ native: true }} style={{ backgroundColor: "white", borderRadius: 4 }} fullWidth variant="outlined" label="Category" >
                                        {/* the category field in the original DB was often "unknown" so we took the category id and looked in GoFundMe to get the real categories */}
                                        <option value="" />
                                        {categories.map((category, index) => (
                                            <option key={index} value={category}>{category}</option>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField value={state.title} onChange={(e) => setState({ ...state, title: e.target.value })} required style={{ backgroundColor: "white", borderRadius: 4 }} fullWidth variant="outlined" label="Campaign Title" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField value={state.description} onChange={(e) => setState({ ...state, description: e.target.value })} required style={{ backgroundColor: "white", borderRadius: 4 }} multiline rows={4} fullWidth variant="outlined" label="Campaign Description" />
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography style={{ marginBottom: 20 }}>Check the following if:</Typography>
                                    <FormControlLabel
                                        style={{ marginBottom: 20 }}
                                        control={
                                            <Checkbox
                                                checked={state.isCharity}
                                                onChange={(e) => setState({ ...state, isCharity: e.target.checked })}
                                                name="isCharity"
                                            />
                                        }
                                        label="The campaign will be created by a charity"
                                    />
                                    <FormControlLabel
                                        style={{ marginBottom: 20 }}
                                        control={
                                            <Checkbox
                                                checked={state.autoFbPost}
                                                onChange={(e) => setState({ ...state, autoFbPost: e.target.checked })}
                                                name="autoFbPost"
                                            />
                                        }
                                        label="Donations will post automatically to Facebook"
                                    />
                                    <FormControlLabel
                                        style={{ marginBottom: 20 }}
                                        control={
                                            <Checkbox
                                                checked={state.visibleInSearch}
                                                onChange={(e) => setState({ ...state, visibleInSearch: e.target.checked })}
                                                name="isCharity"
                                            />
                                        }
                                        label="The campaign will be searchable"
                                    />

                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container direction="column">
                                        <FormControl
                                            required
                                            style={{ marginBottom: 20 }}>
                                            <Typography style={{ marginBottom: 10 }}>What Media Type will the campaign feature?</Typography>
                                            <FormControlLabel control={
                                                <Radio checked={parseInt(state.mediaType) === 0} value={0} onChange={(e) => setState({ ...state, mediaType: e.target.value })} />
                                            }
                                                label="Video" />
                                            <FormControlLabel control={
                                                <Radio checked={parseInt(state.mediaType) === 3} value={3} onChange={(e) => setState({ ...state, mediaType: e.target.value })} />
                                            }
                                                label="Image" />
                                        </FormControl>
                                        <TextField label="Language" variant="outlined" style={{ backgroundColor: "white", borderRadius: 4 }} required select SelectProps={{ native: true }} value={state.language} onChange={(e) => setState({ ...state, language: e.target.value })}>
                                            <option value="" />
                                            <option value="english">English</option>
                                            <option value="italian">Italian</option>
                                        </TextField>
                                    </Grid>
                                </Grid>
                                <Grid style={{ margin: 40 }} container justify="space-between">
                                    {loading ? <Grid container justify="center"><CircularProgress color="secondary" /></Grid> :
                                        <Button size="large" style={{ color: "white", padding: 20, fontSize: 24 }} variant="contained" color="secondary" type="submit">Analyze Campaign</Button>
                                    }
                                    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                                        {result && <CheckCircle className="final-check-symbol" color="secondary" style={{ fontSize: 40 }} />}
                                        {result && <Typography style={{ marginBottom: 20 }} variant="h4" color="secondary">{result}%</Typography>}
                                        {result && <Typography variant="body1">This means that we expect you to gain {parseFloat(result).toFixed(3)}% of your goal each day.</Typography>}
                                    </div>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </div>
    )
}

export default CampaignAnalyze