import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";

export default function InputComponent(props) {
  return (
    <div>
      <FormControl>
        <InputLabel
          htmlFor="my-input"
          style={{ color: "#ff1744", fontWeight: "bold" }}
        >
          {props.label}
        </InputLabel>
        <Input
          error={props.touched && props.error ? true : false}
          autoFocus={props.autofocus}
          value={props.value}
          name={props.name}
          onChange={props.onChange}
          onBlur={props.onBlur}
          style={{ width: 300, color: "black"}}
        />
        <FormHelperText
          style={{ color: "#4615b2" }}
          error={props.touched && props.error ? true : false}
        >
          {props.touched && props.error ? props.error : props.helpertext}
        </FormHelperText>
      </FormControl>
    </div>
  );
}
