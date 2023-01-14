import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import {
  Card,
  CardContent,
  CardActions,
  Grid,
  Avatar,
  IconButton,
  CardHeader,
  Stack
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import { styled } from "@mui/material/styles";
import FeelingsRatingBar from "./FeelingsRatingBar";

import { getVehicleIcon } from "../utils/vehicleIcons";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import getUserData from "../utils/getUserData";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const formatCardTitle = (user, vehicleType, lineName) =>
  <><a href={`./experiences/${user.id}`}><b>{user.username}</b></a> travelled with <u>{vehicleType}</u> on line <b>{lineName}</b></>

const formatDate = (date) => {
  const dateObject = new Date(date);
  const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" };
  return `added on ${dateObject.toLocaleDateString("en-GB", options)}`;
};

const formatDeparture = (departure) => {
  const dateObject = new Date(departure)
  return dateObject.toLocaleTimeString("en-GB", { hour: "numeric", minute: "numeric" })
}

function ExperienceCard(props) {
  const navigate = useNavigate();
  const [anchorElement, setAnchorElement] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorElement);

  const handleEditMenuOpen = (event) => {
    setAnchorElement(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorElement(null);
    handleMobileMenuClose();
  };

  const deleteExperience = async (experienceId) => {
    try {
      console.log("Deleted experience ", experienceId);
      await fetch(API_BASE_URL + `/experiences/delete/${experienceId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      }).then(() => {
        console.log("Experience deleted");
      });
    } catch (error) {
      console.log(error);
    }
  };

  const { item } = props;
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorElement}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          handleMenuClose();
          navigate(`/editExperience/${item.id}`);
        }}
      >
        Edit
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          //TODO
          deleteExperience(item.id);

        }}
      >
        Delete
      </MenuItem>
    </Menu>
  );

  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const row = (label, text) => (<Grid container spacing={1} sx={{ mb: 0.3 }}
    direction="row"
    justify="flex-end"
    alignItems="center">
    <Grid item xs={4} >
      <Typography variant="body2" color="textSecondary" component="p">
        {label}
      </Typography>
    </Grid>
    <Grid item xs={8}>
      <Typography variant="body2" color="textSecondary" component="p">
        {text}
      </Typography>
    </Grid>
  </Grid>)

  const settingsButton = () => {
    if(getUserData().id !== item.user.id) {
      return (<></>)
    }
    //User owns the experience
    return (<IconButton aria-label="settings" onClick={handleEditMenuOpen}>
      <MoreVertIcon />
    </IconButton>)
  }

  return (
    <Card sx={{ maxWidth: 550, width: 400 }}>
      <CardHeader
        avatar={
          <Avatar aria-label="subway-line">
            {getVehicleIcon(item.line.vehicleType)}
          </Avatar>
        }
        action={settingsButton()}
        title={formatCardTitle(item.user, item.line.vehicleType, item.line.name)}
        subheader={formatDate(item.createdAt)}
      />
      <CardContent>
        <Stack sx={{ mt: -3 }}>
          {row('Departure:', item.departureStop.name)}
          {row('Arrival:', item.arrivalStop.name)}
          {row('Departure time:', formatDeparture(item.departure))}
          {row('Duration:', `${item.tripDuration} minutes`)}
          {row('Crowdedness:', <FeelingsRatingBar value={item.crowdedness} readOnly />)}
          {row('Satisfaction:', <FeelingsRatingBar value={item.satisfactionLevel} readOnly />)}
        </Stack>
      </CardContent>
      {(item.observations.length > 0) ? (
        <CardActions sx={{ mt: -4 }}>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
      ) : (<></>)}

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">Observations:</Typography>
          <Typography variant="body2" color="textSecondary" component="p">{item.observations}</Typography>
        </CardContent>
      </Collapse>
      {renderMenu}
    </Card>
  );
}

export default ExperienceCard;
