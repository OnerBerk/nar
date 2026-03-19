import React from 'react';

import {ActivityLevelEnum} from '@/types';

import {FormControl, FormControlLabel, Radio, RadioGroup, Typography} from '@mui/material';

type ActivityLevelSelectorProps = {
  value: ActivityLevelEnum;
  onChange: (next: ActivityLevelEnum) => void;
};

const ActivityLevelSelector: React.FC<ActivityLevelSelectorProps> = ({value, onChange}) => {
  return (
    <FormControl component='fieldset' fullWidth>
      <Typography variant='subtitle1' sx={{mb: 1}}>
        Niveau d’activité
      </Typography>
      <RadioGroup row value={value} onChange={(e) => onChange(e.target.value as ActivityLevelEnum)}>
        <FormControlLabel
          value={ActivityLevelEnum.Sedentary}
          control={<Radio sx={{color: 'text.primary', '&.Mui-checked': {color: 'primary.dark'}}} />}
          label='Sédentaire'
        />
        <FormControlLabel
          value={ActivityLevelEnum.Light}
          control={<Radio sx={{color: 'text.primary', '&.Mui-checked': {color: 'primary.dark'}}} />}
          label='Légère'
        />
        <FormControlLabel
          value={ActivityLevelEnum.Moderate}
          control={<Radio sx={{color: 'text.primary', '&.Mui-checked': {color: 'primary.dark'}}} />}
          label='Modérée'
        />
        <FormControlLabel
          value={ActivityLevelEnum.Intense}
          control={<Radio sx={{color: 'text.primary', '&.Mui-checked': {color: 'primary.dark'}}} />}
          label='Intense'
        />
      </RadioGroup>
    </FormControl>
  );
};

export default ActivityLevelSelector;
