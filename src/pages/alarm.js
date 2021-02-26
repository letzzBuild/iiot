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
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import SuccesToast from "../reusableComponents/successToast";
import ErrorToast from "../reusableComponents/errorToast";
import {Redirect} from 'react-router-dom';

function Alarm({history}) {

  let machineId = localStorage.getItem("machineId");

      var shift = localStorage.getItem("shift");

      var fullName = localStorage.getItem("fullName");

      var componentName = localStorage.getItem("componentName");

      var modelName = localStorage.getItem("operationName");

      var operationName = localStorage.getItem("operationName");

      var jobId = localStorage.getItem("jobId")



  const schema = yup.object().shape({
    alarmReason: yup.string().required()
  });

  
  const alarmDataDict = JSON.parse(localStorage.getItem('alarmData'));
  const alarmReasons = Object.keys(alarmDataDict);
  

  const formik=useFormik({
    initialValues:{
      alarmReason:"",   
    },
    validationSchema:schema,
    onSubmit: (values,onSubmitProps) => {
      let alarmReason = values.alarmReason;
      
      var result = {
        'jobId': jobId,
        'operationName': operationName,
        'machineId': machineId,
        'shift': shift,
        'fullName': fullName,
        'componentName': componentName,
        'modelName': modelName,
        'alarmReason': alarmReason,
        'errorCode': alarmDataDict[alarmReason] //will give error code for selected alarm value
      };

    axios(
        {
          url:'http://127.0.0.1:5002/alarmScreen',
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
    return <Redirect to='/login' />
  }

  else{

  return (
    console.log(formik),
    <div>
      <HeaderTitle text={"IIOT CNC Monitoring "}></HeaderTitle>
      <Grid container>
        <Grid item xs={12} sm={12}>
          <Paper
            elevation={20}
            style={{
              fontFamily: "Acme",
              fontWeight: "bold",
              height:100,
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
                 text="Alarm has been generated on the Machine!!"
                 effect="stretch"
                //  effectChange={2.0}
                //  effectDuration={0.4}
                paused={true}
                />
              </Grid>
              <Grid
                item
                sm={3}
                spacing={0}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                  marginTop: 50                 
                }}
              >
                <Button
                  color={"#2196f3"}
                  text={`Job ID : ${jobId}`}
                  textColor={"white"}

                ></Button>
              </Grid>
              <Grid
                item
                sm={2}
                spacing={0}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                  marginTop: 50,
                }}
              >
                <Button
                  color={"#d50000"}
                  text={"Alarm On"}
                  textColor={"white"}
                  marginTop = {100}
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
            label={"Select Alarm Reason"}
            name="alarmReason"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.alarmReason}
            helperText={"Choose the reason why alarm has occured"}
            data={alarmReasons}
          ></DropDown>
        </Grid>
        
        <Grid item sm={12} style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight:30,
                  marginTop:15
                }}>

          <SecButton isDisabled={!(formik.isValid&&formik.dirty)} type="submit" icon={<PublishIcon></PublishIcon>} text={"Submit"}></SecButton>

        </Grid>
      </Grid>
      </form>
    </div>
  );
}
}

export default Alarm;
