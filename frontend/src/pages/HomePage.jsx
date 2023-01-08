import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";
import { Grid, Stack, TextField, Box, Button } from '@mui/material';
import ExperienceCard from '../components/ExperienceCard.jsx';
import NavBar from '../components/NavBar.jsx';
//Icons
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';

import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import BackgroundPage from "./BackgroundPage/BackgroundPage";



const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

function HomePage() {
    const [experiences, setExperiences] = useState([]);

    const fetchExperiences = async () => {
        const response = await fetch(`${API_BASE_URL}/experiences/getAll`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${localStorage.getItem('token')}`
            }
        })

        setExperiences(await response.json());
    }

    useEffect(() => {
        fetchExperiences();
    }, [])

    return (
        <>
            <NavBar />

            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 3
            }}>
                <Stack spacing={2}>
                    {experiences.map((experience) =>
                        <ExperienceCard key={experience.id} item={experience}></ExperienceCard>
                    )}
                </Stack>
            </Box>

        </>


    )
}

export default HomePage