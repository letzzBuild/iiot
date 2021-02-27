import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Container from "../../reusableComponents/headerContainer";
import Button from "../../reusableComponents/secButton";
import Box from "@material-ui/core/Box";
import RssFeedIcon from "@material-ui/icons/RssFeed";
import { useFormik } from "formik";
import Loader from "../../reusableComponents/loader";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import SuccessToast from "../../reusableComponents/successToast";
import ErrorToast from "../../reusableComponents/errorToast";
import * as yup from "yup";
import FormHelperText from "@material-ui/core/FormHelperText";
import {Redirect} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: 100,
  },
  margin: {
    margin: theme.spacing(1),
    marginTop: 80,
    marginLeft: 290,
  },
  input: {
    width: 400,
    background: "#eeeeee",
    color: "#212121",
    fontWeight: "bold",
    fontSize: 15,
  },

  button: {
    marginLeft: 360,
    padding: 20,
  },
}));

export default function ServerConf() {
  const classes = useStyles();

  const [isloading, setisloading] = useState(false);
  const [serverIp, setserverIp] = useState(null);
  const schema = yup.object().shape({
    api: yup.string().required("please enter Ip address of server")
  });

  const formik = useFormik({
    initialValues: {
      api: serverIp || "",
    },
    validationSchema: schema,

    onSubmit: (values) => {
      setisloading(true);
      axios
            .post("http://127.0.0.1:5002/updateServerIP", {
              endpoint: values.api,
            })
            .then((res) => {
              console.log(res);
              let result = res["data"]["result"];
              if (result['status']===1){
                setisloading(false);
                SuccessToast(result['message']);
              }
              else{
                setisloading(false);
                ErrorToast(result['message']); 
              }
              
            })
            .catch((err) => {
              console.log(err);
              setisloading(false);
              ErrorToast("Error, something went wrong in saving the data");
            });
    },

    enableReinitialize: true,
  });

  useEffect(() => {
    setisloading(true);
    axios
      .get("http://127.0.0.1:5002/getServerIP")
      .then((res) => {
        let result = res["data"]["result"];
        if (result["status"] === 1) {
          if (result["message"] === "no previous data found") {
            setisloading(false);
            SuccessToast("no previous data found");
          } 
          else {
            setserverIp(result["data"]);
            setisloading(false);
            SuccessToast("Successfully loaded previous data");
          }
        }
        else{
          setisloading(false);
          ErrorToast("something went wrong");
        }
             
      })
      .catch((err) => {
        console.log("error", err);
        setisloading(false);
        ErrorToast("Error, failed to load previous data");
      });
  }, []);

  let islogged = localStorage.getItem('IS_LOGGED_IN');
  if (islogged === 'false') {
    return <Redirect to='/login' />
  }
  else{
  return (
    (
      <div className={classes.root}>
        <br></br>
        <Container text={"Server Configuration"}></Container>
        <br></br>

        {isloading ? (
          <Grid
            container
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 100,
              marginLeft: 50,
            }}
          >
            <Grid item sm={12}>
              <Loader color={"grey"} size={60}></Loader>
            </Grid>
          </Grid>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl fullWidth className={classes.margin} variant="filled">
              <InputLabel htmlFor="endpoint">Enter the server IP</InputLabel>
              <FilledInput
                id="endpoint"
                error={formik.touched && formik.errors.api ? true : false}
                className={classes.input}
                width={400}
                onBlur={formik.handleBlur}
                value={formik.values.api || serverIp}
                startAdornment={
                  <InputAdornment position="start">http://</InputAdornment>
                }
                name="api"
                onChange={formik.handleChange}
              />
              <FormHelperText
                error={formik.touched && formik.errors.api ? true : false}
              >
                {formik.touched && formik.errors.api ? formik.errors.api : ""}
              </FormHelperText>
            </FormControl>

            <br></br>
            <br></br>
            <Box className={classes.button}>
              <Button
                text={"Test Connection"}
                required={true}
                type={"submit"}
                icon={<RssFeedIcon></RssFeedIcon>}
              ></Button>
            </Box>
          </form>
        )}
      </div>
    )
  );
}
}
