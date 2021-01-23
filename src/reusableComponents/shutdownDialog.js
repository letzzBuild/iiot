import React  from 'react';
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


    if(props.name==='shutdown'){
      console.log('shuttingdown');
      axios.get("http://127.0.0.1:5002/shutdown").then((response) => {}).catch((error) =>{})
      setOpen(false);
    }
   else{   
    props.logout();
    setOpen(false);
   } 
    
  }

  

  return (
    <div>
      <Button startIcon={props.icon} onClick={handleClickOpen} style={{ backgroundColor: "black", color: "white", fontWeight: "bold", padding: 8, top: "50px" }}>
        {props.buttonText}

      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogContent>
          <DialogContentText>
            <h3 style={{ fontWeight: 'bold', color: 'black', textAlign: 'center', fontSize: 25}}>{props.bodyText}</h3>
            <Divider></Divider>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ backgroundColor: "#d50000", color: "white", fontWeight: 'bold', padding: 12, right: "150px", bottom:"7px"}}>
            Cancel
          </Button>
          <Button onClick={shutdown} style={{ backgroundColor: "#1a5f1a", color: "white", fontWeight: 'bold', padding: 12, right: "350px", bottom:"7px"}} autoFocus>
            Yes !!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
