import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import "./AvatarIcon.css";
import { makeStyles, Menu, MenuItem } from "@material-ui/core";
import {
  MdPowerSettingsNew,
  MdSettings,
  MdAccountCircle,
  MdPhonelinkSetup,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const useStyles = makeStyles(theme => ({
  avatar: {
    position: "fixed",
    zIndex: "5003",
    right: "70px",
    top: "20px",
  },
  icon: {
    marginRight: "1rem",
  },
}));

function AvatarIcon({ letter }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const { currentUser } = useSelector(state => state.users);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Avatar
        className={classes.avatar}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        id="avatar-icon"
      >
        {letter}
      </Avatar>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to={`/my-account`}>
          <MenuItem>
            <MdAccountCircle className={classes.icon} />
            My Account
          </MenuItem>
        </Link>
        {currentUser.User_Type === "Admin" && (
          <Link to={`/admin-panel`}>
            <MenuItem>
              <MdPhonelinkSetup className={classes.icon} />
              Admin Panel
            </MenuItem>
          </Link>
        )}

        {/* check for admin */}
        <MenuItem onClick={handleClose}>
          <MdSettings className={classes.icon} />
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <MdPowerSettingsNew className={classes.icon} />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

export default AvatarIcon;
