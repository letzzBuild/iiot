import React from "react";
import HeaderTitle from "../reusableComponents/headerTitle";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import OperationHeaderBody from '../nonReusableComponents/setOperationsHeader';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Dialog from '../reusableComponents/shutdownDialog';
import { Redirect } from 'react-router-dom';


function SetOperations(props) {

  const logout = () => {
    props.history.push('/login')
  }

  let islogged = localStorage.getItem('IS_LOGGED_IN');
  if (islogged === 'false') {
    return <Redirect to='/login' />
  }
  else {
    return (
      < div >
        <HeaderTitle text={"IIOT CNC Monitoring "}></HeaderTitle>
        <Grid container>
          <Grid item xs={12} sm={12} spacing={1}>
            <Paper
              elevation={20}
              style={{
                fontFamily: "Acme",
                fontWeight: "bold",
                backgroundColor: "ivory",
                color: "#d50000",
                fontSize: 26,
                border: "2px ",
                padding: 4,
                position: "relative",
                top: "42px"
              }}
            >
              <Grid container>
                <Grid
                  item
                  sm={8}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "black"
                  }}
                >
                  Select Operations
                </Grid>
                <Grid
                  item
                  sm={2}
                  spacing={0}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    paddingLeft: 30,
                    position: "relative",
                    top: "-51px"
                  }}
                >
                  <Dialog color={"#00e676"} logout={logout} name="logout" bodyText={"Do you really want to logout? "} buttonText={"Logout"} icon={<ExitToAppIcon></ExitToAppIcon>}></Dialog>

                </Grid>

                <Grid
                  item
                  sm={2}
                  spacing={0}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    position: "relative",
                    top: "-51px"
                  }}
                >
                  <Dialog color={"#d50000"} name="shutdown" bodyText={"Do you really want to shutdown the device ? "} buttonText={"Shutdown"} icon={<PowerSettingsNewIcon></PowerSettingsNewIcon>}></Dialog>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <p></p>

        <OperationHeaderBody history={props.history}></OperationHeaderBody>

      </div >
    );
  }



}

export default SetOperations;
