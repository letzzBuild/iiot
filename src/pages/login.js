import React from 'react';
import HeaderTitle from '../reusableComponents/headerTitle';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import LoginForm from '../reusableComponents/login.js';
import Dialog from '../reusableComponents/shutdownDialog';



export default function Login(props) {
  let homePageImage = require('../images/test-image.jpg');
  let loginwareIcon = require('../images/loginware-logo.JPG');
  let machineInfo = localStorage.getItem('machineId');

  return (

    <div style={{margin: "0%", position: "relative"}}>
       <HeaderTitle text={"IIOT CNC Monitoring "}></HeaderTitle>
          <Grid container>
            <Grid
                item
                sm={10}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "25px",
                  fontWeight: "bold",
                  position:'relative',
                  zIndex: "100", 
                  top: "45px"
                }}
              >MACHINE ID : {machineInfo}
            </Grid>
              <Dialog color={"#d50000"} name="shutdown" bodyText={"Do you really want to shutdown the device ? "} 
              buttonText={"Shutdown"} icon={<PowerSettingsNewIcon></PowerSettingsNewIcon>}></Dialog>
            </Grid>
        <LoginForm history={props.history}></LoginForm>
    <img
    style={{
      position: "fixed",
      top:"100px"
    }}
     src={homePageImage}/>
       <div style={{
         position:"absolute",
          top:"470px",
          textAlign:"center",
          right: "-340px"
       }}>
       <span style={{    
         position: "fixed",
         top: "550px",
         left: "100px"}}>Powered By:</span>
       <span style={{    
         position: "fixed",
         top: "550px",
         left: "200px"}}><strong>Loginware Softtec Pvt. Ltd.</strong></span>
       {/* <img style={{
         position:"relative",
         top:"90px",
         right:"353px"
       }} src={loginwareIcon}/> */}
       </div> 
    </div>
  )
}






