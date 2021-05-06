import React, { useEffect, useRef, useState } from "react";

import {
  FormControl,
  ListItem,
  List,
  TextField,
  Avatar,
  Button,
  InputAdornment,
} from "@material-ui/core";
import { UpdateUser, fetchCurrentUser } from "../redux/users";
import { useDispatch, useSelector } from "react-redux";

import MatakIcon from "../images/matak.png";

import NavBar from "../components/NavBar";
import { MdVpnKey, MdEmail, MdLocalPhone } from "react-icons/md";
import MatakModal from "./MatakModal";

function MyAccountScreen() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.users);
  const [email, setEmail] = useState(currentUser.Email);
  const [mobile, setMobile] = useState(currentUser.Mobile);
  const [validemail, setValidEmail] = useState("");
  const [validmobile, setValidMobile] = useState("");

  const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const mobileRegex = /^\d{10}$/;
  useEffect(() => {
    validateMobile();
    validateEmail();
  }, []);

  const updateHandler = () => {
    if (validemail === "" && validmobile === "") {
      dispatch(UpdateUser(currentUser._id, email, mobile));
    }
  };

  const initialsFun = () => {
    const { First_Name, Last_Name } = currentUser;
    return First_Name[0].toUpperCase() + Last_Name[0].toUpperCase();
  };

  const validateEmail = () => {
    if (!emailRegex.test(email)) setValidEmail("Email is not valid");
    else setValidEmail("");
  };
  const validateMobile = () => {
    if (!mobileRegex.test(mobile)) setValidMobile("Mobile is not valid");
    else setValidMobile("");
  };

  return (
    <>
      <NavBar />
      {currentUser && (
        <div className="my_account_screen">
          <div className="frame">
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Avatar className="avatar_name">{initialsFun()}</Avatar>
              <h1 className="name ">
                {`${currentUser.First_Name} ${currentUser.Last_Name}`}
              </h1>
            </span>
            <h3 className="organization-name">
              {currentUser.Organization_Name}
            </h3>

            <List
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "0 2rem",
              }}
            >
              <ListItem>
                <TextField
                  required="true"
                  fullWidth
                  margin="dense"
                  name="Mail"
                  label="User Email"
                  type="email"
                  autoComplete="off"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value);
                    validateEmail();
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MdEmail />
                      </InputAdornment>
                    ),
                  }}
                />
              </ListItem>
              {validemail !== "" && (
                <small
                  style={{
                    color: "red",
                    textAlign: "start",
                    marginLeft: "1rem",
                  }}
                >
                  {validemail}
                </small>
              )}
              <ListItem>
                <TextField
                  required
                  fullWidth
                  margin="normal"
                  name="Phone"
                  label="User Phone"
                  type="tel"
                  value={mobile}
                  autoComplete="off"
                  onChange={e => {
                    setMobile(e.target.value);
                    validateMobile();
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MdLocalPhone />
                      </InputAdornment>
                    ),
                  }}
                />
              </ListItem>
              {validmobile !== "" && (
                <small
                  style={{
                    color: "red",
                    textAlign: "start",
                    marginLeft: "1rem",
                  }}
                >
                  {validmobile}
                </small>
              )}
              <Button
                onClick={updateHandler}
                variant="contained"
                color="primary"
                style={{
                  alignSelf: "center",
                  marginTop: "1rem",
                  width: "90%",
                  padding: "0.5rem 0.5rem",
                }}
              >
                Update
              </Button>
            </List>
          </div>
        </div>
      )}
    </>
  );
}

export default MyAccountScreen;
