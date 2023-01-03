import React from 'react';
import { styled } from '@mui/material/styles';
import { TextField, Select, MenuItem, Rating, FormLabel, Button } from '@mui/material';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import TramIcon from '@mui/icons-material/Tram';
import SubwayIcon from '@mui/icons-material/Subway';

import FeelingsRatingBar from '../FeelingsRatingBar/FeelingsRatingBar';
import './AddExperienceForm.css';


export default function AddExperienceForm() {

    return (
        <div className='add-experience-form'>
            <FormLabel>Line</FormLabel>
            <Select id="linesSelect">
                <MenuItem value="option1"><TramIcon />1</MenuItem>
                <MenuItem value="option2"><DirectionsBusIcon />133</MenuItem>
                <MenuItem value="option3"><SubwayIcon />M2</MenuItem>
            </Select>
            <FormLabel>Departure stop</FormLabel>
            <Select id="departuresStopSelect">
                <MenuItem value="option1">A departure stop..</MenuItem>
            </Select>
            <FormLabel>Arrival stop</FormLabel>
            <Select id="arrivalStopSelect">
                <MenuItem value="option1">A departure arrival..</MenuItem>
            </Select>
            <FormLabel>Arrival stop</FormLabel>
            <TextField id="durationTextField" label="Trip Duration" variant="outlined"
                type="number" step="1" />

            <FormLabel>Crowdedness</FormLabel>
            <FeelingsRatingBar
                id="crowdednessRatingBar"
                name="highlight-selected-only"
                defaultValue={3}
                highlightSelectedOnly
            />
            <TextField label="Observations" />
            <FormLabel>Satisfaction Level</FormLabel>
            <FeelingsRatingBar
                id="satisfactionLevelRatingBar"
                name="highlight-selected-only"
                defaultValue={3}
                highlightSelectedOnly
            />


            <Button id="cancelButton" variant="contained" size="medium">Cancel</Button>
            <Button id="saveButton" variant="outlined" size="medium">Save</Button>


        </div>
    )
}

