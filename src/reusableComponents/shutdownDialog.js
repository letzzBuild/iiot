import React,{useEffect,useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import DialogContentText from '@material-ui/core/DialogContentText';
import axios from 'axios';


export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

  };

  const shutdown = () => {
    if(props.name==='shutdown'){
      localStorage.clear();
      console.log('shuttingdown');
      axios.get("http://127.0.0.1:5002/shutdown").then((response) => {}).catch((error) =>{})
      setOpen(false);
    }
   else{
    localStorage.setItem('IS_LOGGED_IN','false')
    localStorage.setItem('user', '');
    localStorage.setItem('fullName', '');
    localStorage.setItem('shift','');
    localStorage.setItem('components','');
    localStorage.setItem('models','');
    localStorage.setItem('operationName','');
    localStorage.setItem('componentName','');
    localStorage.setItem('modelName','');
    localStorage.setItem('jobId','');
    props.logout();
    setOpen(false);

   } 
    
  }

  

  return (
    <div>
      <Button startIcon={props.icon} onClick={handleClickOpen} style={{ backgroundColor: props.color, color: "white", fontWeight: "bold", padding: 8 }}>
        {props.buttonText}

      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText>
            <h3 style={{ fontWeight: 'bold', color: 'black', textAlign: 'center', fontSize: 25}}>{props.bodyText}</h3>
            <Divider></Divider>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ backgroundColor: "#d50000", color: "white", fontWeight: 'bold', padding: 10 }}>
            Cancel
          </Button>
          <Button onClick={shutdown} style={{ backgroundColor: "#64dd17", color: "white", fontWeight: 'bold', padding: 10 }} autoFocus>
            Yes !!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
