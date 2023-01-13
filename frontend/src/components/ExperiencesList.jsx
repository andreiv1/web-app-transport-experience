import React, {useState, useEffect} from 'react';
import ExperienceCard from "./ExperienceCard.jsx";

function ExperiencesList(props) {
    let [items, setItems] = useState([]);

    useEffect(() => {
      setItems(props.items)
    }, [props.items])
    return (
        <>
        {console.log("list items,",items)}
            {items.map((experience) => (
            <ExperienceCard
              key={experience.id}
              item={experience}
            ></ExperienceCard>
          ))}
        </>
    )
}

export default ExperiencesList;