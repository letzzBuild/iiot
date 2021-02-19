import React, { useState, useEffect } from "react";
import HomeMadeContainer from "../../reusableComponents/headerContainer";
import Button from "../../reusableComponents/secButton";
import UpdateIcon from "@material-ui/icons/Update";
import Box from "@material-ui/core/Box";
import InputComponent from "../../reusableComponents/inputTextField";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import SuccessToast from "../../reusableComponents/successToast";
import ErrorToast from "../../reusableComponents/errorToast";
import Loader from "../../reusableComponents/loader";
import Grid from "@material-ui/core/Grid";
import {Redirect} from 'react-router-dom';

function NetworkConf() {
  const [networkDetails, setnetworkDetails] = useState({
    ip: "",
    dns: "",
    gateway: "",
  });

  const [isloading, setisloading] = useState(false);

  const ipValidRegx = String.raw`^(([1-9]?\d|1\d\d|2[0-4]\d|25[0-5])(\.(?!$)|(?=$))){4}$`;

  const schema = yup.object().shape({
    ip: yup.string().required().matches(ipValidRegx, "invalid ip address"),
    dns: yup.string().required().matches(ipValidRegx, "invalid dns provided"),
    gateway: yup
      .string()
      .required()
      .matches(ipValidRegx, "invalid gateway provided"),
  });

  useEffect(() => {
    setisloading(true);
    axios
      .get("http://127.0.0.1:5002/getNetworkConf")
      .then((res) => {
        let result = res["data"]["result"];
        if (result["status"] === 1) {
          if (result["message"] === "successfully fetched saved data") {
            setnetworkDetails({
              ip: result["data"]["ip"],
              dns: result["data"]["dns"],
              gateway: result["data"]["gateway"],
            });
            setisloading(false);
            SuccessToast(result["message"]);
          } else {
            setisloading(false);
            SuccessToast(result["message"]);
          }
        } else {
          setisloading(false);
          ErrorToast(result["message"]);
        }
      })
      .catch((err) => {
        setisloading(false);
        console.log("error", err);
        ErrorToast("Error, failed to load previous data");
      });
  }, []);

  const formik = useFormik({
    initialValues: networkDetails || {
      ip: "",
      dns: "",
      gateway: "",
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (data) => {
      setisloading(true);
      axios
        .post("http://127.0.0.1:5002/updateNetworkDetails", data)
        .then((res) => {
          console.log(res);
          let result = res["data"]["result"];
          console.log(result);
          if (result["status"] === 1) {
            SuccessToast(result["message"]);
            setisloading(false);
          } else {
            ErrorToast(result["message"]);
            setisloading(false);
          }
        })
        .catch((err) => {
          console.log("error");
          setisloading(false);
          ErrorToast("Something went wrong...");
        });
      console.log("lets test");
    },
  });

  let islogged = localStorage.getItem('IS_LOGGED_IN');
  if (islogged === 'false') {
    return <Redirect to='/login' />
  }

  else{


  return (
    <div style={{ marginTop: 100 }}>
      <HomeMadeContainer text={"Network Configuration"} />
      <br></br>
      <br></br>
      <center style={{position:"relative", marginLeft:"250px"}}>
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
              <Loader color={"#ff1744"} size={60}></Loader>
            </Grid>
          </Grid>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <Box ml={3}>
              <InputComponent
                name="ip"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.ip || networkDetails.ip}
                helpertext={"enter a unique ip address for the device"}
                label={"IP Address"}
                error={formik.errors.ip}
                touched={formik.touched.ip}
              ></InputComponent>
            </Box>
            <Box ml={3}>
              <InputComponent
                helpertext={
                  formik.touched.gateway && formik.errors.gateway
                    ? formik.errors.gateway
                    : "enter the default gateway "
                }
                label={"Default gateway"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.gateway || networkDetails.gateway}
                name="gateway"
                error={formik.errors.gateway}
                touched={formik.touched.gateway}
              ></InputComponent>
            </Box>
            <Box ml={3}>
              <InputComponent
                helpertext={
                  formik.touched.dns && formik.errors.dns
                    ? formik.errors.dns
                    : "enter a dns of the network"
                }
                label={"Domain Name Server"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dns || networkDetails.dns}
                name="dns"
                error={formik.errors.dns}
                touched={formik.touched.dns}
              ></InputComponent>
            </Box>
            <br></br>
            <Button
              type="submit"
              text={"update"}
              isDisabled={!(formik.isValid && formik.dirty)}
              icon={<UpdateIcon></UpdateIcon>}
            />
          </form>
        )}
      </center>
    </div>
  );
}
}
export default NetworkConf;
