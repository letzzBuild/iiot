import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '../reusableComponents/inputTextField.js';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    marginTop:6
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  
}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  // const [selectedValue, setselectedValue] = useState("")
  // const [showTextBox, setshowTextBox] = useState(false)

  // const handleChange = (event) => {
  //   setselectedValue(event.target.value);
  //   if(event.target.value==="others")
  //   {
  //     setshowTextBox(true);
  //   }
  //   else{
  //     setshowTextBox(false);
  //   }
  // };

  return (
    <div>

      <FormControl className={classes.formControl}>
      <InputLabel   style={{color:"#ff1744",fontWeight:"bold"}}>{props.label}</InputLabel>
        <Select
          style={{width:props.width,color:'black'}}
          id="demo-simple-select-helper"
          onChange={props.onChange}
          onBlur={props.onBlur}
          value={props.value}
          name={props.name}
          
        >

       { 
       props.data!=undefined ? props.data.map((ele,index)=>(
        <MenuItem value={ele} key={index}>{ele}</MenuItem>
      ))
       :
       <MenuItem value={'none'}><em>None</em></MenuItem>
       }
          

        </Select>
     <FormHelperText style={{color:"#4615b2"}}>{props.helperText}</FormHelperText>
      </FormControl>

    {/* {
     showTextBox ? <TextField helpertext={"Enter the reason for the alarm manually"} label={"Enter Reason"}></TextField> :  null
    }  */}


    </div>
  );
}
