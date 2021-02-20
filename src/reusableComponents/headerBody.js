import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: "rgb(53, 88, 146)",
    fontSize: 14,
    color: "white",
    fontFamily: "Acme",
    padding: 6,
    textAlign: "center",
    borderRadius: 6,
    border: "2px solid rgb(53, 88, 146)",
    marginTop: 50,
  },

  data: {
    backgroundColor: "lavender",
    fontSize: 12,
    color: "black",
    fontWeight: "bold",
    padding: 14,
    textAlign: "center",
    borderRadius: 6,
    marginTop: 10,
    height: 60,
  },
  fullName:{
    backgroundColor: "rgb(53, 88, 146)",
    color: "white",
    fontFamily: "Acme",
    padding: 6,
    textAlign: "center",
    borderRadius: 6,
    border: "2px solid rgb(53, 88, 146)",
    marginTop: 50,
  },
  fullNamedata: {
    backgroundColor: "lavender",
    fontSize: 12,
    color: "black",
    fontWeight: "bold",
    padding: 14,
    height: 60,
    textAlign: "left",
    borderRadius: 6,
    marginTop: 10,
  },

}));

function HeaderBody() {
  const classes = useStyles();

  var machineId = localStorage.getItem("machineId");

  var shift = localStorage.getItem("shift");

  var fullName = localStorage.getItem("fullName");

  var componentName = localStorage.getItem("componentName");

  var modelNameCode = localStorage.getItem("modelName");

  var operationNameCode = localStorage.getItem("operationName");

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item sm={2}>
          <Grid container>
            <Grid item sm={12}>
              <Container className={classes.fullName}>OPERATOR NAME</Container>
            </Grid>
            <Grid item sm={12} spacing={1}>
              <Container className={classes.fullNamedata}>{fullName}</Container>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={2}>
          <Grid container>
            <Grid item sm={12}>
              <Container className={classes.container}>MACHINE ID</Container>
            </Grid>
            <Grid item sm={12}>
              <Container className={classes.data}>{machineId}</Container>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={2}>
          <Grid container>
            <Grid item sm={12}>
              <Container className={classes.container}>SHIFT</Container>
            </Grid>
            <Grid item sm={12}>
              <Container className={classes.data}>{shift}</Container>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sm={2}>
          <Grid container>
            <Grid item sm={12}>
              <Container className={classes.container}>COMPONENT</Container>
            </Grid>
            <Grid item sm={12}>
              <Container className={classes.data}>{componentName}</Container>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sm={2}>
          <Grid container>
            <Grid item sm={12}>
              <Container className={classes.container}>MODEL NAME</Container>
            </Grid>
            <Grid item sm={12}>
              <Container className={classes.data}>{modelNameCode}</Container>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sm={2}>
          <Grid container>
            <Grid item sm={12}>
              <Container className={classes.container}>OPERATION</Container>
            </Grid>
            <Grid item sm={12}>
              <Container className={classes.data}>
                {operationNameCode}
              </Container>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default HeaderBody;
