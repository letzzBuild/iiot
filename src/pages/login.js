import React from 'react';
import HeaderTitle from '../reusableComponents/headerTitle';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import LoginForm from '../reusableComponents/login.js';
import Dialog from '../reusableComponents/shutdownDialog';



export default function Login(props) {

  return (
    < div >

      <HeaderTitle text={"IIOT CNC Monitoring "}></HeaderTitle>

      <Grid container>
        <Grid item xs={12} sm={12}>
          <Paper
            elevation={20}
            style={{
              // fontFamily: "Acme",
              fontWeight: "bold",
              backgroundColor: "#ffc107",
              color: 'black',
              fontSize: 26,
              border: "2px solid #ffd600",
              padding: 4
            }}
          >
            <Grid container>
              <Grid
                item
                sm={10}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                MACHINE ID : {localStorage.getItem('machineId')}
              </Grid>



              <Grid
                item
                sm={2}
                spacing={0}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                }}
              >
                <Dialog color={"#d50000"} name="shutdown" bodyText={"Do you really want to shutdown the device ? "} buttonText={"Shutdown"} icon={<PowerSettingsNewIcon></PowerSettingsNewIcon>}></Dialog>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <p style={{ marginTop: 30 }}></p>

      <LoginForm history={props.history}></LoginForm>


    </div >
  )
}






