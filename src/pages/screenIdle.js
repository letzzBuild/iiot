import React from "react";
import HeaderTitle from "../reusableComponents/headerTitle";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import SecButton from '../reusableComponents/secButton';
import Button from '../reusableComponents/button';
import DropDown from "../reusableComponents/select.js";
import Box from "@material-ui/core/Box";
import HeaderBody from '../reusableComponents/headerBody.js';
import { Random } from 'react-animated-text';
import PublishIcon from '@material-ui/icons/Publish';
import axios from 'axios';
import {useFormik} from 'formik';
import SuccesToast from '../reusableComponents/successToast';
import ErrorToast from '../reusableComponents/errorToast';
import * as yup from 'yup';
import {Redirect} from 'react-router-dom';

function IdleScreen({history}) {

  var machineId = localStorage.getItem("machineId");

  var shift = localStorage.getItem("shift");
 
  var fullName = localStorage.getItem("fullName");

  var componentName = localStorage.getItem("componentName");

  var modelName = localStorage.getItem("operationName");

  var operationName = localStorage.getItem("operationName");

  const schema = yup.object().shape({
    idleReason: yup.string().required()
    
  });

  const idleReasons=['lunch','went outside','some other work']

 const formik =  useFormik({
 initialValues:{
 idleReason :""
},
validationSchema:schema,



  
onSubmit: (values,onSubmitProps) => {
    let idleReason = values.idleReason;
    
    var result = {
      'fullName': fullName,
      'machineId': machineId,
      'shift': shift,
      'componentName': componentName,
      'modelName': modelName,
      'idleReason': idleReason,
      'operationName': operationName,
    };

  axios(
      {
        url:'http://127.0.0.1:5002/idleTimeout',
        method:'post',
        headers:{'Content-Type': 'application/json'},
        data:result
      }
    ).then((res)=>{
    let response=res.data.result
    if(response.status===1){
      SuccesToast(response.message);
      history.push('/dashbaord')


    }
    else{
      ErrorToast(response.message)
    }
    }).catch((error) => {
   console.log(error)
    })


    console.log(onSubmitProps) 
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm() 
    
  },
})

let islogged = localStorage.getItem('IS_LOGGED_IN');
  if (islogged === 'false') {
    console.log("setoperations page if condition", localStorage.getItem('IS_LOGGED_IN'));
    return <Redirect to='/login' />
  }

  else{


  return (
    <div>
      <HeaderTitle text={"IIOT CNC Monitoring "}></HeaderTitle>
      <Grid container>
        <Grid item xs={12} sm={12}>
          <Paper
            elevation={20}
            style={{
              fontFamily: "Acme",
              fontWeight: "bold",
              backgroundColor: "white",
              color: "#d50000",
              fontSize:26,
              border:"2px solid white",
              padding:4
            }}
          >
            <Grid container>
              <Grid
                item
                sm={7}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 50
                }}
              >
                <Random
                 text="Machine is Idle for a long time"
                 effect="stretch"
                //  effectChange={2.0}
                //  effectDuration={0.4}
                 paused={true}
/>
              </Grid>

              <Grid
                item
                sm={4}
                spacing={0}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                  marginTop: 50
                }}
              >
                <Button
                  color={"#d50000"}
                  text={"Machine Idle for long time"}
                  textColor={"white"}
                ></Button>
              </Grid>



            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <p></p>
      <HeaderBody></HeaderBody>
     

      <Box mt={15}></Box>
  <form onSubmit={formik.handleSubmit}>
      <Grid container >
        <Grid
          item
          sm={12}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DropDown
            label={"Select machine Idle Reason "}
            helperText={"choose the reason why machine was idle for long time"}
            data={idleReasons}
            name="idleReason"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.idleReason}
          ></DropDown>
        </Grid>
        
        <Grid item sm={12} style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight:30,
                  marginTop:15
                }}>

          <SecButton type="submit"  isDisabled={!(formik.isValid&&formik.dirty)}  icon={<PublishIcon></PublishIcon>} text={"Submit"}></SecButton>

        </Grid>

      </Grid>
      </form>
    </div>
  );
}

}
export default IdleScreen;
