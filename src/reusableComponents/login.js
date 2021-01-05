import Paper from "@material-ui/core/Paper";
import React from "react";
import InputField from "../reusableComponents/roundTextfield.js";
import Button from "../reusableComponents/secButton";
import Avatar from "react-avatar";
import Password from "../reusableComponents/password";
import { useFormik } from "formik";
import * as yup from "yup";
import Forgotpass from "../nonReusableComponents/forgotPass";
import axios from "axios";
import ErrorToast from './errorToast';



function Login(props) {

  const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (data) => {
      data["machineId"] = localStorage.getItem('machineId');
      axios({
        url: "http://127.0.0.1:5002/login",
        method: "post",
        data: data,
      })
        .then((res) => {
          console.log(res);
          var result = res['data']['result'];
          var resultedData = result['data'];
          if (result['status'] === 0) {
            console.log(result)
            ErrorToast(result['message']);
          }
          else {
            if (result['admin'] === true) {
              localStorage.setItem('IS_LOGGED_IN','true');
              localStorage.setItem('user', 'admin');
              props.history.push('/admin')
            }
            else {
              console.log(resultedData['Components']);
              localStorage.setItem('IS_LOGGED_IN', 'true');
              localStorage.setItem('user', 'nonAdmin');
              localStorage.setItem('fullName', resultedData['FullName']);
              localStorage.setItem('shift', resultedData['Shift']);
              localStorage.setItem('components', JSON.stringify(resultedData['Components']));
              localStorage.setItem('models', JSON.stringify(resultedData['Models']));
              props.history.push('setoperations')
            }

          }
        })
        .catch((err) => {
          console.log(err);
          ErrorToast('Something Went Wrong, Please try Again...');
        });
    },
  });

  return (
    < div >
      <center>
        <form onSubmit={formik.handleSubmit}>
          <Paper
            style={{
              backgroundColor: "#ffff00",
              width: 320,
              paddingRight: 90,
              paddingTop: 15,
              paddingBottom: 15,
            }}
          >
            <Paper
              style={{ backgroundColor: "#ff1744", width: 320, padding: 25 }}
            >
              <Paper
                style={{ backgroundColor: "#6200ea", width: 300, padding: 50 }}
              >
                <Avatar
                  name="Srinivas Induction Hardening"
                  size="70"
                  round={true}
                />
                <br></br>
                <br></br>

                <InputField
                  name="username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                  text="Username"
                  error={formik.errors.username}
                  touched={formik.touched.username}
                  width={260}
                  bgColor="#fafafa"
                />
                <br></br>
                <Password
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  label="Password"
                  error={formik.errors.password}
                  touched={formik.touched.password}
                  bgColor="#f5f5f5"
                />
                <Button text="Submit" type="submit"></Button>
                <Forgotpass></Forgotpass>
              </Paper>
            </Paper>
          </Paper>
        </form>
      </center>
    </div >
  );
}

export default Login;

