import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: "#00b0ff",
    fontSize: 14,

    color: "black",
    fontFamily: "Acme",
    padding: 14,
    textAlign: "center",
    borderRadius: 6,
    border: "2px solid #18ffff",
  },

  data: {
    backgroundColor: "#64dd17",
    fontSize: 12,
    color: "black",
    fontWeight: "bold",
    padding: 14,
    textAlign: "center",
    borderRadius: 6,
    border: "2px solid #ffff00",
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
              <Container className={classes.container}>OPERATOR NAME</Container>
            </Grid>
            <Grid item sm={12} spacing={1}>
              <Container className={classes.data}>{fullName}</Container>
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
