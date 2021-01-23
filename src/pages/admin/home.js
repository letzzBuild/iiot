import React from 'react'
import Typography from '@material-ui/core/Typography';
import {Redirect} from 'react-router-dom';

function Home() {
  let islogged = localStorage.getItem('IS_LOGGED_IN');
  if (islogged === 'false') {
    return <Redirect to='/login' />
  }

  else{
 return (
        <div>
          
        {/* <Typography paragraph style={{ textAlign: "center"}}>
         <div style={{marginTop: 100,marginLeft:80,color: "black",fontSize: 55,fontWeight: "bold",fontFamily: "Dancing Script" ,display: "flex",alignItems: "center",justifyContent: "center"}}>
           <p>Welcome to the Configuration Dashboard of
           </p> 
          </div>
          <br></br>
          <span style={{color: "#fb8c00",marginLeft:40,fontWeight:"bolder",fontSize: 30,fontFamily:"Knewave"}}>IIOT CNC Monitoring Device ... </span>
          <br></br>
          <p></p>
          
            <footer style={{marginTop:150,fontSize:20,fontWeight:'bold',fontFamily:"Dancing Script"}}> 
            <center>
              <span style={{fontSize:15,fontWeight:'bold',fontFamily: "Knewave"}}> powered by </span><br></br>
              Loginware Soft tech
            </center>  
            </footer>
         
        </Typography> */}
        </div>
    )
}

}
export default Home;