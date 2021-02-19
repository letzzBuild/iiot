import React from "react";
import HomeMadeContainer from "../../reusableComponents/headerContainer";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import FilledSelect from "../../reusableComponents/filledSelect";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "../../reusableComponents/switch";
import Button from "@material-ui/core/Button";
import InputField from "../../reusableComponents/roundTextfield";
import { useFormik } from "formik";
import axios from "axios";
import SuccessToast from "../../reusableComponents/successToast";
import ErrorToast from "../../reusableComponents/errorToast";
import {Redirect} from 'react-router-dom';


const useStyles = makeStyles(() => ({
  container: {
    width: 230,
    height: 44,
    padding: 12,
    textAlign: "center",
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    borderRadius: 5,
    marginLeft: 200,
  },
}));

function SignalConf() {
  //  const schema = yup.object().shape({
  //   signal1:yup.string().unique(),
  //   signal2:yup.string().unique(),
  //   pin1:yup.string().unique(),
  //   pin2:yup.string().unique(),
  //  })


  const formik = useFormik({
    initialValues: {
      signal1: "",
      signal2: "",
      signal3: "",
      signal4: "",
      signal5: "",
      signal6: "",
      signal7: "",
      signal8: "",
      signal9: "",
      signal10: "",
      signal11: "",
      signal12: "",
      signal13: "",
      signal14: "",

      pin1: "",
      pin2: "",
      pin3: "",
      pin4: "",
      pin5: "",
      pin6: "",
      pin7: "",
      pin8: "",
      pin9: "",
      pin10: "",
      pin11: "",
      pin12: "",
      pin13: "",
      pin14: "",

      enable1: false,
      enable2: false,
      enable3: false,
      enable4: false,
      enable5: false,
      enable6: false,
      enable7: false,
      enable8: false,
      enable9: false,
      enable10: false,
      enable11: false,
      enable12: false,
      enable13: false,
      enable14: false,
    },

    // validationSchema:schema,
    onSubmit : (data)=>{
      axios
        .post("http://127.0.0.1:5002/updateSIgnalsDetails", data)
        .then((res) => {
          console.log(res);
          let result = res["data"]["result"];
          console.log(result);
          if (result["status"] === 1) {
            SuccessToast(result["message"]);
          } else {
            ErrorToast(result["message"]);
          }
        })
        .catch((err) => {
          console.log("error");
          ErrorToast("Something went wrong...");
        });
      console.log("lets test");
    },
      
  });

  const classes = useStyles();
  const pins = [
    "INPUT1",
    "INPUT2",
    "INPUT3",
    "INPUT4",
    "INPUT5",
    "INPUT6",
    "INPUT7",
    "INPUT8",
    "INPUT9",
    "INPUT10",
    "INPUT11",
    "INPUT12",
    "INPUT13",
    "INPUT14",
  ];

  let islogged = localStorage.getItem('IS_LOGGED_IN');
  if (islogged === 'false') {
    return <Redirect to='/login' />
  }
  else{

  return (
    <div style={{ marginTop: 100 }}>
      <HomeMadeContainer text={"Signals Configuration"} />
      <br></br>
      <br></br>
      
      <div style={{position:"relative", display:"flex", fontSize:"16px", fontWeight:"bold"}}>
      <span style={{position:"relative", left:"92px"}}>Signal Name</span>
      <span style={{position:"relative", left:"318px"}}>Enable / disable</span>
      <span style={{position:"relative", left:"550px"}}>Pin number</span>
      </div>
      <center>
        <div>
          <h5 style={{ color: "red" }}>
            *please specify the signal names without spaces and in small letters
          </h5>
        </div>
      </center>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={10}>
          <Grid item xs={4}>
            <Box mt={1}></Box>
            <InputField
              width={220}
              bgColor="#ff3d00"
              color="white"
              size="small"
              marginLeft={60}
              onChange={formik.handleChange}
              value={formik.values.signal1}
              name="signal1"
            ></InputField>
            <br></br>
            <InputField
              width={220}
              bgColor="#52b202"
              color="white"
              size="small"
              marginLeft={60}
              onChange={formik.handleChange}
              value={formik.values.signal2}
              name="signal2"
            ></InputField>
            <br></br>
            <InputField
              width={220}
              bgColor="#2196f3"
              color="white"
              size="small"
              marginLeft={60}
              onChange={formik.handleChange}
              value={formik.values.signal3}
              name="signal3"
            ></InputField>
            <br></br>
            <InputField
              width={220}
              marginLeft={60}
              bgColor="#ffd600"
              color="white"
              size="small"
              onChange={formik.handleChange}
              value={formik.values.signal4}
              name="signal4"
            ></InputField>
            <br></br>
            <InputField
              width={220}
              bgColor="#d50000"
              color="white"
              size="small"
              marginLeft={60}
              onChange={formik.handleChange}
              value={formik.values.signal5}
              name="signal5"
            ></InputField>
            <br></br>
            <InputField
              width={220}
              bgColor="#00e676"
              color="white"
              size="small"
              marginLeft={60}
              onChange={formik.handleChange}
              value={formik.values.signal6}
              name="signal6"
            ></InputField>
            <br></br>
            <InputField
              width={220}
              bgColor="#e91e63"
              color="white"
              size="small"
              marginLeft={60}
              onChange={formik.handleChange}
              value={formik.values.signal7}
              name="signal7"
            ></InputField>
            <br></br>
            <InputField
              width={220}
              bgColor="#76ff03"
              color="white"
              size="small"
              marginLeft={60}
              onChange={formik.handleChange}
              value={formik.values.signal8}
              name="signal8"
            ></InputField>
            <br></br>
            <InputField
              width={220}
              bgColor="#bdbdbd"
              color="white"
              marginLeft={60}
              size="small"
              onChange={formik.handleChange}
              value={formik.values.signal9}
              name="signal9"
            ></InputField>
            <br></br>
            <InputField
              width={220}
              bgColor="#bdbdbd"
              color="white"
              size="small"
              marginLeft={60}
              onChange={formik.handleChange}
              value={formik.values.signal10}
              name="signal10"
            ></InputField>
            <br></br>
            <InputField
              width={220}
              bgColor="#bdbdbd"
              color="white"
              size="small"
              marginLeft={60}
              onChange={formik.handleChange}
              value={formik.values.signal11}
              name="signal11"
            ></InputField>
            <br></br>
            <InputField
              width={220}
              bgColor="#bdbdbd"
              color="white"
              size="small"
              marginLeft={60}
              onChange={formik.handleChange}
              value={formik.values.signal12}
              name="signal12"
            ></InputField>
            <br></br>
            <InputField
              width={220}
              bgColor="#bdbdbd"
              color="white"
              size="small"
              marginLeft={60}
              onChange={formik.handleChange}
              value={formik.values.signal13}
              name="signal13"
            ></InputField>
            <br></br>
            <InputField
              width={220}
              bgColor="#bdbdbd"
              color="white"
              size="small"
              marginLeft={60}
              onChange={formik.handleChange}
              value={formik.values.signal14}
              name="signal14"
            ></InputField>
            <br></br>
          </Grid>

          <Grid item xs={4} style={{ marginTop: 7 }}>
            <FilledSelect
              options={pins}
              onChange={formik.handleChange}
              value={formik.values.pin1}
              name="pin1"
            ></FilledSelect>
            <br></br>
            <FilledSelect
              options={pins}
              onChange={formik.handleChange}
              value={formik.values.pin2}
              name="pin2"
            ></FilledSelect>
            <br></br>
            <FilledSelect
              options={pins}
              onChange={formik.handleChange}
              value={formik.values.pin3}
              name="pin3"
            ></FilledSelect>
            <br></br>
            <FilledSelect
              options={pins}
              onChange={formik.handleChange}
              value={formik.values.pin4}
              name="pin4"
            ></FilledSelect>
            <br></br>
            <FilledSelect
              options={pins}
              onChange={formik.handleChange}
              value={formik.values.pin5}
              name="pin5"
            ></FilledSelect>
            <br></br>
            <FilledSelect
              options={pins}
              onChange={formik.handleChange}
              value={formik.values.pin6}
              name="pin6"
            ></FilledSelect>
            <br></br>
            <FilledSelect
              options={pins}
              onChange={formik.handleChange}
              value={formik.values.pin7}
              name="pin7"
            ></FilledSelect>
            <br></br>
            <FilledSelect
              options={pins}
              onChange={formik.handleChange}
              value={formik.values.pin8}
              name="pin8"
            ></FilledSelect>
            <br></br>
            <FilledSelect
              options={pins}
              onChange={formik.handleChange}
              value={formik.values.pin9}
              name="pin9"
            ></FilledSelect>
            <br></br>
            <FilledSelect
              options={pins}
              onChange={formik.handleChange}
              value={formik.values.pin10}
              name="pin10"
            ></FilledSelect>
            <br></br>
            <FilledSelect
              options={pins}
              onChange={formik.handleChange}
              value={formik.values.pin11}
              name="pin11"
            ></FilledSelect>
            <br></br>
            <FilledSelect
              options={pins}
              onChange={formik.handleChange}
              value={formik.values.pin12}
              name="pin12"
            ></FilledSelect>
            <br></br>
            <FilledSelect
              options={pins}
              onChange={formik.handleChange}
              value={formik.values.pin13}
              name="pin13"
            ></FilledSelect>
            <br></br>
            <FilledSelect
              options={pins}
              onChange={formik.handleChange}
              value={formik.values.pin14}
              name="pin14"
            ></FilledSelect>
            <br></br>
          </Grid>

          <Grid item xs={4} spacing={5}>
            <Box mt={2} ml={6}>
              <Switch
                onChange={formik.handleChange}
                value={formik.values.enable1}
                name="enable1"
              ></Switch>
            </Box>
            <Box mt={4} ml={6}>
              <Switch
                onChange={formik.handleChange}
                value={formik.values.enable2}
                name="enable2"
              ></Switch>
            </Box>
            <Box mt={3} ml={6}>
              <Switch onChange={formik.handleChange}
                value={formik.values.enable3}
                name="enable3"></Switch>
            </Box>
            <Box mt={3} ml={6}>
              <Switch onChange={formik.handleChange}
                value={formik.values.enable4}
                name="enable4"></Switch>
            </Box>
            <Box mt={4} ml={6}>
              <Switch onChange={formik.handleChange}
                value={formik.values.enable5}
                name="enable5"></Switch>
            </Box>
            <Box mt={4} ml={6}>
              <Switch onChange={formik.handleChange}
                value={formik.values.enable6}
                name="enable6"></Switch>
            </Box>
            <Box mt={4} ml={6}>
              <Switch onChange={formik.handleChange}
                value={formik.values.enable7}
                name="enable7"></Switch>
            </Box>
            <Box mt={3} ml={6}>
              <Switch onChange={formik.handleChange}
                value={formik.values.enable8}
                name="enable8"></Switch>
            </Box>
            <Box mt={4} ml={6}>
              <Switch onChange={formik.handleChange}
                value={formik.values.enable9}
                name="enable9"></Switch>
            </Box>
            <Box mt={4} ml={6}>
              <Switch onChange={formik.handleChange}
                value={formik.values.enable10}
                name="enable10"></Switch>
            </Box>
            <Box mt={4} ml={6}>
              <Switch onChange={formik.handleChange}
                value={formik.values.enable11}
                name="enable11"></Switch>
            </Box>
            <Box mt={3} ml={6}>
              <Switch onChange={formik.handleChange}
                value={formik.values.enable12}
                name="enable12"></Switch>
            </Box>
            <Box mt={4} ml={6}>
              <Switch onChange={formik.handleChange}
                value={formik.values.enable13}
                name="enable13"></Switch>
            </Box>
            <Box mt={4} ml={6}>
              <Switch onChange={formik.handleChange}
                value={formik.values.enable14}
                name="enable14"></Switch>
            </Box>
          </Grid>
        </Grid>

        <Box ml={55} m={2}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.margin}
            type="submit"
            style={{ backgroundColor: "#512da8", color: "white" }}>
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
}

}
export default SignalConf;
