import React from 'react';
import Button from '@mui/material/Button';
import ExperienceCard from '../../components/ExperienceCard/ExperienceCard';
import { Stack, TextField } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';

function HomePage() {

    return (
        <div>
            <Stack direction="row" spacing={2}>
                <div className="searchBox">
                    <TextField/>
                    <Button variant="outlined"><SearchIcon/></Button>
                </div>
                <div className="buttons">
                    <Button variant="outlined" startIcon={<AddCircleIcon />}>
                        Add experience
                    </Button>
                    {/* <Button variant="contained" endIcon={<SettingsIcon />}>
                        Admin Settings
                    </Button> */}
                </div>
            </Stack>
            <ExperienceCard />
        </div>
    )
}

export default HomePage;