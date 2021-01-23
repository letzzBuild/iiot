import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function IconLabelButtons(props) {
  const classes = useStyles();

  

  return (
    <div>
      <Button
        type={props.type}
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={props.icon}
        style={{top:"18px", right:"86px", position:'relative', fontWeight:'bold'}}
        disabled={props.isDisabled}
        onClick={props.handleClick}
      >
        {props.text}
      </Button>
    </div>
  );
}
