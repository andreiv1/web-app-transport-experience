import { Box, Stack } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import { API_BASE_URL } from "../config.js";
import getUserData from "../utils/getUserData.js";
import { Typography } from "@mui/material";
import ExperiencesList from "../components/ExperiencesList.jsx"

export default function UserExperiencePage() {
  const [experiences, setExperiences] = useState([]);
  const params = useParams();
  const [userId, setUserId] = useState(params.userId)
  
  const fetchExperiences = async () => {
      console.log("exp page",userId)
      if(userId === undefined){
        console.log("undefined user on exp page")
        console.log("getUserData().id",getUserData().id)
        setUserId(getUserData().id);
      }
      const response = await fetch(
        `${API_BASE_URL}/experiences/getAll/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json()
      console.log("Experience data = ", data)
      setExperiences(data);
  }

  useEffect(() => {
    fetchExperiences();
  }, []);

  const message = () => {
    if (experiences.length > 0) {
      if (params.userId === getUserData().id) {
        return <Typography>Viewing my experiences:</Typography>
      } else {
        const user = experiences[0].user;
        return <Typography>Viewing experiences of user <b>{user.username}</b></Typography>
      }
    }
    else return <Typography>No experience found.</Typography>

  }
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
        <Stack spacing={2}>
          {message()}
          {console.log("exp page", experiences)}
          <ExperiencesList items={experiences}/>
        </Stack>
      </Box>
    </>
  );
}
