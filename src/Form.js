import * as React from 'react';
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, IconButton, InputLabel, MenuItem, OutlinedInput, Radio, RadioGroup, Rating, Select, Slider, Tooltip, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { grey } from '@mui/material/colors';

// Form needs:
// title
// fields

// Form wants:
// avatar
// subheader
// backgroundColor
// color (text & icons)

// Field types:
  // 1: Basic input text
  // 2: Checkboxes
  // values is a list of checkbox names
export default function Form({ form, handleRemove, setRewardForm, totalPapers, setTotalPapers, brightnessMode }) {

  const colorConvert = {
    blue: 'primary',
    purple: 'secondary',
    green: 'success',
    orange: 'warning',
    red: 'error',
    gray: 'default'
  }

  // const errorMsg = {
  //   input: 'Required',
  //   checkboxes: 'Choose at least one',
  //   radiogroup: 'Choose one',
  //   select: 'Required'
  // }

  const colorToBG = {

  }

  const bgColor = colorToBG[form.color] || brightnessMode === 'dark' ? grey[900] : grey[50];
  const color = colorConvert[form.color || 'blue'];
  const title = form.title || 'Form';
  const avatar = form.avatar;

  const [errors, setErrors] = React.useState([]);
  const [errorMsg] = React.useState({});
  const [fields] = React.useState(form.fields);
  const [state, setState] = React.useState({});
  const [iconHover, setIconHover] = React.useState(false);
  const [z, setZ] = React.useState(false);

  React.useEffect(() => {
    fields.forEach(f => {
      if(f.type === 'input') state[f.name] = '';
      else if(f.type === 'checkboxes') state[f.name] = [];
      else if(f.type === 'radios') state[f.name] = '';
      else if(f.type === 'rating') state[f.name] = [0,0];
      else if(f.type === 'select') state[f.name] = '';
      else if(f.type === 'slider'){
        if(f.range) state[f.name] = [[0,0],0];
        else state[f.name] = [0,0];
      }
      else state[f.name] = '';
    });
  }, [fields, state]);
  
  const submit = () => {
    let e = [];
    fields.forEach((f) => {
      if(f.type === 'input'){
        if(state[f.name] === ''){
          e.push(f.name);
          errorMsg[f.name] = 'Required';
        }
      }
      if(f.type === 'checkboxes'){
        if(state[f.name].length === 0){
          e.push(f.name);
          errorMsg[f.name] = 'Choose at least one';
        }
      }
      if(f.type === 'radios'){
        if(state[f.name] === ''){
          e.push(f.name);
          errorMsg[f.name] = 'Choose one';
        }
      }
      if(f.type === 'select'){
        if(state[f.name] === ''){
          e.push(f.name);
          errorMsg[f.name] = 'Required';
        }
      }
    });
    if(e.length === 0){
      setTotalPapers(totalPapers + 1);
      handleRemove();
      setRewardForm(form);
    }
    else setErrors(e);
  }

  return (
  <Card sx={{bgcolor: bgColor, width: 511, mt: 2, mb: '50vh'}}>
    <CardHeader
      avatar={ !avatar ? <></> : 
        <Avatar sx={{ bgcolor: form.color || '' }}>
          {avatar}
        </Avatar>
      }
      title={<Typography variant='h5'>{title}</Typography>}
      subheader={form.subheader || ''}
      action={
        <Tooltip title='Remove Form'><span>
          <IconButton disabled={title.includes('Fiona') || title.includes('Brandon') || title.includes('Second Website')} color={iconHover ? color : 'default'} onClick={handleRemove} onMouseOver={() => setIconHover(true)} onMouseOut={() => setIconHover(false)}>
            <DeleteIcon fontSize='large' />
          </IconButton>
          </span></Tooltip>
      }
    />
    <CardContent sx={{ml: `4ch`}}>
      {
        fields.map((field) => (
          <Box key={field.name} sx={{my: 1}}>
          { field.type === 'input' ?
          <FormControl size='small' color={color} key={field.name} variant='outlined' error={errors.includes(field.name)} sx={{width: `50ch`}}>
            <InputLabel>{field.name}</InputLabel>
            <OutlinedInput
              size='small'
              label={field.name}
              value={field.name in state ? state[field.name] : ''}
              onChange={(e) => {
                setErrors(errors.filter(er => er !== field.name));
                let p = state;
                p[field.name] = e.target.value;
                setState(p);
              }}
            />
            <FormHelperText sx={{mt: -0.3, mb: -1.5}}>{errors.includes(field.name) ? errorMsg[field.name] : ' '}</FormHelperText>
          </FormControl>
          : field.type === 'checkboxes' ?
          // field.values = ['banana', 'grape', 'apple']
          <FormControl key={field.name} error={errors.includes(field.name)}>
            <FormLabel color={color}>{field.name}</FormLabel>
            <FormGroup>
              {
              (z ? field.values : field.values).map((value) => (
                <FormControlLabel
                  key={value}
                  control={ <Checkbox 
                              color={color}
                              sx={{my: -0.8}}
                              checked={field.name in state && state[field.name].includes(value)}
                              onChange={() => {
                                setErrors(errors.filter(er => er !== field.name));
                                setZ(!z);
                                let p = state;
                                if(p[field.name].includes(value)) p[field.name] = p[field.name].filter(a => a !== value);
                                else p[field.name].push(value);
                                setState(p);
                              }}
                              name={value}
                            /> }
                  label={value}
                />
              ))
              }
            </FormGroup>
            <FormHelperText sx={{mt: -0.8, mb: -1.5}}>{errors.includes(field.name) ? errorMsg[field.name] : ' '}</FormHelperText>
          </FormControl>
          : field.type === 'radios' ?
          // field.values = ['banana', 'grape', 'apple']
          // field.row = true
          <FormControl color={color} key={field.name} error={errors.includes(field.name)}>
            <FormLabel sx={{mb: -1}}>{field.name}</FormLabel>
            <RadioGroup
              sx={{mb: -1}}
              name={field.name}
              value={field.name in state ? state[field.name] : ''}
              row={field.row}
              onChange={(e) => {
                setErrors(errors.filter(er => er !== field.name));
                setZ(!z);
                let p = state;
                p[field.name] = e.target.value;
                setState(p);
              }}
            >
            {
              (z ? field.values : field.values).map((value) => (
                <FormControlLabel
                  key={value}
                  value={value}
                  label={value}
                  control={<Radio color={color} />}
                />
              ))
            }
            </RadioGroup>
            <FormHelperText sx={{mt: -0.5, mb: -1.5}}>{errors.includes(field.name) ? errorMsg[field.name] : ' '}</FormHelperText>
          </FormControl>
          : field.type === 'rating' ?
          <span key={field.name}>
            <Typography color={field.name in state && state[field.name][1] !== -1 ? color : 'default'}>{field.name}</Typography>
            <Rating
              color={color}
              sx={{mb: 0.7}}
              precision={0.5}
              value={field.name in state ? state[field.name][0] : 0}
              onChange={(e, val) => {
                setZ(!z);
                let p = state;
                p[field.name][0] = val;
                setState(p);
              }}
              onChangeActive={(e, val) => {
                setZ(!z);
                let p = state;
                p[field.name][1] = val;
                setState(p);
              }}
            />
          </span>
          : field.type === 'select' ?
          <FormControl size='small' color={color} key={field.name} variant='outlined' error={errors.includes(field.name)} sx={{width: `50ch`}}>
            <InputLabel>{field.name}</InputLabel>
                <Select
                  size='small'
                  label={field.name}
                  value={field.name in state ? state[field.name] : ''}
                  onChange={(e) => {
                    setErrors(errors.filter(er => er !== field.name));
                    let p = state;
                    p[field.name] = e.target.value;
                    setState(p);
                  }}
                >
                {
                  (z ? field.values : field.values).map((value) => (
                    <MenuItem value={value} key={value}>{value}</MenuItem>
                  ))
                }
                </Select>
                <FormHelperText sx={{mt: -0.3, mb: -1.5}}>{errors.includes(field.name) ? errorMsg[field.name] : ' '}</FormHelperText>
          </FormControl>
          : field.type === 'slider' ? 
          <span key={field.name}>
            <Typography color={field.name in state && state[field.name][1] === 1 ? color : 'default'} sx={{mb: -0.5}}>{field.name}</Typography>
            <Slider
              sx={{width: '50ch'}}
              valueLabelDisplay={'auto'}
              color={color}
              step={field.step ? field.step : 1}
              min={field.min ? field.min : 0}
              max={field.max ? field.max : 0}
              value={field.name in state ? state[field.name][0] : 0}
              onChange={(e,val) => {
                setZ(!z);
                let p = state;
                p[field.name][0] = val;
                p[field.name][1] = 1;
                setState(p);
              }}
              onChangeCommitted={(e,val) => {
                setZ(!z);
                let p = state;
                p[field.name][1] = 0;
                setState(p);
              }}
            />
          </span>
          : <></> }
          </Box>
        ))
      }
    </CardContent>
    <CardActions sx={{ml: `24.5ch`, my: `1ch`}}>
      <Button variant='contained' onClick={submit} color={color}>Submit</Button>
    </CardActions>
  </Card>
  )
}