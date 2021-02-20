import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import "../index.css";
import Loader from "../reusableComponents/loader.js";
import axios from "axios";

function Home({ history, valueSetter }) {

  useEffect(() => {
    var machineId="";
    axios
      .get("http://127.0.0.1:5002")
      .then((response) => {
        console.log(response);
        console.log(response.data.result);
        machineId=response.data.result.data.machineId;
        valueSetter(response.data.result.data);

        //if previos request happens successfully then make request to get alarm data and store values in local storage.
         axios.get("http://192.168.1.19/BE/api/iiot/GetAlarmReasonsList",{params:{'MachineId':machineId}}).then((response) => {
        var result = response.data;
        var alarmValuesDict={};
        for(let i=0; i<result.length;i++){
           let ErrorCode=result[i].ErroCode;
           let Reason=result[i].Reasons;
           alarmValuesDict[Reason]=ErrorCode;
           }
        localStorage.setItem("alarmData",JSON.stringify(alarmValuesDict));   
 
 
    
    }).catch((error) => {
      console.log('error fetching alarm data')
    })

        history.push('/login');
      })
      .catch((error) => {
        console.log(error);
        history.push('/login');

      });

      

  }, []);

  return (
    <div
      style={{
        backgroundColor: "#ffc400",
      }}
    >
      <Typography
        paragraph
        style={{
          textAlign: "center",
        }}
      >
        <span
          style={{
            color: "black",
            fontWeight: "bolder",
            fontSize: 70,
            fontFamily: "Dancing Script",
          }}
        >
          IIOT CNC Monitoring Device...
          </span>
        <br></br>
        <p
          style={{
            marginTop: 150,
          }}
        >

        </p>

        <div>
          <Loader color={"#f50057"}> </Loader>
          <center>
            <h3
              style={{
                fontFamily: "Acme",
                fontWeight: "bolder",
              }}
            >
              please wait while we are loading things for you....{" "}
            </h3>{" "}
          </center>{" "}
        </div>
        <div
          style={{
            marginTop: 300,
            fontSize: 30,
            fontWeight: "bold",
            fontFamily: "Dancing Script",
            color: "black",
          }}
        >
          <center
            style={{
              color: "black",
            }}
          >
            <span
              style={{
                fontSize: 18,
                fontWeight: "bold",
                fontFamily: "Knewave",
                color: "black",
              }}
            >
              powered by{" "}
            </span>{" "}
            <br></br>
              LoginWare SoftTech Solutions
          </center>{" "}
        </div>{" "}
      </Typography>{" "}
    </div>
  );
}

export default Home;
