import React, { useState, useEffect } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";


export default function OperationsDropdown(props) {
  const [selectedValue, setSelectedValue] = useState("");


  const handleChange = (event) => {
    if (props.name === "component") {
      setSelectedValue(event.target.value)
      localStorage.setItem("componentName", event.target.value);

      if(localStorage.getItem("componentName")!="" && localStorage.getItem("modelName")!="" && localStorage.getItem("operationName")!="")
        {
         props.enableButton();
        }

    } else if (props.name === "modelName") {
      setSelectedValue(event.target.value);
      props.getOperations(event.target.value);
      localStorage.setItem("modelName", event.target.value);
    } else {
      setSelectedValue(event.target.value);
      localStorage.setItem("operationName", event.target.value);
      if(localStorage.getItem("componentName")!="" && localStorage.getItem("modelName")!="" && localStorage.getItem("operationName")!="")
        {
        props.enableButton();
        }
        else{
            console.log("fill all details first");
        }
    }
  };

  return (
    <div>
      <FormControl style={{ marginTop: 20 }}>
        <Select
          style={{ width: 200, color: "black" }}
          required
          onChange={handleChange}
          value={selectedValue}
          name={props.name}
        >
          {(props.name === "modelName" || props.name === "operation" ) ? (
            props.data != undefined ? (
              props.data.map((ele, index) => (
               
                <MenuItem value={ele["value"]} key={index}>
                  {ele["code"]}
                </MenuItem>
              ))
            ) : (
              <MenuItem value={"none"}>
                <em>None</em>
              </MenuItem>
            )
          ) : props.data != undefined ? (
            props.data.map((ele, index) => (
              <MenuItem value={ele} key={index}>
                {ele}
              </MenuItem>
            ))
          ) : (
            <MenuItem value={"none"}>
              <em>None</em>
            </MenuItem>
          )}
        </Select>
        <FormHelperText style={{ color: "#4615b2" }}>
          {props.helperText}
        </FormHelperText>
      </FormControl>
    </div>
  );
}
