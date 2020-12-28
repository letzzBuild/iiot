import React from "react";
import TextField from "@material-ui/core/TextField";



export default function BasicTextFields(props) {


  return (
    <form >
      <TextField variant="filled"
        label={props.text}
        size={props.size}
        style={{ width: props.width, backgroundColor: props.bgColor, color: props.color, marginLeft: props.marginLeft, fontWeight: 'bold',height:props.height }}
        disabled={props.state}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
        name={props.name}
        error={props.touched && props.error ? true : false}


      />
    </form>
  );
}
