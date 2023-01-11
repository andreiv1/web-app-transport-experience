import { Box, Stack } from "@mui/system";
import React, { useState, useEffect } from "react";
import ExperienceCard from "../components/ExperienceCard.jsx";

import NavBar from "../components/NavBar.jsx";
import { API_BASE_URL } from "../config.js";
import getUserData from "../utils/getUserData.js";

export default function MyExperiencesPage() {
  const [experiences, setExperiences] = useState([]);
  const fetchExperiences = async () => {
    const response = await fetch(
      `${API_BASE_URL}/experiences/getAll/loggedUser`,
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
