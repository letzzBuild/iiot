import React, { useEffect, useState } from "react";
import HomeMadeContainer from "../../reusableComponents/headerContainer";
import Select from "../../reusableComponents/select";
import InputTextField from "../../reusableComponents/inputTextField";
import Radio from "../../reusableComponents/radioInput";
import Button from "../../reusableComponents/secButton";
import PublishIcon from "@material-ui/icons/Publish";
import axios from "axios";
import { useFormik } from "formik";
import SuccessToast from "../../reusableComponents/successToast";
import ErrorToast from "../../reusableComponents/errorToast";
import Loader from "../../reusableComponents/loader";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import {Redirect} from 'react-router-dom';

function OtherSetting() {
  const [isloading, setisloading] = useState(false);
  const [otherSettingsSavedData, setotherSettingsSavedData] = useState({});
  const [machineIds, setmachineIds] = useState([]);
  const machineIdleTimes = ["2 mins", "3 mins", "5 mins", "10 mins", "15 mins"];
  const dataCleaningIntervals = [
    "7 days",
    "2 weeks",
    "3 weeks",
    "1 month",
    "6 months",
    "1 year",
  ];
  const machineTypes = ["Automatic", "Semi Automatic", "Manual"];

  const schema = yup.object().shape({
    machineId: yup.string().required(),
    batchSize: yup.number().required(),
    holdingRelay: yup.string().required(),
    machineBypass: yup.string().required(),
    cleaningInterval: yup.string().required(),
    machineType: yup.string().required(),
    idleTimeout: yup.string().required(),
  });


  useEffect(() => {
    setisloading(true);
    axios.get("http://127.0.0.1:5002/getOtherSettings")
      .then((res) => {
        let result = res['data']['result'];
        if(result['status']===1){
          if(result['message']==="successfully fetched saved data")
          {
            setotherSettingsSavedData({
                machineId: result['data']['machineId'],
                batchSize: result['data']['batchSize'],
                holdingRelay: result['data']['holdingRelay'],
                machineBypass: result['data']['machineBypass'],
                cleaningInterval: result['data']['cleaningInterval'],
                machineType:result['data']['machineType'],
                idleTimeout: result['data']['idleTimeout'],
            })
            setisloading(false);
            SuccessToast(result['message'])
          }
          else{
            setisloading(false);
            SuccessToast(result['message'])
          }
         
        }
        else{
          setisloading(false)
          ErrorToast(result['message']);
        }
      })
      .catch((err) => {
        setisloading(false)
        console.log("error",err);
        ErrorToast("Error, failed to load previous data");
      });
  },[]);

  const formik = useFormik({
    initialValues: otherSettingsSavedData || {
      machineId: "",
      batchSize: null,
      holdingRelay: null,
      machineBypass: "",
      cleaningInterval: "",
      machineType: "",
      idleTimeout: "",
    },
    enableReinitialize:true,
    validationSchema: schema,
    onSubmit: (data) => {
      setisloading(true);
      console.log(data);
      axios({
        url: "http://127.0.0.1:5002/updateOtherSettings",
        method: "post",
        data: data,
      })
        .then((res) => {
          let result = res["data"]["result"];
          console.log(result);
          if (result["status"] === 1) {
            SuccessToast(result["message"]);
          } else {
            ErrorToast(result["message"]);
          }
          setisloading(false);
        })
        .catch((err) => {
          console.log(err);
          setisloading(false);
        });
    },
  });


  useEffect(() => {
    axios({
      url: "http://10.130.10.111/BE/api/iiot/GetMachineIdsList",
      method: "get",
      timeout: 3000,
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        let result=res["data"];
        let machineList=[]
        for(let i=0; i<result.length; i++)
        {
          machineList.push(result[i]['Code'])
        }
        setmachineIds(machineList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let islogged = localStorage.getItem('IS_LOGGED_IN');
  if (islogged === 'false') {
    return <Redirect to='/login' />
  }
  else{

  return (
    console.log(formik),
    <div style={{ marginTop: 100 }}>
      <form onSubmit={formik.handleSubmit}>
        <HomeMadeContainer
          text={"Configure Other Settings for the device"}
        ></HomeMadeContainer>

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
          <div style={{ marginLeft: 220, marginTop: 10 }}>
            <br></br>
                <Select
                  label={"Select Machine id"}
                  helperText={
                    "Server ip must be set before selecting machine id"
                  }
                  data={machineIds}
                  name="machineId"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.machineId}
                  value={formik.values.machineId || otherSettingsSavedData.machineId }
                  touched={formik.touched.machineId}
                ></Select>
            <InputTextField
              label={"Batch Size "}
              helpertext={"enter the components batch size"}
              name="batchSize"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.batchSize}
              touched={formik.touched.batchSize}
              error={formik.errors.batchSize}
            ></InputTextField>
            <br></br>
            <Radio
              label={"Select Holding Relay"}
              option1={"OUTPUT1"}
              option2={"OUTPUT2"}
              name="holdingRelay"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.holdingRelay || otherSettingsSavedData.holdingRelay}
              touched={formik.touched.holdingRelay}
              error={formik.errors.holdingRelay}
            ></Radio>
            <br></br>
            <Radio
              label={"Machine Bypass(Emergency case)"}
              option1={"Hold Machine"}
              option2={"ByPass Machine"}
              name="machineBypass"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.machineBypass || otherSettingsSavedData.machineBypass}
              touched={formik.touched.machineBypass}
              error={formik.errors.machineBypass}
            ></Radio>
            <br></br>
            <Select
              label={"Select Machine Idle time"}
              helperText={"select how much time machine can be idle"}
              data={machineIdleTimes}
              name="idleTimeout"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.idleTimeout || otherSettingsSavedData.idleTimeout}
              touched={formik.touched.idleTimeout}
              error={formik.errors.idleTimeout}
            ></Select>
            <Select
              label={"Select Data Cleaning Interval"}
              helperText={"select how much time machine can be idle"}
              data={dataCleaningIntervals}
              name="cleaningInterval"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cleaningInterval || otherSettingsSavedData.cleaningInterval}
              touched={formik.touched.cleaningInterval}
              error={formik.errors.cleaningInterval}
            ></Select>
            <Select
              label={"Select Machine Type"}
              helperText={"select the type of the machine"}
              data={machineTypes}
              name="machineType"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.machineType || otherSettingsSavedData.machineType}
              touched={formik.touched.machineType}
              error={formik.errors.machineType}
            ></Select>
            <Button
              icon={<PublishIcon></PublishIcon>}
              isDisabled={!(formik.isValid && formik.dirty)}
              type="submit"
              text={"Save"}
            ></Button>
          </div>
        )}
      </form>
    </div>
  );
}
}
export default OtherSetting;
