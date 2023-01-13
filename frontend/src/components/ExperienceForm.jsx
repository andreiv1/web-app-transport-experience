import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
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
    Typography,
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

    const [createdAt, setCreatedAt] = useState('');

    const params = useParams();
    const experienceId = params.id;

    const isEditing = () => experienceId !== undefined;

    const fetchLinesStops = async (lineId) => {
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

    //Used for editing an existing experience
    const fetchExperience = async () => {
        try {
            console.log("Fetch experience");
            const response = await fetch(API_BASE_URL + `/experiences/get/${experienceId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `bearer ${localStorage.getItem("token")}`,
                },
            });

            const data = await response.json();
            console.log(data)
            setSelectedLine(data.line.id)
            await fetchLinesStops(data.line.id)
            setDepartureStop(data.departureStop.id)
            setArrivalStop(data.arrivalStop.id)
            setDeparture(data.departure)
            setTripDuration(data.tripDuration)
            setCrowdednessLevel(data.crowdedness)
            setSatisfactionLevel(data.satisfactionLevel)
            setObservations(data.observations)
            setCreatedAt(data.createdAt)
        } catch (error) {
            console.log(error);
        }
    };
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
        if (isEditing()) {
            await fetch(API_BASE_URL + `/experiences/edit/${experienceId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                body: JSON.stringify(payload),
            }).then(response => {
                if (response.status == 200) {
                    setDataSnackbar({
                        message: "Your experience was updated succesfuly!",
                        severity: "success"
                    })
                }
                else {
                    setDataSnackbar({
                        message: "Sorry, your experience couldn't be updated. Please try again later.",
                        severity: "error"
                    })
                }
                return response.json()
            })
                .then(data => {
                    console.log(data)
                });
        }
        else {


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
        }

        console.log(`Selected line = ${selectedLine}`);
        console.log(`Departure stop = ${departureStop}`);
        console.log(`Arrival stop = ${arrivalStop}`);
        console.log(`Trip duration = ${tripDuration}`);
        console.log(`Crowdedness = ${crowdednessLevel}`);
        console.log(`Satisfaction level = ${satisfactionLevel}`);
        console.log(`Observations = ${observations}`);
    }
    useEffect(() => {
        if (experienceId != undefined) {
            //Edit page, auto fill
            console.log(`Edit page = ${experienceId}`)
            fetchExperience();
        }
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
            <Stack direction="row" spacing={2} justifyContent="left"
                alignItems="center">
                {getVehicleIcon(line.vehicleType)}
                {line.name} | {line.startStop.name} - {line.endStop.name}
            </Stack>
        </MenuItem>)
    )

    const MenuItemsSelectedLineStops = lineStops.map(stop => (
        <MenuItem key={stop.lineStop.id} value={stop.lineStop.id}>
            {stop.lineStop.name}
        </MenuItem>)
    )

    const [lineNotEmpty, setLineNotEmpty] = useState(true);

    const checkLineEmpty = () => {
        if (selectedLine != '') {
            setLineNotEmpty(false);
        }
    }

    const [departureNotEmpty, setDepartureNotEmpty] = useState(true);

    const checkDepartureEmpty = () => {
        if (departureStop != '') {
            setDepartureNotEmpty(false);
        }
    }


    const [arrivalNotEmpty, setArrivalNotEmpty] = useState(true);

    const checkArrivalEmpty = () => {
        if (arrivalStop != '') {
            setArrivalNotEmpty(false);
        }
    }

    const [timeNotEmpty, setTimeNotEmpty] = useState(false);

    const [durationNegative, setDurationNegative] = useState(true);

    const checkDurationNegative = (val) => {
        if (val > 0) {
            setDurationNegative(false);
        }
    }

    const [crowdednessNotEmpty, setCrowdednessNotEmpty] = useState(true);

    const checkCrowdednessEmpty = (val) => {
        if (val != '') {
            setCrowdednessNotEmpty(false);
        }
    }

    const [satisfactionNotEmpty, setSatisfactionNotEmpty] = useState(true);

    const checkSatisfactionEmpty = (val) => {
        if (val != '') {
            setSatisfactionNotEmpty(false);
        }
    }

    const formatDate = (date) => {
        const dateObject = new Date(date);
        const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" };
        return `Editing experience you created on ${dateObject.toLocaleDateString("en-GB", options)}`;
    };

    return (
        <Grid>
            {
                isEditing() ?
                    (<Typography>{formatDate(createdAt)}</Typography>)
                    :
                    (<Typography>Fill in the details about your experience below.</Typography>)
            }
            <AlertSnackBar data={dataSnackbar} />
            <FormControl margin="normal" fullWidth>
                <FormLabel>Line</FormLabel>
                <Select value={selectedLine} onChange={handleLineChange} onBlur={checkLineEmpty}>
                    {MenuItemsLines}
                </Select>
            </FormControl>

            <FormControl margin="normal" fullWidth>
                <FormLabel>Departure stop</FormLabel>
                <Select value={departureStop} onChange={handleDepartureStopChange} disabled={lineNotEmpty && !isEditing()} onBlur={checkDepartureEmpty}>
                    {MenuItemsSelectedLineStops}
                </Select>
            </FormControl>

            <FormControl margin="normal" fullWidth>
                <FormLabel>Arrival stop</FormLabel>
                <Select value={arrivalStop} onChange={handleArrivalStopChange} disabled={lineNotEmpty && !isEditing()} onBlur={checkArrivalEmpty}>
                    {MenuItemsSelectedLineStops}
                </Select>
            </FormControl>
            <FormControl margin="normal" fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                        ampm={false}
                        label="Departure Time"
                        value={departure}
                        onChange={
                            (newValue) => {
                                setDeparture(newValue)
                                if (newValue !== null) {
                                    setTimeNotEmpty(false);
                                }
                            }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </FormControl>
            <FormControl margin="normal" fullWidth>
                <TextField label="Trip Duration" variant="outlined"
                    type="number" step="1"
                    value={tripDuration}
                    onChange={
                        (event) => {
                            setTripDuration(event.target.value);
                            checkDurationNegative(event.target.value);
                        }}
                />
            </FormControl>


            <Grid container direction="row"
                justifyContent="center"
                spacing={1}
                alignItems="stretch">
                <Grid item xs={6}>
                    <FormControl margin="normal" fullWidth required>
                        <FormLabel>Crowdedness</FormLabel>
                        <FeelingsRatingBar value={crowdednessLevel}
                            onChange={
                                (newValue) => {
                                    setCrowdednessLevel(newValue);
                                    checkCrowdednessEmpty(newValue);
                                }} />

                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl margin="normal" fullWidth required>
                        <FormLabel>Satisfaction level</FormLabel>
                        <FeelingsRatingBar value={satisfactionLevel}
                            onChange={
                                (newValue) => {
                                    setSatisfactionLevel(newValue);
                                    checkSatisfactionEmpty(newValue);
                                }} />
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
                    <Button variant="contained" onClick={handleSubmit} type="submit" fullWidth
                        disabled={lineNotEmpty || departureNotEmpty || arrivalNotEmpty || timeNotEmpty || durationNegative || crowdednessNotEmpty || satisfactionNotEmpty}>
                        Share experience
                    </Button>
                </Grid>
            </Grid>



        </Grid>
    )

}

export default ExperienceForm