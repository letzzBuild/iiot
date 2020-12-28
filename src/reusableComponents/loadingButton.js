import React from 'react'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Loadingbutton(props) {
    

    return (
        <>
        <Button
        variant="contained"
        color="secondary"
        endIcon={<CircularProgress size={15} style={{color:"black"}}/>}
      >Load Machine Ids</Button>
            
        </>
    )
}
