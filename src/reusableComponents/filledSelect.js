import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";

const BootstrapInput = withStyles((theme) => ({
  input: {
    width: 220,
    borderRadius: 4,
    position: "relative",
    backgroundColor: "#eeeeee",
    border: "2px solid #e0e0e0",
    marginLeft: 30,
    fontSize: 20,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

export default function CustomizedSelects(props) {
  return (
    <div>
      <FormControl>
        <Select input={<BootstrapInput />} value={props.value} name={props.name} onChange={props.onChange}>
          {
            props.options ? props.options.map((ele,index)=><MenuItem value={ele} key={index}>{ele}</MenuItem>): <MenuItem >None</MenuItem>
          }
        </Select>
      </FormControl>
    </div>
  );
}
