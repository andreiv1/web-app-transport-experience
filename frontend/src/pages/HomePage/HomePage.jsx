import React from 'react';
import Button from '@mui/material/Button';
import ExperienceCard from '../../components/ExperienceCard/ExperienceCard';
import { Stack, TextField } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import "./HomePage.css";
function HomePage() {

    return (
        <div>
            <Stack direction="row" spacing={2}>
                <div id="searchBox" className="searchBox">
                    <TextField 
                    label="Search..."
                    size="small"
                    margin="normal"
                    />
                    <Button id="search"
                    variant="outlined"
                    size="small"
                    ><SearchIcon/></Button>
                </div>
                <div id="buttons" className="buttons">
                    <Button  id="btnAddExperience" variant="outlined" startIcon={<AddCircleIcon />}>
                        Add experience
                    </Button>
                    <Button  id="btnAdmin"  variant="contained" endIcon={<SettingsIcon />}>
                        Admin Settings
                    </Button> 
                </div>
            </Stack>
            <ExperienceCard />
        </div>
    )
}

export default HomePage;