import React from 'react'
import Typography from '@material-ui/core/Typography';
import {Redirect} from 'react-router-dom';

function Home() {
  let islogged = localStorage.getItem('IS_LOGGED_IN');
  let homePageImage = require('../../images/test-image.jpg');
  let loginwareIcon = require('../../images/loginware-logo.JPG');
  if (islogged === 'false') {
    return <Redirect to='/login' />
  }

  else{
 return (
        <div>
            <img
            style={{
              position: "fixed",
              zIndex:"20",
              left:"62px"
            }}
            src={homePageImage}/>
         
         <span style={{    
            position: "relative",
            top: "200px",
            left: "56px",
            zIndex:"30"}}>Powered By:</span>
          <span style={{    
            position: "relative",
            top: "200px",
            left: "70px",
            zIndex:"30"}}><strong>Loginware Softtec Pvt. Ltd.</strong></span>
          <img style={{
            position:"relative",
            top:"210px",
            zIndex:"30",
            left:"-115px",
            top:"260px"
          }} src={loginwareIcon}/>
        </div>
    )
}

}
export default Home;