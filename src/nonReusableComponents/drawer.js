import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import SettingsIcon from "@material-ui/icons/Settings";
import DnsIcon from "@material-ui/icons/Dns";
import NetworkCheckIcon from "@material-ui/icons/NetworkCheck";
import FiberPinIcon from "@material-ui/icons/FiberPin";
import Home from "../pages/admin/home";
import NetworkConf from "../pages/admin/networkConf";
import ServerConf from "../pages/admin/serverConf";
import SignalConf from "../pages/admin/signalConf";
import OtherSettings from "../pages/admin/otherSetting";
import { Router, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import Dialog from '../reusableComponents/shutdownDialog';
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import Box from "@material-ui/core/Box";
import {Redirect} from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { LocalDiningOutlined } from "@material-ui/icons";

const drawerWidth = 220;
const history = createBrowserHistory();
const icons = [
  <HomeIcon> </HomeIcon>,
  <NetworkCheckIcon></NetworkCheckIcon>,
  <FiberPinIcon> </FiberPinIcon>,
  <DnsIcon></DnsIcon>,
  <SettingsIcon> </SettingsIcon>,
];
const routes = [
  "/admin",
  "/admin/serverConf",
  "/admin/signalsConf",
  "/admin/networkConf",
  "/admin/otherSettings",
];
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: 220,
    background: "#3f51b5",
    zIndex:"1000"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#eeeeee",
    color: "black",
    fontWeight: "bolder",
    fontFamily: "Merriweather",
  },
  toolbarMargin: theme.mixins.toolbar,
  aboveDrawer: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

export const loggedOut = () => {
  if(localStorage.getItem("IS_LOGGED_IN") === "true"){
    localStorage.setItem("IS_LOGGED_IN", "false");
    return <Redirect to='/login' />
  }
}

export default function PermanentDrawerLeft() {
  const classes = useStyles();

  let islogged = localStorage.getItem('IS_LOGGED_IN');
  if (islogged === 'false') {
    return <Redirect to='/login' />
  }
  else{
    
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Admin Configuration Dashboard
          </Typography>
          <Box ml={60}>
            <div style={{display:"flex", position: "relative"}}>
              <span style={{position:"relative", left:"-50px"}}>
            <Dialog
              color={"#d50000"}
              bodyText={"Do you really want to shutdown the device ? "}
              buttonText={"Shutdown"}
              name={"shutdown"}
              icon={<PowerSettingsNewIcon> </PowerSettingsNewIcon>}
            >
            </Dialog>
            </span>
            <span>
            <Dialog color={"grey"}  name="logout" onClick={() => loggedOut()} bodyText={"Do you really want to logout? "} buttonText={"Logout"} icon={<ExitToAppIcon></ExitToAppIcon>}></Dialog>
            </span>
            </div>
          </Box>
        </Toolbar>
      </AppBar>
      <Router history={history}>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <div className={classes.toolbar} /> <Divider />
          <List>
            {" "}
            {[
              "Home",
              "Server Settings",
              "Signals Configuration",
              "Network Settings",
              "Other Settings",
            ].map((text, index) => (
              <>
                <ListItem
                  button
                  key={index}
                  style={{
                    color: "black",
                  }}
                  component={Link}
                  to={routes[index]}
                >
                  <ListItemIcon
                    style={{
                      color: "blue",
                    }}
                  >
                    {" "}
                    {icons[index]}{" "}
                  </ListItemIcon>{" "}
                  <ListItemText primary={text} />
                </ListItem>{" "}
                <Divider />
              </>
            ))}{" "}
          </List>
        </Drawer>{" "}
        <main className={classes.content}>
          <Route exact path="/admin" component={Home} />{" "}
          <Route exact path="/admin/otherSettings" component={OtherSettings} />{" "}
          <Route exact path="/admin/networkConf" component={NetworkConf} />{" "}
          <Route exact path="/admin/serverConf" component={ServerConf} />{" "}
          <Route exact path="/admin/signalsConf" component={SignalConf} />
        </main>{" "}
      </Router>{" "}
    </div>
  );
}
}