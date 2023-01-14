import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";
import { Box, Stack } from "@mui/material";
import NavBar from "../components/NavBar.jsx";
import SearchBar from "../components/SearchBar";
import ExperiencesList from "../components/ExperiencesList.jsx"
import {Typography} from "@mui/material";

function HomePage() {
  const [experiences, setExperiences] = useState([]);

  const fetchExperiences = async () => {
    const response = await fetch(`${API_BASE_URL}/experiences/getAll`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
    });

    setExperiences(await response.json());
  };

  const searchExperiences = async (searchQuery) => {
      console.log("searched=",searchQuery)

      const response = await fetch(`${API_BASE_URL}/experiences/search?q=${searchQuery}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });
      const json = await response.json()
      setExperiences(json.result);
      console.log(experiences);
;
  }
  useEffect(() => {
    fetchExperiences();
  },[]);

  return (
    <>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 3,
        }}
      >
        <Stack spacing={2} sx={{ maxWidth: 550, width: 400 }}>
          <SearchBar onChange={(e)=>{searchExperiences(e.target.value)}} />
          {experiences.length ?  
          (<ExperiencesList items={experiences}/>)
          :
          (<Typography>Nothing found.</Typography>)
          }
        </Stack>
      </Box>
    </>
  );
}

export default HomePage;
