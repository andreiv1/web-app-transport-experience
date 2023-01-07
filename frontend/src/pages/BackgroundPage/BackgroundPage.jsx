import React from "react";

import {
    Container,
    Grid,
} from "@mui/material";

//Background images
import busImage from './bg-img/bus.jpg';
import subwayImage from './bg-img/subway.jpg';
import tramImage from './bg-img/tram.jpg';


function getBackgroundImage() {
    const images = [busImage, subwayImage, tramImage];
    const randomIndex = Math.floor(Math.random() * images.length);

    return images[randomIndex];
}

export default function BackgroundPage(props) {
    return (
        <Grid
            container
            direction="column"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${getBackgroundImage()})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Container maxWidth="sm">
                {props.children}
            </Container>
        </Grid>

    );
}