import React from "react";

import { Card, CardContent, Paper } from "@mui/material";

//Components
import ProfileForm from "../components/ProfileForm.jsx";
import BackgroundPage from "./BackgroundPage/BackgroundPage.jsx";

export default function ProfilePage() {
  return (
    <BackgroundPage>
      <Paper elevation={10}>
        <Card>
          <CardContent>
            {/* <Logo/> */}
            <ProfileForm />
          </CardContent>
        </Card>
      </Paper>
    </BackgroundPage>
  );
}
