import React from "react";
import { ToastContainer } from "react-toastify";
import LoadingScreen from "./pages/welcome.js";
import LoginScreen from "./pages/login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SetOperations from "./pages/setOperations";
import ScreenIdle from "./pages/screenIdle";
import AlarmScreen from "./pages/alarm";
import Dashboard from "./pages/dashboard";
import AdminDashboard from "./nonReusableComponents/drawer";


function App() {


  const getinitialValues = data => {
    localStorage.setItem("machineId", data['machineId']);
    localStorage.setItem("batchSize",data['batchSize'])
    localStorage.setItem("idleTime",data['idleTimeout'])
    localStorage.setItem("ipAddress",data['severIp']);
    
  }




  return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" render={({ history }) => (
              <LoadingScreen history={history} valueSetter={getinitialValues} />
            )}></Route>
            <Route exact path="/login" render={({ history }) => (
              <LoginScreen history={history} />
            )}></Route>
            <Route exact path="/setoperations" render={({ history }) => (
              <SetOperations history={history}  />
            )}></Route>
            <Route exact path="/alarm" render={({ history }) => (
              <AlarmScreen history={history}  />
            )}></Route>
            <Route exact path="/dashbaord" render={({ history }) => (
              <Dashboard history={history}  />
            )}></Route>
            <Route exact path="/screenIdle" render={({ history }) => (
              <ScreenIdle history={history}  />
            )}></Route>
            <Route exact path="/admin" render={({ history }) => (
              <AdminDashboard history={history}  />
            )}></Route>

          </Switch>
        </Router>

        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
  );
}

export default App;
