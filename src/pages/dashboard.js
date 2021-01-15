import React, { useEffect, useState ,useRef} from "react";
import HeaderTitle from "../reusableComponents/headerTitle";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import SecButton from "../reusableComponents/secButton";
import Button from "../reusableComponents/button";
import Box from "@material-ui/core/Box";
import HeaderBody from "../reusableComponents/headerBody.js";
import PublishIcon from "@material-ui/icons/Publish";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import BuildIcon from "@material-ui/icons/Build";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import InputChip from "../nonReusableComponents/inputChip";
import Dialog from "../reusableComponents/shutdownDialog";
import { Redirect } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import SuccesToast from "../reusableComponents/successToast";
import ErrorToast from "../reusableComponents/errorToast";
import IdleTimer from 'react-idle-timer';


function Dashboard({ history }) {


  const idleTimerRef = useRef(null);

  let idleTimeout= localStorage.getItem("idleTime")

  var timeout = Number(idleTimeout.split(" ")[0])
  


  var machineId = localStorage.getItem("machineId");

  var shift = localStorage.getItem("shift");

  var fullName = localStorage.getItem("fullName");

  var componentName = localStorage.getItem("componentName");

  var modelName = localStorage.getItem("operationName");

  var operationName = localStorage.getItem("operationName");

  const [productionCount, setproductionCount] = useState(0);

  const [liveSignal, setliveSignal] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .post("http://127.0.0.1:5002/getCurrentSignal", {
          'userName': fullName
        })
        .then((response) => {
          let result = response.data.result
          if(result.status===1){
            setliveSignal(result["liveSignal"]);
            setproductionCount(result["production"])
            if (result["liveSignal"] === 'Alarm') {
              history.push('/alarm')
            }
          } 
          
        })
        .catch((error) => {});
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleIdle = ()=>{
    history.push('/screenIdle')
  }

  const logout = ()=>{
     history.push('/login')
  }

  const schema = yup.object().shape({
    jobId: yup.string().required(),
  });

  const releaseMachine = ()=>{
    console.log("releaseing")
    axios.post('http://127.0.0.1:5002/HoldMachine',{'State':'Release'}).then(()=>{}).catch(()=>{});
    SuccesToast('Machine Released, Please change the Tool')
  }

  const formik = useFormik({
    initialValues: {
      jobId: "",
    },
    validationSchema: schema,

    onSubmit: (values, onSubmitProps) => {
      let jobId = values.jobId;

      localStorage.setItem("jobId", jobId);

      var result = {
        'jobId': jobId,
        'machineId': machineId,
        'shift': shift,
        'fullName':fullName,
        'componentName': componentName,
        'modelName': modelName,
        'operationName': operationName
      };

      axios({
        url: "http://127.0.0.1:5002/operator",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: result,
      })
        .then((res) => {
          let response = res.data.result;
          if (response.status === 1) {
            SuccesToast(response.message);
            localStorage.setItem("shift", response.data['shift']);
          } else {
            ErrorToast(response.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });

      console.log(onSubmitProps);
      onSubmitProps.setSubmitting(false);
      onSubmitProps.resetForm();
    },
  });

  let islogged = localStorage.getItem('IS_LOGGED_IN');
  if (islogged === 'false') {
    return <Redirect to='/login' />
  }

  else{
  return (
    <div>
      <HeaderTitle text={"IIOT CNC Monitoring "}> </HeaderTitle>{" "}
      <Grid container>
        <Grid item xs={12} sm={12} spacing={1}>
          <Paper
            elevation={20}
            style={{
              fontFamily: "Acme",
              fontWeight: "bold",
              backgroundColor: "#ffc107",
              color: "#d50000",
              fontSize: 26,
              border: "2px solid #ffd600",
              padding: 4,
            }}
          >
            <Grid container>
              <Grid
                item
                sm={1}
                spacing={0}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                  paddingLeft: 20,
                }}
              >
                <Button
                  color={"#ff3d00"}
                  text={"Inspection"}
                  textColor={"white"}
                  icon={<EmojiEventsIcon> </EmojiEventsIcon>}
                >
                  {" "}
                </Button>{" "}
              </Grid>{" "}
              <Grid
                item
                sm={3}
                spacing={0}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 100,
                }}
              >
                <Button
                  color={"#2196f3"}
                  text={`Production ${productionCount}`}
                  textColor={"white"}
                  icon={<EmojiEventsIcon> </EmojiEventsIcon>}
                >
                  {" "}
                </Button>{" "}
              </Grid>{" "}
              <Grid
                item
                sm={2}
                spacing={0}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                  paddingLeft: 30,
                }}
              >
                
                {liveSignal === "Machine Idle" ? (
                  <Button
                    color={"#ff8f00"}
                    text={liveSignal ? liveSignal : "laoding.."}
                    textColor={"black"}
                    icon={<EmojiObjectsIcon> </EmojiObjectsIcon>}
                  >
                    
                  </Button>
                ) : liveSignal === "Cycle" ? (
                  <Button
                    color={"#76ff03"}
                    text={liveSignal ? liveSignal : "laoding.."}
                    textColor={"black"}
                    icon={<EmojiObjectsIcon> </EmojiObjectsIcon>}
                  >
                  
                  </Button>
                ) : (
                  <Button
                    color={"#d50000"}
                    text={liveSignal ? liveSignal : "laoding.."}
                    textColor={"white"}
                    icon={<EmojiObjectsIcon> </EmojiObjectsIcon>}
                  >
                    
                  </Button>
                )}
              </Grid>
              <Grid
                item
                sm={2}
                spacing={0}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                  paddingLeft: 10,
                }}
              >
                <Button
                  color={"#ff1744"}
                  text={"Tool Change"}
                  textColor={"white"}
                  handleClick={releaseMachine}
                  icon={<BuildIcon> </BuildIcon>}
                >
                  {" "}
                </Button>{" "}
              </Grid>{" "}
              <Grid
                item
                sm={2}
                spacing={0}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                  paddingLeft: 30,
                }}
              >
                <Dialog
                  logout={logout}
                  name="logout"
                  color={"#00e676"}
                  bodyText={"Do you really want to logout? "}
                  buttonText={"Logout"}
                  icon={<ExitToAppIcon> </ExitToAppIcon>}
                >
                  {" "}
                </Dialog>{" "}
              </Grid>{" "}
              <Grid
                item
                sm={2}
                spacing={0}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                }}
              >
                <Dialog
                  color={"#d50000"}
                  bodyText={"Do you really want to shutdown the device ? "}
                  buttonText={"Shutdown"}
                  icon={<PowerSettingsNewIcon> </PowerSettingsNewIcon>}
                >
                  {" "}
                </Dialog>{" "}
              </Grid>{" "}
            </Grid>{" "}
          </Paper>{" "}
        </Grid>{" "}
      </Grid>{" "}
      <p> </p> <HeaderBody> </HeaderBody> <Box mt={15}> </Box>{" "}
      <form onSubmit={formik.handleSubmit}>
        <Grid container>
          <Grid
            item
            sm={12}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <InputChip
              name="jobId"
              value={formik.values.jobId}
              handleChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helpertext="Please specify the JOB ID of the component"
            ></InputChip>{" "}
          </Grid>{" "}
          <Grid
            item
            sm={12}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 30,
              marginTop: 15,
            }}
          >
            <SecButton
              icon={<PublishIcon> </PublishIcon>}
              text={"Submit"}
              type="submit"
              isDisabled={!(formik.dirty&&formik.isValid&&liveSignal!=="Cycle ON")}
            ></SecButton>
          </Grid>{" "}
        </Grid>{" "}
      </form>{" "}

      {
        liveSignal==='Machine Idle' ? <IdleTimer ref={idleTimerRef} timeout={timeout*60*1000} onIdle={handleIdle}/> : null
      }
    </div>
  );
}

}

export default Dashboard;
