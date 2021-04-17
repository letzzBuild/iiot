import React,{useState} from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import DropDown from "../nonReusableComponents/operationsDropdown";
import axios from 'axios';
import SecButton from '../reusableComponents/secButton';
import Box from "@material-ui/core/Box";
import PublishIcon from '@material-ui/icons/Publish';

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: "#00b0ff",
    fontSize: 14,
    color: "black",
    fontFamily: "Acme",
    padding: 14,
    textAlign: "center",
    borderRadius: 6,
    border: "2px solid #18ffff",
  },

  data: {
    backgroundColor: "#64dd17",
    fontSize: 12,
    color: "black",
    fontWeight: "bold",
    padding: 14,
    textAlign: "center",
    borderRadius: 6,
    border: "2px solid #ffff00",
    height: 60,

  },
}));

function HeaderBody(props) {

  const [allOperations, setallOperations] = useState([]);
  const [isDisabled, setisDisabled] = useState(true);


  var machineId = localStorage.getItem('machineId');

  var shift = localStorage.getItem('shift');

  var fullName = localStorage.getItem('fullName');

  var components = JSON.parse(localStorage.getItem('components'));

  var modelNames = JSON.parse(localStorage.getItem('models'));


  const getAllOperations = (modelCode) => {

    let machineId = localStorage.getItem("machineId");
    let ipAddress = localStorage.getItem("ipAddress");;

    console.log(machineId);
    console.log(modelCode);
    axios.get("http://10.130.10.6/BE/api/iiot/OperationList",
      {params:{'machineCode':machineId,'modelCode':modelCode}}
    )
      .then((res) => {
        //remove values for real testig
        let result=res.data;
        console.log(result)
        let operationObj = {};
        var OperationList=[];
        for(let i=0;i<result.length;i++){
            operationObj['code'] = result[i]['Value']
            operationObj['value'] = result[i]['Code']
            OperationList.push(operationObj);
            operationObj={}
        }
        
        localStorage.setItem('operations',JSON.stringify(OperationList))
        setallOperations(OperationList)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const enableButton = () =>{
    setisDisabled(false);
  }

  const handleClick = () =>{
    props.history.push('/dashbaord');
  }


  const classes = useStyles();

  return (

    <div style={{position: "fixed", top:"140px"}}>
      <Grid container spacing={1}>
        <Grid item sm={2}>
          <Grid container>
            <Grid item sm={12}>
              <Container className={classes.container}>OPERATOR NAME</Container>
            </Grid>
            <Grid item sm={12} spacing={1}>
              <Container className={classes.data}>
                {fullName}
              </Container>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={2}>
          <Grid container>
            <Grid item sm={12}>
              <Container className={classes.container}>MACHINE ID</Container>
            </Grid>
            <Grid item sm={12}>
              <Container className={classes.data}>{machineId}</Container>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={2}>
          <Grid container>
            <Grid item sm={12}>
              <Container className={classes.container}>SHIFT</Container>
            </Grid>
            <Grid item sm={12}>
              <Container className={classes.data}>{shift}</Container>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sm={2}>
          <Grid container>
            <Grid item sm={12}>
              <Container className={classes.container}>
                SELECT COMPONENT
              </Container>
            </Grid>
            <Grid item sm={12}>
              <Container
                className={classes.data}
                style={{ padding: 0, margin: 0 }}
              >
                <DropDown
                  width={200}
                  data={components}
                  name="component"
                  enableButton={enableButton}

                ></DropDown>
              </Container>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sm={2}>
          <Grid container>
            <Grid item sm={12}>
              <Container className={classes.container}>MODEL NAME</Container>
            </Grid>
            <Grid item sm={12}>
              <Container
                className={classes.data}
                style={{ padding: 0, margin: 0 }}
              >
                <DropDown
                  name="modelName"
                  getOperations={getAllOperations}
                  data={modelNames}
                ></DropDown>
              </Container>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sm={2}>
          <Grid container>
            <Grid item sm={12}>
              <Container className={classes.container}>OPERATION</Container>
            </Grid>
            <Grid item sm={12}>
              <Container
                className={classes.data}
                style={{ padding: 0, margin: 0 }}
              >
                <DropDown
                  name="operation"
                  data={allOperations}
                  enableButton={enableButton}
                ></DropDown>
              </Container>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box mt={15}></Box>

      <Grid container>
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
            icon={<PublishIcon></PublishIcon>}
            text={"Submit"}
            isDisabled={isDisabled}
            navigate={true}
            handleClick={handleClick}

          ></SecButton>
        </Grid>
      </Grid>
    </div>
  );
}

export default HeaderBody;
