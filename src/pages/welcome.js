import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import "../index.css";
import Loader from "../reusableComponents/loader.js";
import axios from "axios";

function Home({ history, valueSetter }) {

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
