import React from 'react';
import { Card, CardContent, CardActions, Avatar, IconButton, CardHeader } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import randomColor from "randomcolor";
import "./ExperienceCard.css";

function ExperienceCard() {
    let color = randomColor();
    return (
        <Card id="experienceCard" sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar
                        sx={{ bgcolor: color }}
                        aria-label="user">
                        <PersonIcon />
                    </Avatar>
                }
                // action={
                //     <IconButton aria-label="settings">
                //         {/* <MoreVertIcon /> */}
                //     </IconButton>
                // }
                title="Username"
                subheader="Date added"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary" align='center'>
                    User .... travelled on line ......... from ...... to ... in ......... minutes.
                </Typography>
                <Typography variant="body2" color="text.secondary" align='center'>
                    User observations
                </Typography>
                <Typography variant="body2" color="text.secondary" align='left'>
                    Crowdedness
                </Typography>
                <Typography variant="body2" color="text.secondary" align='left'>
                    Satisfaction level
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="share"
                sx={{ '&:hover': { color: 'blue'} }}>
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default ExperienceCard;