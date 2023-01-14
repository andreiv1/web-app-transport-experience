import React, {useState, useEffect} from 'react';
import ExperienceCard from "./ExperienceCard.jsx";
import AlertSnackBar from './AlertSnackbar.jsx';
import { API_BASE_URL } from "../config";

function ExperiencesList(props) {
    let [items, setItems] = useState([]);
    const [dataSnackbar, setDataSnackbar] = useState({});

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
          setItems(items.filter((item) => item.id !== experienceId));
          setDataSnackbar({
            message: "Your experience was deleted!",
            severity: "success"
        })
        });
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      setItems(props.items)
    }, [props.items])
    return (
        <>
            <AlertSnackBar data={dataSnackbar}/>
            {items.map((experience) => (
            <ExperienceCard
              key={experience.id}
              item={experience}
              onDelete={() => deleteExperience(experience.id)}
            />
          ))}
        </>
    )
}

export default ExperiencesList;