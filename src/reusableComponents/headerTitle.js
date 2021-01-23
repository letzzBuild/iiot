import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';





const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin:0,
    borderRadius:0
  },
});

function HeaderTitle(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
        <Grid container spacing={0} >
          <Grid item xs={12} sm={12}>
            <Paper  style={{
              fontWeight:'bold',
              padding:10,
              backgroundColor:'#355892',
              position:"fixed",
              color:'white', 
              width:"100%",
              top: "0"}}>
              Srinivas Induction Hardening
            <span style={{marginLeft:300}}>IIOT CNC MONITORING</span></Paper>
          </Grid>
        </Grid>
    </div>
  );
}

HeaderTitle.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HeaderTitle);