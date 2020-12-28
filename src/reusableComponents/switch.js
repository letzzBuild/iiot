import React,{useState} from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import '../index.css'

export default function SwitchesGroup(props) {

  return (
    <FormControl component="fieldset" style={{marginLeft:40}}>
      <FormGroup>
        <FormControlLabel
          style={{fontFamily:"Acme"}}
          control={<Switch value={props.value} onChange={props.onChange} name={props.name} />}
          label="Enable"
        />

      </FormGroup>
    </FormControl>
  );
}
