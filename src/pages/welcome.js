import React, { useEffect } from "react";
import ReactDOM from 'react-dom';
import Typography from "@material-ui/core/Typography";
import "../index.css";
import Loader from "../reusableComponents/loader.js";
import axios from "axios";

function Home({ history, valueSetter }) {
  let homePageImage = require('../images/test-image.jpg');
  let loginwareIcon = require('../images/loginware-logo.JPG');

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5002")
      .then((response) => {
        console.log(response);
        console.log(response.data.result);
        valueSetter(response.data.result.data);
       history.push('/login');
      })
      .catch((error) => {
        console.log(error);
        history.push('/login');
      });

  }, []);

  return (
    <div style={{margin: "0%", position: "relative"}}>
    <img
    style={{
      position: "fixed"
    }}
     src={homePageImage}/>
     <h3 style={{
       position: "absolute",
       top:"50px", 
       left:"40px",
       fontSize:"50px"
       }}>IIOT CNC Monitoring Device</h3>
       <div style={{
         position:"absolute",
          top:"300px",
          textAlign:"center",
          left: "230px"
       }}>
       <span>Powered By:</span>
       <span style={{    
         position: "relative",
         top: "26px",
         right: "130px"}}><strong>Loginware Softtec Pvt. Ltd.</strong></span>
       <img style={{
         position:"relative",
         top:"90px",
         right:"353px"
       }} src={loginwareIcon}/>
       </div>
    </div>
  );
}

export default Home;