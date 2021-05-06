import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MatakIcon from "../images/matak.png";
import axiosConfig from "../config/axiosConfig";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "../redux/users";
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  icon: {
    width: "10%",
    height: "auto",
  },
  headline: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
}));

const usernameRegex = /^(?=.{1,15}$)[a-zA-Z]+[a-zA-Z0-9]*/;
// const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*[a-zA-Z]).{8,30}$/;
const passwordRegex = /^(?=.{1,15}$)[a-zA-Z]+[a-zA-Z0-9]*/;

//history.push("/home");
export default function LoginScreen({ history }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginText, setLoginText] = useState("");
  const [userNameHelperText, setUserNameHelperText] = useState("");
  const [passwordHelperText, setPasswordHelperText] = useState("");


    const handleClick = () => {
    if (isPasswordValid() && isUserNameValid()) {
      handleLogIn();
    } else {
      if (!userNameHelperText.length) {
          setUserNameHelperText("Please enter username");
      }
      if (!passwordHelperText.length) {
          setPasswordHelperText("Please enter password");
      }
    }
  };

  const goHome = () => {
    history.push("/home");
  };
  const handleLogIn = async () => {
    const body = { Username: username, Password: password };
    try {
      const { data } = await axiosConfig.post("/users/login", body);

      dispatch(fetchCurrentUser(data.id, goHome));
    } catch (error) {
      openModal("Login failed");
    }
  };

  const openModal = text => {
      setLoginText(text);
      setTimeout(() =>setLoginText(""), 5000)
  };

  const validateUsername = event => {
      const inputText = event.target.value;
      if (!inputText.length) {
          setUserNameHelperText("Please enter username");
      } else if (!isUserNameValid(inputText)) {
          setUserNameHelperText("Username is not valid");
      } else if (userNameHelperText.length) {
          setUserNameHelperText("")
      }
      setUserName(inputText);
  };

  const validatePassword = event => {
    const inputText = event.target.value;
    if (!inputText.length) {
        setPasswordHelperText("Please enter password");
    } else if (!isPasswordValid(inputText)) {
        setPasswordHelperText("Password is not valid");
    }  else if (passwordHelperText.length) {
        setPasswordHelperText("")
    }
    setPassword(inputText);
  };

  const enterPressed = (event) => {
    const code = event.keyCode || event.which;
    if(code === 13) { //13 is the enter keycode
      handleClick();
    }
  };

  const getUsernameHelperText = () => {
      return userNameHelperText.length ? userNameHelperText : "";
  };

    const getPasswordHelperText = () => {
        return passwordHelperText.length ? passwordHelperText : "";
    };

    const isPasswordValid = (inputText = password) => {
       return passwordRegex.test(inputText);
    };

    const isUserNameValid = (inputText = username) => {
        return usernameRegex.test(inputText);
    };

  return (
    <Container
      id="login"
      component="main"
      maxWidth="xs"
      onClick={() => setLoginText("")}
    >
      <div className={classes.paper}>
        <div className={classes.headline}>
          <Typography component="h1" variant="h3">
            Sign in
          </Typography>
          <img className={classes.icon} src={MatakIcon} alt="Matak-Icon" />
        </div>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            helperText={getUsernameHelperText()}
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            error={userNameHelperText.length}
            onChange={validateUsername.bind(this)}
            onKeyPress={enterPressed}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            error={passwordHelperText.length}
            onChange={validatePassword}
            fullWidth
            helperText={getPasswordHelperText()}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onKeyPress={enterPressed}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleClick}
          >
            Sign In
          </Button>
            { loginText.length > 0 &&  <Alert severity="error">{loginText}</Alert>}
        </form>
      </div>
    </Container>
  );
}
