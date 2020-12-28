import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

export default function RadioButtonsGroup(props) {
  return (
    <FormControl component="fieldset">
      <FormLabel
        component="legend"
        style={{ color: "#ff1744", fontWeight: "bold" }}
      >
        {props.label}
      </FormLabel>
      <RadioGroup
        name={props.name}
        value={props.value}
        required
        onChange={props.onChange}
        onBlur={props.onBlur}
        
      >
        <FormControlLabel
          value={props.option1}
          control={<Radio />}
          key={1}
          label={props.option1}
        />
        <FormControlLabel
          value={props.option2}
          control={<Radio />}
          key={2}
          label={props.option2}
        />
      </RadioGroup>
    </FormControl>
  );
}
