import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

import {
    Button,
    FormControlLabel,
    FormControl,
    FormLabel,
    Grid,
    MenuItem,
    Rating,
    Select,
    Stack,
    TextField,
} from '@mui/material';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import FeelingsRatingBar from './FeelingsRatingBar.jsx';
import AlertSnackBar from "../components/AlertSnackbar";

import { getVehicleIcon } from '../utils/vehicleIcons';

function ExperienceForm() {
    const [dataSnackbar, setDataSnackbar] = useState({});

    const [linesData, setLinesData] = useState([]);
    const [lineStops, setLineStops] = useState([]);

    const [selectedLine, setSelectedLine] = useState('');
    const [departureStop, setDepartureStop] = useState('');
    const [arrivalStop, setArrivalStop] = useState('');

    const [departure, setDeparture] = useState(dayjs());
    const [tripDuration, setTripDuration] = useState('');
    const [crowdednessLevel, setCrowdednessLevel] = useState(0);
    const [satisfactionLevel, setSatisfactionLevel] = useState(0);
    const [observations, setObservations] = useState('');

    const fetchLinesStops = async (lineId) => {
        //TODO try catch
        try {
            console.log("Fetch lines stops for ", lineId)
            const response = await fetch(API_BASE_URL + `/lines/get/${lineId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${localStorage.getItem('token')}`
                },

            });

            const data = await response.json();
            setLineStops(data.stops);
        }
        catch (error) {
            console.log(error);
        }
    }
    const navigate = useNavigate();

    const handleLineChange = async (event) => {
        //Clear the fields
        setDepartureStop('');
        setArrivalStop('');

        //Fetch the stops
        fetchLinesStops(event.target.value);

        //Update the line
        setSelectedLine(event.target.value)

    }

    const handleDepartureStopChange = async (event) => {
        setDepartureStop(event.target.value)
    }

    const handleArrivalStopChange = async (event) => {
        setArrivalStop(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const payload = {
            "departureStopId": departureStop,
            "arrivalStopId": arrivalStop,
            "departure": departure,
            "tripDuration": tripDuration,
            "crowdedness": crowdednessLevel,
            "observations": observations,
            "satisfactionLevel": satisfactionLevel,
            "lineId": selectedLine
        }

        await fetch(API_BASE_URL + '/experiences/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            body: JSON.stringify(payload),
        }).then(response => {
            if (response.status == 201) {
                setDataSnackbar({
                    message: "Thank you! Your experience was shared!",
                    severity: "success"
                })
            }
            else {
                setDataSnackbar({
                    message: "Sorry, your experience couldn't be sent. Please try again later.",
                    severity: "error"
                })
            }
            return response.json()
        })
            .then(data => {
                console.log(data)
            });

        console.log(`Selected line = ${selectedLine}`);
        console.log(`Departure stop = ${departureStop}`);
        console.log(`Arrival stop = ${arrivalStop}`);
        console.log(`Trip duration = ${tripDuration}`);
        console.log(`Crowdedness = ${crowdednessLevel}`);
        console.log(`Satisfaction level = ${satisfactionLevel}`);
        console.log(`Observations = ${observations}`);
    }
    useEffect(() => {
        const fetchLines = async () => {
            try {
                const response = await fetch(API_BASE_URL + '/lines/getAll', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `bearer ${localStorage.getItem('token')}`
                    },

                });

                const data = await response.json();
                setLinesData(data);
            }
            catch (error) {
                console.log(error);
            }
        }

        fetchLines();
    }, []);

    const MenuItemsLines = linesData.map(line => (
        <MenuItem key={line.id} value={line.id}>
            {getVehicleIcon(line.vehicleType)}
            {line.name} | {line.startStop.name} - {line.endStop.name}
        </MenuItem>)
    )

    const MenuItemsSelectedLineStops = lineStops.map(stop => (
        <MenuItem key={stop.lineStop.id} value={stop.lineStop.id}>
            {stop.lineStop.name}
        </MenuItem>)
    )
    return (
        <Grid>

            <AlertSnackBar data={dataSnackbar} />
            <FormControl margin="normal" fullWidth>
                <FormLabel>Line</FormLabel>
                <Select value={selectedLine} onChange={handleLineChange}>
                    {MenuItemsLines}
                </Select>
            </FormControl>

            <FormControl margin="normal" fullWidth>
                <FormLabel>Departure stop</FormLabel>
                <Select value={departureStop} onChange={handleDepartureStopChange}>
                    {MenuItemsSelectedLineStops}
                </Select>
            </FormControl>

            <FormControl margin="normal" fullWidth>
                <FormLabel>Arrival stop</FormLabel>
                <Select value={arrivalStop} onChange={handleArrivalStopChange}>
                    {MenuItemsSelectedLineStops}
                </Select>
            </FormControl>
            <FormControl margin="normal" fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                        ampm={false}
                        label="Departure Time"
                        value={departure}
                        onChange={(newValue) => setDeparture(newValue)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </FormControl>
            <FormControl margin="normal" fullWidth>
                <TextField label="Trip Duration" variant="outlined"
                    type="number" step="1"
                    value={tripDuration}
                    onChange={(event) => setTripDuration(event.target.value)} />
            </FormControl>


            <Grid container direction="row"
                justifyContent="center"
                spacing={1}
                alignItems="stretch">
                <Grid item xs={6}>
                    <FormControl margin="normal" fullWidth required>
                        <FormLabel>Crowdedness</FormLabel>
                        <FeelingsRatingBar value={crowdednessLevel}
                            onChange={(newValue) => setCrowdednessLevel(newValue)} />

                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl margin="normal" fullWidth required>
                        <FormLabel>Satisfaction level</FormLabel>
                        <FeelingsRatingBar value={satisfactionLevel}
                            onChange={(newValue) => setSatisfactionLevel(newValue)} />
                    </FormControl>
                </Grid>
            </Grid>


            <FormControl margin="normal" fullWidth>
                <TextField
                    id="outlined-textarea"
                    label="Observations"
                    placeholder="Write about your experience.."
                    multiline
                    rows={2}
                    value={observations}
                    onChange={(event) => setObservations(event.target.value)}
                />
            </FormControl>

            <Grid
                container
                direction="row"
                justifyContent="center"
                spacing={1}
                alignItems="stretch"
            >
                <Grid item xs>
    
                </Grid>
                <Grid item xs>
                    <Button variant="contained" onClick={handleSubmit} type="submit" fullWidth>
                        Share experience
                    </Button>
                </Grid>
            </Grid>


        </Grid>
    )

}

export default ExperienceForm