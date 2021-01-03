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
            <Paper  style={{fontFamily:'DancingScript',fontWeight:'bold',padding:10,backgroundColor:'#512da8',color:'white'}}>Srinivas Induction Hardening
            <span style={{marginLeft:300,fontWeight:'bolder',fontFamily:'Acme'}}>IIOT CNC MONITORING</span></Paper>
          </Grid>
        </Grid>
    </div>
  );
}

HeaderTitle.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HeaderTitle);