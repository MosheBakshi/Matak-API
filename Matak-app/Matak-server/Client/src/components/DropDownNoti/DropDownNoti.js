import { IoIosNotifications } from "react-icons/io";
import { notifications } from "../../fakeNotifications";

import "./DropDownNoti.css";

import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, Menu, MenuItem } from "@material-ui/core";
import { MdPowerSettingsNew, MdSettings } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const useStyles = makeStyles(theme => ({
  avatar: {
    width: "40px",
    height: "40px",
  },
  icon: {
    marginRight: "1rem",
  },
}));

const DropDownNoti = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  //   const { currentUser } = useSelector(state => state.users);

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
        aria-controls="simple-menu-dd"
        aria-haspopup="true"
        onClick={handleClick}
        id="notification-icon"
      >
        <IoIosNotifications />
      </Avatar>

      <Menu
        id="simple-menu-dd"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {notifications.map(noti => {
          if (!noti.isRead)
            return (
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={`/notifications`}
                key={noti.date + noti.sender}
              >
                <MenuItem>
                  <Avatar className="avatar_name" id="name_icon">
                    {noti.sender[0].toUpperCase()}
                  </Avatar>
                  <div id="dd_square">
                    <ul style={{ listStyle: "none" }}>
                      <li style={{ fontWeight: "bold" }}>{noti.sender}</li>
                      <li>{noti.type}</li>
                      <li>{noti.date.slice(3, 25)}</li>
                    </ul>
                  </div>
                </MenuItem>
              </Link>
            );
        })}
      </Menu>
    </>
  );
};

export default DropDownNoti;
