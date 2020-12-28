import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';

export default function Inputchip(props) {
    

    return (
        <>
        <FormControl style={{width:'60%'}}  variant="outlined">
          <InputLabel  style={{fontWeight: 'bold'}}>JOB ID</InputLabel>
          <OutlinedInput
            value={props.value}
            onChange={props.handleChange}
            startAdornment={<InputAdornment position="start"  style={{fontWeight: 'bold'}}>SIH</InputAdornment>}
            labelWidth={60}
            autoFocus={true}
            notched={true}
            onBlur={props.onBlur}
            name={props.name}
            error={props.touched && props.error ? true : false}

          />
          <FormHelperText
          error={props.touched && props.error ? true : false}
        >
          {props.touched && props.error ? props.error : props.helpertext}
        </FormHelperText>
        </FormControl>
        </>
    )
}

















// import ChipInput from 'material-ui-chip-input'
// import React from 'react';

// function InputChip(props) {



//  //const batchSize=localStorage.getItem("batchSize");

//  const yourChips=[];

//  const  handleAddChip = (chip)=>{
//     yourChips.push(chip)
//  }

//  const handleDeleteChip = (chip,index) =>{
//      yourChips.pop(chip)
//  }

// //  const handleChange = (event)=>{
// //      console.log(event);
// //  }


//  return (
//  console.log(yourChips),
// <div>

// <ChipInput
// //   error={true}
//   allowDuplicates={false}
//   label='Enter the Job Id of the component'
//   style={{width:500}}
//   variant='outlined'
//   color='primary'
//   onAdd={handleAddChip}
//   onDelete={handleDeleteChip}
//   name={props.name}
//   value={props.value}
// //   onChange={handleChange}
//   ref={input => input && input.focus()}

  
// />
//         </div>
//     )
// }

// export default InputChip




