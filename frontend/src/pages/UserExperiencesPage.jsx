import { Box, Stack } from "@mui/system";
import React, { useState, useEffect } from "react";
import ExperienceCard from "../components/ExperienceCard.jsx";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import { API_BASE_URL } from "../config.js";
import getUserData from "../utils/getUserData.js";
import { Typography } from "@mui/material";

export default function UserExperiencePage() {
  const [experiences, setExperiences] = useState([]);
  const params = useParams();
  const fetchExperiences = async () => {
    const response = await fetch(
      `${API_BASE_URL}/experiences/getAll/${params.userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setExperiences(await response.json());
  };

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
          {experiences.map((experience) => (
            <ExperienceCard
              exp={experience}
              key={experience.id}
              item={experience}
            ></ExperienceCard>
          ))}
        </Stack>
      </Box>
    </>
  );
}
