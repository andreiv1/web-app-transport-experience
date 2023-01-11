import React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  }
}));

const simpleIcons = [
  <SentimentVeryDissatisfiedIcon />,
  <SentimentDissatisfiedIcon />,
  <SentimentSatisfiedIcon />,
  <SentimentSatisfiedAltIcon />,
  <SentimentVerySatisfiedIcon />
]
const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};



export default function FeelingsRatingBar(props) {
  const [rateValue, setRateValue] = useState(props.value);
  const [readOnly, setReadOnly] = useState(props.readOnly);

  function RenderSmileyIcons() {
    let icons = [];
    for (let i = 1; i <= 5; i++) {
      if (i === rateValue) {
        icons.push(customIcons[i].icon)
      } else {
        icons.push(simpleIcons[i-1]);
      }
    }
    return icons.map((icon,index)=><span key={index}>{icon}</span>)
  }

  useEffect(() => {
    setRateValue(props.value);
  }, [props.value]);

  const handleChange = (event, newValue) => {
    setRateValue(newValue);
    props.onChange(newValue);
  }

  if (readOnly) {
    return <>{RenderSmileyIcons()}</>
  } else {
    return (<StyledRating
      name="highlight-selected-only"
      value={rateValue}
      onChange={handleChange}
      IconContainerComponent={IconContainer}
      getLabelText={(value) => customIcons[value].label}
      highlightSelectedOnly
    />)
  }
}