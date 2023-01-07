import React from 'react';
import { Card, CardContent, CardActions, Grid, Avatar, IconButton, CardHeader } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
// import randomColor from "randomcolor";
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import FeelingsRatingBar from './FeelingsRatingBar';

import { getVehicleIcon } from '../utils/vehicleIcons';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const formatCardTitle = (vehicleType, lineName) => vehicleType + " line " + lineName
const formatDate = (date) => {
    const dateObject = new Date(date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return dateObject.toLocaleDateString('en-US', options);
}

function ExperienceCard(props) {
    const { item } = props;
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    // let color = randomColor();
    let color = 'red';
    return (
        <Card sx={{ maxWidth: 550, width: 300 }}>
            <CardHeader
                avatar={
                    <Avatar aria-label="subway-line">
                        {getVehicleIcon(item.line.vehicleType)}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={formatCardTitle(item.line.vehicleType, item.line.name)}
                subheader={formatDate(item.createdAt)}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    Departure Station: {item.departureStop.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Arrival Station: {item.arrivalStop.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Duration: {item.tripDuration} minutes
                </Typography>
                <Grid container spacing={3} sx={{mt: 0.4}}>
                    <Grid item xs="auto">
                        <Typography variant="body2" color="textSecondary" component="p" align="center">
                            Crowdedness
                        </Typography>
                        <FeelingsRatingBar value={item.crowdedness} readOnly />
                    </Grid>
                    <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary" component="p" align="center">
                            Satisfaction
                        </Typography>
                        <FeelingsRatingBar value={item.satisfactionLevel} readOnly />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default ExperienceCard;