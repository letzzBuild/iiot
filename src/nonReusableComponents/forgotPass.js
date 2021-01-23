import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });



  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Button   onClick={handleClickOpen} style={{color:"black",fontSize:12, bottom:"57px", left: "70px"}}>
       Reset Password
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogContent>
        <DialogContentText>
            <h3 style={{fontWeight:'bold',color:'black',textAlign:'center',fontSize:25,fontFamily:'Acme'}}>Forgot/Reset Password</h3>
            <Divider></Divider>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Original Password"
            type="password"
            
            endAdornment={
              <InputAdornment position="end">

                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          /><br></br>
          <TextField
            margin="dense"
            label="New Password"
            type="password"
            endAdornment={
              <InputAdornment position="end">

                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          /><br></br>
          <TextField
            margin="dense"
            label="Confirm New Password"
            
            type="password"
            endAdornment={
              <InputAdornment position="end">

                <IconButton

                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          /> <br></br>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}  style={{backgroundColor:"#d50000",color:"white",fontWeight:'bold',padding:10}}>
            Close
          </Button>
          <Button onClick={handleClose}  style={{backgroundColor:"#64dd17",color:"white",fontWeight:'bold',padding:10}} autoFocus>
           Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
