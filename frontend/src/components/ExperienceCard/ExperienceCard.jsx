import React from 'react';
import { Card, CardContent, CardActions, Avatar, IconButton, CardHeader } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Typography from '@mui/material/Typography';

function ExperienceCard() {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar 
                    // sx={{ bgcolor: red[500] }} 
                    aria-label="recipe">
                        U
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title="Username"
                subheader="Date added"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    User observations
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default ExperienceCard;