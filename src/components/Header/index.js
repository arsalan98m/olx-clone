import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  List,
  ListItem,
  DialogTitle,
  Dialog,
  Modal,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { Link } from "react-router-dom";

import { auth } from "../../firebase";
import firebase from "firebase/app";
import "./Header.css";
import { useStateValue } from "../../GlobalContext/StateProvider";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid lightgray",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Header = () => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [isLoggdIn, setIsLoggedIn] = useState(false);

  const [state, dispatch] = useStateValue();
  console.log("state=>", state.user);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User has logged in

        setUser(authUser);

        if (authUser.displayName) {
          // don't update
        } else {
          // if we just created someone..
          return authUser.updateProfile({
            displayName: username,
          });
        }
      } else {
        // User has logged out
        setUser(null);
      }
    });

    return () => {
      // perform some clean up functions
      unsubscribe();
    };
  }, [user]);

  const Login = (event) => {
    event.preventDefault();
    let provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;

        setOpen(false);
        setUsername(user.displayName);
        setIsLoggedIn(true);

        dispatch({ type: "SET_USER", payload: user.displayName })

        // ...
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };

  const signOut = (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
      setIsLoggedIn(false);
      dispatch({ type: "SET_USER", payload: null })


    });
  };

  return (
    <div>
      <div className="header">
        <Link to="/">
          <svg
            width="48px"
            height="48px"
            viewBox="0 0 1024 1024"
            data-aut-id="icon"
            class=""
            fill-rule="evenodd"
          >
            <path
              class="rui-77aaa"
              d="M661.333 256v512h-128v-512h128zM277.333 298.667c117.824 0 213.333 95.531 213.333 213.333s-95.509 213.333-213.333 213.333c-117.824 0-213.333-95.531-213.333-213.333s95.509-213.333 213.333-213.333zM794.496 384l37.504 37.504 37.504-37.504h90.496v90.496l-37.504 37.504 37.504 37.504v90.496h-90.496l-37.504-37.504-37.504 37.504h-90.496v-90.496l37.504-37.504-37.504-37.504v-90.496h90.496zM277.333 426.667c-47.061 0-85.333 38.293-85.333 85.333s38.272 85.333 85.333 85.333c47.061 0 85.333-38.293 85.333-85.333s-38.272-85.333-85.333-85.333z"
            ></path>
          </svg>
        </Link>

        <div className="header__search">
          <input
            type="text"
            className="header__searchInput"
            placeholder="Find Cars, Mobiles and more.."
          />
          <SearchIcon className="header__searchIcon" />
        </div>

        <div className="header__modal">
          {user ? (
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              onClick={signOut}
            >
              Logout
            </Button>
          ) : (
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                className="login__btn"
                onClick={() => setOpen(true)}
              >
                Login
              </Button>
            )}

          <Modal open={open} onClose={() => setOpen(false)}>
            <div style={modalStyle} className={classes.paper}>
              <center>
                <h2>Login</h2>

                <Button
                  onClick={Login}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Sign in with Google
                </Button>
              </center>
            </div>
          </Modal>
        </div>

        <h5>{user?.displayName ? `Welcome ${user.displayName}` : ""}</h5>

        {user ? (<Link to="/myads"><Button variant="contained" className="sell__btn">
          <AccountCircleOutlinedIcon /> My Ads
        </Button></Link>) : ""}

        <Link to="/post">
          <Button variant="contained" className="sell__btn">
            <AddIcon /> Sell
          </Button>
        </Link>
      </div>

      <div className="header__categories">
        <Link to="item/Mobile">Mobile Phones</Link>
        <Link to="item/Cars">Cars</Link>
        <Link to="item/Motorcycles">Motocycles</Link>
        <Link to="item/Video">TV - Video - Audio</Link>
        <Link to="item/Tablet">Tablet</Link>
        <Link to="item/Plots">Land Plots</Link>
      </div>

      <img
        src="https://statics.olx.com.pk/external/base/img/hero_bg_pk.jpg"
        alt="header-image"
        className="header_banner"
      />
    </div>
  );
};

export default Header;
